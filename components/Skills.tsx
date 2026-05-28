"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { skills } from "@/data/content";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".skill-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--p-bg)" }}
    >
      <div ref={counterRef} className="section-counter">04</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="mb-16">
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--p-gold)" }}
          >
            04 / Skills
          </div>
          <div className="heading-mask">
            <h2
              className="reveal-text font-syne font-bold text-5xl md:text-6xl"
              style={{ color: "var(--p-accent)" }}
            >
              Capabilities
            </h2>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {skills.map((category) => (
            <motion.div
              key={category.category}
              className="skill-card p-6 rounded-sm"
              style={{
                backgroundColor: "var(--p-surface)",
                border: "1px solid var(--p-border)",
              }}
              whileHover={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="font-dm-mono text-xs tracking-widest uppercase mb-4 pb-3 relative"
                style={{
                  color: "var(--p-accent)",
                  borderBottom: "1px solid var(--p-border)",
                }}
              >
                <span
                  className="absolute bottom-0 left-0 h-px w-8"
                  style={{ backgroundColor: "var(--p-gold)" }}
                />
                {category.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
