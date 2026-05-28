"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { experience } from "@/data/content";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll(".exp-card");
      gsap.fromTo(
        cards,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--p-surface-secondary)" }}
    >
      <div ref={counterRef} className="section-counter">02</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="mb-16">
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--p-gold)" }}
          >
            02 / Experience
          </div>
          <div className="heading-mask">
            <h2
              className="reveal-text font-syne font-bold text-5xl md:text-6xl"
              style={{ color: "var(--p-accent)" }}
            >
              Work History
            </h2>
          </div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Vertical rail */}
          <div
            className="absolute left-0 top-2 bottom-2 hidden md:block"
            style={{ width: 1, backgroundColor: "var(--p-border)", left: "11px" }}
          />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <div key={i} className="exp-card md:pl-10 relative">
                {/* Timeline dot */}
                <div className="timeline-dot absolute hidden md:block" style={{ left: 0 }} />

                <motion.div
                  className="p-6 rounded-sm"
                  style={{
                    backgroundColor: "var(--p-surface)",
                    border: "1px solid var(--p-border)",
                  }}
                  whileHover={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                    y: -2,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="font-syne font-bold text-lg"
                        style={{ color: "var(--p-accent)" }}
                      >
                        {job.company}
                      </h3>
                      <p
                        className="font-inter font-medium text-sm mt-0.5"
                        style={{ color: "var(--p-muted)" }}
                      >
                        {job.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="font-dm-mono text-xs"
                        style={{ color: "var(--p-subtle)" }}
                      >
                        {job.dates}
                      </div>
                      <div
                        className="font-dm-mono text-xs mt-0.5"
                        style={{ color: "var(--p-subtle)" }}
                      >
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {job.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex gap-3 font-inter text-sm leading-relaxed"
                        style={{ color: "var(--p-muted)" }}
                      >
                        <span
                          className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full"
                          style={{ backgroundColor: "var(--p-gold)" }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
