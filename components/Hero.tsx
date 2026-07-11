"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personal, hero } from "@/data/content";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 34%, rgba(169,126,40,0.08), transparent 68%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        <motion.span variants={item} className="eyebrow mb-8">
          <span className="pulse-dot" />
          {personal.availability}
        </motion.span>

        {/* Bracketed name */}
        <motion.div variants={item} className="relative px-8 py-4">
          <span className="bracket-corner bracket-tl" style={{ top: -6, left: -6 }} aria-hidden />
          <span className="bracket-corner bracket-tr" style={{ top: -6, right: -6 }} aria-hidden />
          <span className="bracket-corner bracket-bl" style={{ bottom: -6, left: -6 }} aria-hidden />
          <span className="bracket-corner bracket-br" style={{ bottom: -6, right: -6 }} aria-hidden />
          <h1
            className="font-display font-extrabold leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(58px, 12vw, 148px)", color: "var(--ink)" }}
          >
            Sahil Modi
          </h1>
        </motion.div>

        <motion.p
          variants={item}
          className="font-sans mt-8 max-w-2xl leading-relaxed"
          style={{ color: "var(--muted)", fontSize: "clamp(15px, 1.9vw, 19px)" }}
        >
          {personal.tagline}.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <Link href="/projects" className="btn btn-primary">
            View my work
            <span className="btn-icon">→</span>
          </Link>
          <Link href="/games" className="btn btn-ghost">
            Play the games
            <span className="btn-icon">↗</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-2.5 mt-12"
        >
          {hero.stats.map((s) => (
            <span key={s.label} className="tag tnum">
              {s.label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll caret */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-slow" aria-hidden="true">
        <svg width="18" height="26" viewBox="0 0 20 28" fill="none">
          <path
            d="M10 1v18M10 19l-6-6M10 19l6-6"
            stroke="var(--subtle)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
