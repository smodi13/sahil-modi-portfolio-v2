import Link from "next/link";
import { personal } from "@/data/content";
import IconLink from "@/components/IconLink";
import { LinkedinIcon, GithubIcon, MailIcon } from "@/components/icons";

const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Games", href: "/games" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10 border-t"
      style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="font-display font-bold text-2xl tracking-tight">
              Sahil Modi<span style={{ color: "var(--gold)" }}>.</span>
            </div>
            <p
              className="font-sans text-sm mt-2 max-w-xs leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Finance & CIS. Building investment tools where quantitative
              research meets software.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-mono text-xs transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: "var(--muted)" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="font-mono text-[11px]" style={{ color: "var(--subtle)" }}>
            © {year} Sahil Modi. Built with Next.js.
          </p>
          <div className="flex items-center gap-1 -mr-2">
            <IconLink
              href={personal.linkedin}
              label="LinkedIn"
              icon={<LinkedinIcon />}
              external
              tooltip="top"
            />
            <IconLink
              href={personal.github}
              label="GitHub"
              icon={<GithubIcon />}
              external
              tooltip="top"
            />
            <IconLink
              href={`mailto:${personal.email}`}
              label="Email"
              icon={<MailIcon />}
              tooltip="top"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
