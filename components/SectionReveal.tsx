"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("animate-fadeInUp");
            el.removeAttribute("data-reveal");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <noscript>
        <style>{`[data-reveal]{opacity:1;transform:none;}`}</style>
      </noscript>
      <div ref={ref} data-reveal className={className}>
        {children}
      </div>
    </>
  );
}
