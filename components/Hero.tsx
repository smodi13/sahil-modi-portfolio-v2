"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal, hero } from "@/data/content";
import gsap from "gsap";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: 0.4 + i * 0.1,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--p-dark)" }}
    >
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div className="noise-overlay" />
        <div className="ledger-lines" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Availability badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 font-dm-mono text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="pulse-dot" />
            {personal.availability}
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-syne font-bold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(60px, 10vw, 104px)" }}
          >
            {personal.name}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-inter max-w-2xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(15px, 1.8vw, 18px)",
            }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 flex-wrap justify-center mt-2"
          >
            <motion.button
              onClick={() => {
                const el = document.getElementById("projects");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-inter font-medium text-sm px-6 py-3 rounded-sm transition-all duration-200"
              style={{
                backgroundColor: "#ffffff",
                color: "var(--p-dark)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View my work
            </motion.button>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-medium text-sm px-6 py-3 rounded-sm border transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#ffffff",
              }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            {hero.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="font-dm-mono text-xs px-4 py-2 rounded-sm"
                style={{
                  color: "var(--p-gold)",
                  backgroundColor: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                {stat.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll caret */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bounce-slow">
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.4 }}
        >
          <path
            d="M10 1v18M10 19l-6-6M10 19l6-6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
