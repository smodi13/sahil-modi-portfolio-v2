"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Games", href: "/games" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-xl"
        style={{
          background: "rgba(254, 253, 251, 0.82)",
          borderColor: "var(--line)",
          boxShadow: "0 10px 34px -18px rgba(28,26,22,0.28)",
        }}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display font-bold text-sm px-3 py-1.5 tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          SM<span style={{ color: "var(--gold)" }}>.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.slice(1).map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs px-3.5 py-1.5 rounded-full transition-colors duration-200"
                style={{ color: active ? "#0d0d0c" : "var(--muted)" }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--gold)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1 w-9 h-9"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className="block w-4 h-px transition-all duration-300"
            style={{
              background: "var(--ink)",
              transform: open ? "translateY(3px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-4 h-px transition-all duration-300"
            style={{
              background: "var(--ink)",
              transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 pointer-events-auto"
            style={{ background: "rgba(247,245,242,0.96)", backdropFilter: "blur(20px)" }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  className="font-display font-bold text-3xl"
                  style={{ color: isActive(link.href) ? "var(--gold)" : "var(--ink)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
