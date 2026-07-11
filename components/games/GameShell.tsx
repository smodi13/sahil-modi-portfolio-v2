import Link from "next/link";
import type { ReactNode } from "react";

export default function GameShell({
  skill,
  title,
  blurb,
  children,
}: {
  skill: string;
  title: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/games"
          className="font-mono text-xs transition-colors hover:text-[var(--gold)]"
          style={{ color: "var(--muted)" }}
        >
          ← All games
        </Link>

        <div className="mono-label mt-8" style={{ color: "var(--gold)" }}>
          {skill}
        </div>
        <h1
          className="font-display font-extrabold tracking-tight leading-[1.02] mt-3"
          style={{ fontSize: "clamp(34px, 6vw, 60px)", color: "var(--ink)" }}
        >
          {title}
        </h1>
        <p
          className="font-sans mt-5 leading-relaxed"
          style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "60ch" }}
        >
          {blurb}
        </p>

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
