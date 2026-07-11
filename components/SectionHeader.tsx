import type { ReactNode } from "react";

export default function SectionHeader({
  index,
  eyebrow,
  title,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-5">
        {index && (
          <span className="mono-label" style={{ color: "var(--gold)" }}>
            {index}
          </span>
        )}
        <span
          className="mono-label"
          style={{ color: "var(--subtle)", letterSpacing: "0.24em" }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-display font-bold leading-[1.02] tracking-tight"
        style={{ fontSize: "clamp(34px, 5.5vw, 64px)", color: "var(--ink)" }}
      >
        {title}
      </h2>
      {children && (
        <div
          className="font-sans text-[15px] mt-5 max-w-xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
