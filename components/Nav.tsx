"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/content";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    const ids = ["about", "experience", "projects", "skills", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
    >
      <motion.div
        variants={{
          top: {
            backgroundColor: "rgba(15,15,14,0)",
            borderBottomColor: "rgba(255,255,255,0)",
            backdropFilter: "blur(0px)",
          },
          scrolled: {
            backgroundColor: "rgba(250,250,249,0.92)",
            borderBottomColor: "rgba(0,0,0,0.08)",
            backdropFilter: "blur(12px)",
          },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
        className="w-full"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-syne font-bold text-xl tracking-tight transition-colors duration-200"
            style={{ color: scrolled ? "var(--p-accent)" : "#ffffff" }}
          >
            SM
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`font-dm-mono text-xs tracking-wider transition-colors duration-200 relative pb-0.5 ${
                    isActive ? "nav-active" : ""
                  }`}
                  style={{
                    color: scrolled
                      ? isActive
                        ? "var(--p-accent)"
                        : "var(--p-muted)"
                      : isActive
                      ? "#ffffff"
                      : "rgba(255,255,255,0.6)",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: scrolled ? "var(--p-accent)" : "#ffffff",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: scrolled ? "var(--p-accent)" : "#ffffff",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: scrolled ? "var(--p-accent)" : "#ffffff",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "",
              }}
            />
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b"
            style={{
              backgroundColor: "rgba(250,250,249,0.97)",
              backdropFilter: "blur(12px)",
              borderBottomColor: "var(--p-border)",
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-dm-mono text-sm text-left py-1"
                  style={{ color: "var(--p-accent)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
