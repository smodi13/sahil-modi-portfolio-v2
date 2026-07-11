"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/content";

/**
 * Horizontal, scroll-snapping career + project timeline (neko-style).
 * Drag/scroll horizontally on desktop; swipes on touch.
 */
export default function Timeline() {
  return (
    <div className="timeline-track" role="list">
      {timeline.map((node, i) => (
        <motion.div
          key={node.period + node.title}
          role="listitem"
          className="timeline-node"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="timeline-dot" aria-hidden="true" />
          <div className="mono-label" style={{ color: "var(--gold)" }}>
            {node.period}
          </div>
          <h3
            className="font-display font-bold text-base mt-2 leading-snug"
            style={{ color: "var(--ink)" }}
          >
            {node.title}
          </h3>
          <div
            className="font-mono text-[11px] mt-1"
            style={{ color: "var(--subtle)" }}
          >
            {node.org}
          </div>
          <p
            className="font-sans text-[12.5px] mt-3 leading-relaxed pr-4"
            style={{ color: "var(--muted)" }}
          >
            {node.note}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
