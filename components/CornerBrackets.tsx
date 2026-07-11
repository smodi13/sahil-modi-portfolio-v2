import type { ReactNode } from "react";

/**
 * Wraps content in four gold corner brackets (neko-style accent).
 */
export default function CornerBrackets({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="bracket-corner bracket-tl" aria-hidden="true" />
      <span className="bracket-corner bracket-tr" aria-hidden="true" />
      <span className="bracket-corner bracket-bl" aria-hidden="true" />
      <span className="bracket-corner bracket-br" aria-hidden="true" />
      {children}
    </div>
  );
}
