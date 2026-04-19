// scripts/verify-design.mjs
// Usage: node scripts/verify-design.mjs <checkpoint-name>
// Assumes dev server at http://localhost:3000.
// Exit 0 = all assertions pass. Exit 1 = at least one failed.
// Writes JSON report to /tmp/verify-<checkpoint>.json.
// Writes screenshots to /tmp/verify-<checkpoint>/*.png.

import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const checkpoint = process.argv[2] || "unnamed";
const outDir = `/tmp/verify-${checkpoint}`;
await fs.mkdir(outDir, { recursive: true });

const results = { checkpoint, passed: [], failed: [], screenshots: [] };
const assert = (name, cond, detail = "") => {
  if (cond) results.passed.push(name);
  else results.failed.push({ name, detail });
};
const safe = async (fn, fallback) => {
  try { return await fn(); } catch { return fallback; }
};

const browser = await chromium.launch();

for (const [vp, w, h] of [["desktop", 1280, 900], ["mobile", 375, 812]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(3000);

  // --- Home ---
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });

  // Typography contract
  const h1 = page.locator("h1").first();
  const h1Font = await safe(() => h1.evaluate(el => getComputedStyle(el).fontFamily), "");
  const h1Weight = await safe(() => h1.evaluate(el => getComputedStyle(el).fontWeight), "");
  assert(`${vp}: h1 font-family is Inter`, h1Font.toLowerCase().includes("inter"), h1Font);
  assert(`${vp}: h1 font-weight is 600`, h1Weight === "600", h1Weight);

  // Hero content
  const h1Text = (await safe(() => h1.textContent(), ""))?.trim() || "";
  assert(`${vp}: h1 contains "Data + AI products"`, h1Text.includes("Data + AI products"));
  assert(`${vp}: h1 contains "shipped in weeks"`, h1Text.includes("shipped in weeks"));

  // Status pill
  const statusPill = page.locator("text=/Booking May 2026/i").first();
  assert(`${vp}: hero status pill present`, await safe(() => statusPill.count(), 0) > 0);

  // Nav
  const navHeader = page.locator("header").first();
  const navPos = await safe(() =>
    navHeader.evaluate(el => getComputedStyle(el).position), "");
  assert(`${vp}: nav is sticky`, navPos === "sticky", navPos);

  // Nav links — Work / Services / Training / About
  for (const label of ["Work", "Services", "Training", "About"]) {
    const l = page.locator(`header nav a:has-text("${label}")`).first();
    assert(`${vp}: nav has "${label}" link`, await safe(() => l.count(), 0) > 0);
  }

  // Section presence
  for (const id of ["top", "proofs", "services", "training", "about"]) {
    const sec = page.locator(`section#${id}`).first();
    assert(`${vp}: section #${id} present`, await safe(() => sec.count(), 0) > 0);
  }

  // Training section specifics
  const trainingH2 = page.locator("section#training h2").first();
  const trainingText = ((await safe(() => trainingH2.textContent(), "")) || "").trim();
  assert(`${vp}: training h2 is "Make ChatGPT Your Slave."`,
    trainingText.includes("Make ChatGPT Your Slave"));
  const trainingSectionText = (await safe(() =>
    page.locator("section#training").textContent(), "")) || "";
  assert(`${vp}: training section has €249`, trainingSectionText.includes("€249"));
  assert(`${vp}: training CTA "Book a session"`,
    await safe(() => page.locator('section#training a:has-text("Book a session")').count(), 0) > 0);
  assert(`${vp}: training CTA "Read the write-up"`,
    await safe(() => page.locator('section#training a:has-text("Read the write-up")').count(), 0) > 0);

  // About toolbelt
  const aboutText = ((await safe(() =>
    page.locator("section#about").textContent(), "")) || "").toUpperCase();
  for (const col of ["Warehouse", "Product", "Stack"]) {
    assert(`${vp}: about toolbelt column "${col}"`, aboutText.includes(col.toUpperCase()));
  }

  // Services "What you get" open by default
  const whatYouGet = page.locator('section#services details:has(summary:has-text("What you get"))').first();
  const isOpen = await safe(() => whatYouGet.evaluate(el => el.hasAttribute("open")), false);
  assert(`${vp}: services "What you get" open by default`, isOpen === true);

  // No Fraunces or font-serif leakage
  const bodyHTML = await page.content();
  assert(`${vp}: no "Fraunces" in DOM`,  !/Fraunces/i.test(bodyHTML));
  assert(`${vp}: no "font-serif" class in DOM`, !/class="[^"]*font-serif/.test(bodyHTML));

  // Screenshot home
  const homePath = path.join(outDir, `home-${vp}.png`);
  await page.screenshot({ path: homePath, fullPage: true });
  results.screenshots.push(homePath);

  // --- Training proof page ---
  await page.goto("http://localhost:3000/proofs/chatgpt-training",
    { waitUntil: "networkidle", timeout: 30000 });
  const proofBody = await page.content();
  assert(`${vp}: proof page price €249 rendered`, /€249/.test(proofBody));
  assert(`${vp}: proof page "Why this exists" heading`, /Why this exists/i.test(proofBody));
  const proofPath = path.join(outDir, `proof-chatgpt-${vp}.png`);
  await page.screenshot({ path: proofPath, fullPage: true });
  results.screenshots.push(proofPath);

  await ctx.close();
}

await browser.close();
await fs.writeFile(
  `/tmp/verify-${checkpoint}.json`,
  JSON.stringify(results, null, 2)
);

console.log(`✓ passed: ${results.passed.length}`);
console.log(`✗ failed: ${results.failed.length}`);
if (results.failed.length) {
  for (const f of results.failed) console.log(`  - ${f.name}  (${f.detail || ""})`);
  process.exit(1);
}
