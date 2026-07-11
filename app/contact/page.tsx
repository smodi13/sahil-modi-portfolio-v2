import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { personal, contact } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sahil Modi — email, LinkedIn, and GitHub. Open to GP-side investing and AI-forward technical roles.",
};

const channels = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { label: "LinkedIn", value: personal.linkedinHandle, href: personal.linkedin },
  { label: "GitHub", value: personal.githubHandle, href: personal.github },
];

export default function ContactPage() {
  return (
    <div className="pt-36 pb-32">
      <section className="max-w-4xl mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="Say hello" title={contact.headline}>
            {contact.subline}
          </SectionHeader>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 mt-16">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card group flex flex-col h-full p-6 hover:-translate-y-1"
              >
                <div className="mono-label" style={{ color: "var(--gold)" }}>
                  {c.label}
                </div>
                <div
                  className="font-sans text-sm mt-4 break-words transition-colors group-hover:text-[var(--gold)]"
                  style={{ color: "var(--ink)" }}
                >
                  {c.value}
                </div>
                <span
                  className="font-mono text-[11px] mt-auto pt-6 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--muted)" }}
                >
                  Reach out ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div
            className="mt-6 p-6 rounded-xl font-mono text-xs"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--muted)" }}
          >
            <span style={{ color: "var(--gold)" }}>Location — </span>
            {personal.location}. Open to relocation for the right team.
          </div>
        </Reveal>
      </section>
    </div>
  );
}
