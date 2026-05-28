"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personal, contact } from "@/data/content";

export default function Contact() {
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
      const cards = cardsRef.current.querySelectorAll(".contact-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const contactItems = [
    {
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      external: false,
    },
    {
      label: "LinkedIn",
      value: personal.linkedinHandle,
      href: personal.linkedin,
      external: true,
    },
    {
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\D/g, "")}`,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--p-dark)" }}
    >
      <div
        ref={counterRef}
        className="section-counter"
        style={{ color: "rgba(255,255,255,0.03)" }}
      >
        05
      </div>

      <div className="noise-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div ref={headingRef} className="mb-12">
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--p-gold)" }}
          >
            05 / Contact
          </div>
          <div className="heading-mask inline-block">
            <h2
              className="reveal-text font-syne font-bold"
              style={{
                color: "#ffffff",
                fontSize: "clamp(48px, 8vw, 88px)",
              }}
            >
              {contact.headline}
            </h2>
          </div>
          <p
            className="font-inter text-base mt-6 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {contact.subline}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-4 justify-center mt-12"
        >
          {contactItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="contact-card flex flex-col items-center gap-2 p-6 rounded-sm flex-1 max-w-xs mx-auto md:mx-0 transition-colors duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              whileHover={{
                backgroundColor: "rgba(201,168,76,0.06)",
                borderColor: "rgba(201,168,76,0.25)",
                y: -3,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="font-dm-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--p-gold)" }}
              >
                {item.label}
              </div>
              <div
                className="font-inter text-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {item.value}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
