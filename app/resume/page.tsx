import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { experience, about } from "@/data/content";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Sahil Modi's resume — finance and CIS graduate with experience across venture capital, equity compensation, and corporate finance.",
};

export default function ResumePage() {
  return (
    <div className="pt-36 pb-28">
      <section className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="One page" title="Resume." />
            <a href="/resume.pdf" download className="btn btn-primary mb-2">
              Download PDF
              <span className="btn-icon">↓</span>
            </a>
          </div>
        </Reveal>

        {/* Embedded PDF */}
        <Reveal delay={0.06}>
          <div
            className="mt-14 rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            <object
              data="/resume.pdf#view=FitH"
              type="application/pdf"
              className="w-full"
              style={{ height: "min(88vh, 1000px)" }}
              aria-label="Sahil Modi resume PDF"
            >
              <div className="p-10 text-center">
                <p className="font-sans text-sm" style={{ color: "var(--muted)" }}>
                  Your browser can&rsquo;t display the embedded PDF.
                </p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-5"
                >
                  Open resume in a new tab
                  <span className="btn-icon">↗</span>
                </a>
              </div>
            </object>
          </div>
        </Reveal>

        {/* Full experience (text, for readers and screen readers) */}
        <div className="mt-24">
          <Reveal>
            <SectionHeader index="—" eyebrow="Experience" title="Where I've worked." />
          </Reveal>

          <div className="mt-14 space-y-4">
            {experience.map((job, i) => (
              <Reveal key={job.company + job.role} delay={(i % 4) * 0.05}>
                <div className="card p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--ink)" }}
                    >
                      {job.company}
                      <span style={{ color: "var(--gold)" }}> · </span>
                      <span style={{ color: "var(--muted)", fontWeight: 500 }}>
                        {job.role}
                      </span>
                    </h3>
                    <div
                      className="font-mono text-[11px] tnum"
                      style={{ color: "var(--subtle)" }}
                    >
                      {job.dates} · {job.location}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="font-sans text-[14px] leading-relaxed pl-4 relative"
                        style={{ color: "var(--muted)" }}
                      >
                        <span
                          className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--gold)", opacity: 0.7 }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications */}
          <Reveal>
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
              <div className="mono-label mb-5">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {about.certifications.map((c) => (
                  <span key={c} className="tag-neutral">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
