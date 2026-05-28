"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { about } from "@/data/content";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      const children = cardsRef.current.querySelectorAll(".reveal-card");
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--p-bg)" }}
    >
      <div ref={counterRef} className="section-counter">01</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div ref={headingRef} className="mb-16">
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--p-gold)" }}
          >
            01 / About
          </div>
          <div className="heading-mask">
            <h2
              className="reveal-text font-syne font-bold text-5xl md:text-6xl"
              style={{ color: "var(--p-accent)" }}
            >
              Background
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="reveal-card space-y-6">
            <p
              className="font-inter text-base leading-loose"
              style={{ color: "var(--p-muted)", lineHeight: "1.9" }}
            >
              {about.bio}
            </p>
          </div>

          {/* Education + certs */}
          <div className="reveal-card space-y-6">
            {/* Education card */}
            <div
              className="p-6 rounded-sm"
              style={{
                backgroundColor: "var(--p-surface)",
                border: "1px solid var(--p-border)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--p-subtle)" }}
              >
                Education
              </div>
              <h3
                className="font-syne font-bold text-lg mb-1"
                style={{ color: "var(--p-accent)" }}
              >
                {about.education.institution}
              </h3>
              <p
                className="font-inter text-sm mb-1"
                style={{ color: "var(--p-muted)" }}
              >
                {about.education.school}
              </p>
              <p
                className="font-inter text-sm mb-3"
                style={{ color: "var(--p-muted)" }}
              >
                {about.education.degree}
              </p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <div
                    className="font-dm-mono text-xs"
                    style={{ color: "var(--p-subtle)" }}
                  >
                    GPA
                  </div>
                  <div
                    className="font-syne font-bold text-xl"
                    style={{ color: "var(--p-gold)" }}
                  >
                    {about.education.gpa}
                  </div>
                </div>
                <div>
                  <div
                    className="font-dm-mono text-xs"
                    style={{ color: "var(--p-subtle)" }}
                  >
                    Graduation
                  </div>
                  <div
                    className="font-inter font-medium text-sm mt-0.5"
                    style={{ color: "var(--p-accent)" }}
                  >
                    {about.education.graduation}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div
                className="font-dm-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--p-subtle)" }}
              >
                Certifications
              </div>
              <div className="flex flex-wrap gap-2">
                {about.certifications.map((cert) => (
                  <span key={cert} className="cert-pill">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
