import Link from "next/link";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { about, skills } from "@/data/content";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Positioning */}
      <section className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <SectionHeader index="01" eyebrow="Positioning" title="Investing brain, builder's hands." />
        </Reveal>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 mt-12">
          <Reveal delay={0.05}>
            <p
              className="font-sans leading-relaxed"
              style={{ color: "var(--muted)", fontSize: "17px", maxWidth: "60ch" }}
            >
              {about.bio}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div
              className="card p-6 h-full flex flex-col justify-between"
              style={{ background: "var(--surface)" }}
            >
              <div className="mono-label">Education</div>
              <div className="mt-4">
                <div className="font-display font-bold text-lg" style={{ color: "var(--ink)" }}>
                  {about.education.institution}
                </div>
                <div className="font-sans text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {about.education.degree}
                </div>
                <div className="flex gap-4 mt-4 font-mono text-xs" style={{ color: "var(--subtle)" }}>
                  <span className="tnum">GPA {about.education.gpa}</span>
                  <span>·</span>
                  <span>{about.education.graduation}</span>
                  <span>·</span>
                  <span>Barrett Honors</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="relative border-y py-24 md:py-32"
        style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeader index="02" eyebrow="Path" title="A short timeline.">
              Four firms and a stack of independent builds across two years. Scroll
              across to walk it.
            </SectionHeader>
          </Reveal>
        </div>
        <div className="max-w-6xl mx-auto pl-6 mt-14">
          <Timeline />
        </div>
      </section>

      {/* Featured projects */}
      <section className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader index="03" eyebrow="Selected work" title="Things I built." />
            <Link
              href="/projects"
              className="font-mono text-xs mb-2 transition-colors hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
            >
              All projects →
            </Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        className="relative border-t py-24 md:py-32"
        style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeader index="04" eyebrow="Toolkit" title="What I work in." />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-14">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={(i % 3) * 0.06}>
                <div
                  className="font-mono text-xs mb-4 pb-3 border-b"
                  style={{ color: "var(--gold)", borderColor: "var(--line)" }}
                >
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag-neutral">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-6xl mx-auto px-6 py-28 md:py-40">
        <Reveal>
          <div className="relative text-center max-w-2xl mx-auto brackets py-14 px-6">
            <h2
              className="font-display font-extrabold tracking-tight leading-[0.98]"
              style={{ fontSize: "clamp(40px, 7vw, 84px)", color: "var(--ink)" }}
            >
              Let&rsquo;s talk.
            </h2>
            <p
              className="font-sans mt-6 leading-relaxed mx-auto"
              style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "48ch" }}
            >
              I&rsquo;m looking for GP-side investing and AI-forward technical roles in
              private equity, venture, and growth equity. If you&rsquo;re building a
              team, reach out.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <Link href="/contact" className="btn btn-primary">
                Get in touch
                <span className="btn-icon">→</span>
              </Link>
              <Link href="/resume" className="btn btn-ghost">
                Read the resume
                <span className="btn-icon">↗</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
