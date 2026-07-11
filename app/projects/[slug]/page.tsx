import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { projects, getProject } from "@/data/projects";
import { ArrowUpRightIcon, GithubIcon, LockIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal y={16}>
          <Link
            href="/projects"
            className="font-mono text-xs transition-colors hover:text-[var(--gold)]"
            style={{ color: "var(--muted)" }}
          >
            ← All projects
          </Link>

          <div className="flex items-center gap-3 mt-8 mb-4">
            <span className="mono-label" style={{ color: "var(--gold)" }}>
              {project.category}
            </span>
            <span className="font-mono text-[11px]" style={{ color: "var(--subtle)" }}>
              {project.year}
            </span>
          </div>

          <h1
            className="font-display font-extrabold tracking-tight leading-[1.02]"
            style={{ fontSize: "clamp(38px, 6.5vw, 68px)", color: "var(--ink)" }}
          >
            {project.title}
          </h1>

          <p
            className="font-sans mt-6 leading-relaxed"
            style={{ color: "var(--muted)", fontSize: "18px", maxWidth: "60ch" }}
          >
            {project.tagline}
          </p>
        </Reveal>

        {project.context && (
          <Reveal y={16} delay={0.05}>
            <div
              className="mt-8 p-4 rounded-xl font-mono text-[12px] leading-relaxed"
              style={{
                background: "rgba(169,126,40,0.07)",
                border: "1px solid rgba(169,126,40,0.22)",
                color: "var(--muted)",
              }}
            >
              <span style={{ color: "var(--gold)" }}>Context — </span>
              {project.context}
            </div>
          </Reveal>
        )}

        {/* Links */}
        <Reveal y={16} delay={0.08}>
          <div className="flex flex-wrap gap-3 mt-8">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={`${project.liveLabel ?? "Open live app"} (opens in a new tab)`}
              >
                <ArrowUpRightIcon />
                {project.liveLabel ?? "Open live app"}
              </a>
            )}
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                aria-label="View source on GitHub (opens in a new tab)"
              >
                <GithubIcon />
                View source
              </a>
            )}
            {project.confidential && (
              <span
                className="btn btn-ghost"
                style={{ cursor: "default", color: "var(--subtle)" }}
              >
                <LockIcon />
                {project.confidentialLabel}
              </span>
            )}
          </div>
        </Reveal>

        {/* Overview */}
        <div className="mt-16 space-y-6">
          {project.overview.map((para, i) => (
            <Reveal key={i} y={18} delay={i * 0.04}>
              <p
                className="font-sans leading-[1.75]"
                style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "64ch" }}
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Tech stack */}
        <Reveal y={18}>
          <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
            <div className="mono-label mb-4">Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
