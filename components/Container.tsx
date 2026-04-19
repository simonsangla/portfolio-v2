import { ReactNode } from "react";

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 ${
        narrow ? "max-w-[42rem]" : "max-w-[70rem]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
