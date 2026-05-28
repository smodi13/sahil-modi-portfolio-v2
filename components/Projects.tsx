"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { projects } from "@/data/content";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    if (counterRef.current) {
      gsap.to(counterRef.current, {
        y: "-40%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (headingRef.current) {
      const el = headingRef.current.querySelector(".reveal-text");
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Horizontal scroll with GSAP pin
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const trackWidth = track.scrollWidth;
    const viewWidth = pin.offsetWidth;
    const scrollDistance = trackWidth - viewWidth + 96;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(scrollDistance),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--p-bg)" }}
    >
      {/* Non-pinned heading */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-8">
        <div ref={counterRef} className="section-counter" style={{ top: 20 }}>03</div>
        <div ref={headingRef}>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--p-gold)" }}
          >
            03 / Work
          </div>
          <div className="heading-mask">
            <h2
              className="reveal-text font-syne font-bold text-5xl md:text-6xl"
              style={{ color: "var(--p-accent)" }}
            >
              Selected Projects
            </h2>
          </div>
          <p
            className="font-inter text-sm mt-4 max-w-xl"
            style={{ color: "var(--p-muted)" }}
          >
            Scroll horizontally to explore.
          </p>
        </div>
      </div>

      {/* Pinned horizontal scroll */}
      <div
        ref={pinRef}
        className="overflow-hidden"
        style={{ height: "520px" }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-12 h-full items-center"
          style={{ width: "max-content" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
          {/* End spacer */}
          <div style={{ width: 64, flexShrink: 0 }} />
        </div>
      </div>

      <div className="pb-28" />
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        y: 6,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 flex flex-col rounded-sm overflow-hidden"
      style={{
        width: "380px",
        height: "440px",
        backgroundColor: "var(--p-dark)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      whileHover={{
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        y: -4,
      }}
      transition={{ duration: 0.25 }}
    >
      <div ref={innerRef} className="flex flex-col flex-1 p-7">
        {/* Index */}
        <div
          className="font-dm-mono text-xs mb-4"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          0{index + 1}
        </div>

        {/* Title */}
        <h3
          className="font-syne font-bold text-lg mb-3 leading-snug"
          style={{ color: "#ffffff" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="font-inter text-sm leading-relaxed flex-1"
          style={{ color: "rgba(255,255,255,0.5)", fontSize: "12.5px" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        {project.confidential ? (
          <div
            className="font-dm-mono text-xs py-2 px-3 rounded-sm text-center"
            style={{
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {project.confidentialLabel}
          </div>
        ) : (
          <div className="flex gap-3">
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter font-medium text-xs px-4 py-2 rounded-sm flex-1 text-center"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--p-dark)",
                }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.97 }}
              >
                Live App
              </motion.a>
            )}
            {project.code && (
              <motion.a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter font-medium text-xs px-4 py-2 rounded-sm flex-1 text-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
                whileHover={{ borderColor: "rgba(255,255,255,0.5)", color: "#ffffff" }}
                whileTap={{ scale: 0.97 }}
              >
                View Code
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
