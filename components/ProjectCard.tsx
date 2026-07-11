"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon, GithubIcon, LockIcon } from "@/components/icons";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="card group flex flex-col h-full p-7 hover:-translate-y-1"
        aria-label={`${project.title} — view details`}
      >
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="mono-label" style={{ color: "var(--gold)" }}>
            {project.category}
          </span>
          <span
            className="font-mono text-[11px] tnum"
            style={{ color: "var(--subtle)" }}
          >
            {project.year}
          </span>
        </div>

        <h3
          className="font-display font-bold text-xl leading-snug transition-colors duration-300 group-hover:text-[var(--gold)]"
          style={{ color: "var(--ink)" }}
        >
          {project.title}
        </h3>

        <p
          className="font-sans text-[13.5px] leading-relaxed mt-3 flex-1"
          style={{ color: "var(--muted)" }}
        >
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-6">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between mt-6 pt-5 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <span
            className="flex items-center gap-1.5 font-mono text-[11px]"
            style={{ color: project.confidential ? "var(--subtle)" : "var(--muted)" }}
          >
            <span className="[&>svg]:w-3.5 [&>svg]:h-3.5" aria-hidden="true">
              {project.confidential ? (
                <LockIcon />
              ) : project.live ? (
                <ArrowUpRightIcon />
              ) : (
                <GithubIcon />
              )}
            </span>
            {project.confidential
              ? "On request"
              : project.live
              ? "Live app"
              : "Source"}
          </span>
          <span
            className="font-mono text-[11px] transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: "var(--gold)" }}
          >
            View →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
