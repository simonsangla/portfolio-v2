"use client";

import { track } from "@/lib/analytics";

export function ArtifactCardTracker({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <div onClick={() => track("product_card_click", { slug })}>
      {children}
    </div>
  );
}
