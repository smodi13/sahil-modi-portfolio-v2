import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Investment research tools, financial models, and quantitative systems — built as independent work samples and personal projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-36 pb-28">
      <section className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="Portfolio" title="Projects.">
            Research tools, financial models, and quantitative systems. Several
            were built as independent work samples for specific fund applications
            — named here by the work itself, not the firm — and are not
            employment. Each links to a full writeup.
          </SectionHeader>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
