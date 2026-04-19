const signals: { label: string; value: string }[] = [
  { label: "Turnaround", value: "4 wks" },
  { label: "Scope", value: "€15–25K" },
  { label: "Meetings", value: "0" },
  { label: "Experience", value: "10 yrs" },
];

export function HeroSignals() {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[color:var(--color-hairline)] pt-6 sm:mt-10 sm:grid-cols-4">
      {signals.map((s) => (
        <div key={s.label}>
          <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)] sm:text-[11px]">
            {s.label}
          </dt>
          <dd className="mt-1.5 text-[1.5rem] font-medium leading-[1.1] tracking-[-0.02em] tabular-nums text-[color:var(--color-ink-soft)] sm:text-[1.75rem]">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
