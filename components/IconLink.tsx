import type { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  /** Tooltip text + accessible label — states exactly where the link goes. */
  label: string;
  icon: ReactNode;
  /** External links open in a new tab; mailto/internal do not. */
  external?: boolean;
  /** Tooltip placement relative to the icon. */
  tooltip?: "top" | "bottom";
  className?: string;
};

/**
 * A single icon-only link with a hover/focus tooltip naming its destination.
 * Used site-wide so every clickable destination shares one pattern.
 */
export default function IconLink({
  href,
  label,
  icon,
  external = false,
  tooltip = "bottom",
  className = "",
}: IconLinkProps) {
  const ext = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      {...ext}
      className={`icon-link icon-btn ${className}`}
    >
      {icon}
      <span
        className={`icon-tooltip ${tooltip === "top" ? "is-top" : ""}`}
        role="tooltip"
      >
        {label}
        {external ? " ↗" : ""}
      </span>
    </a>
  );
}
