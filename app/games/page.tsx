import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Six playable games, each demonstrating a skill relevant to private equity, venture, growth equity, or AI roles — from LBO speed-solving to a learning-agent opponent.",
};

export default function GamesPage() {
  return (
    <div className="pt-36 pb-28">
      <section className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="Playable" title="Games.">
            Six intellectual games, each a working interactive tool rather than a
            mockup. Every one demonstrates a skill I&rsquo;d use in an investing or
            AI role — modeling, signal detection, bidding strategy, ownership math,
            estimation, and reasoning against an adaptive opponent.
          </SectionHeader>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-16">
          {games.map((game, i) => (
            <Reveal key={game.slug} delay={(i % 2) * 0.06}>
              <Link
                href={`/games/${game.slug}`}
                className="card group flex flex-col h-full p-7 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label" style={{ color: "var(--gold)" }}>
                    {game.skill}
                  </span>
                  <span
                    className="font-mono text-[11px] tnum"
                    style={{ color: "var(--subtle)" }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-xl mt-5 leading-snug transition-colors duration-300 group-hover:text-[var(--gold)]"
                  style={{ color: "var(--ink)" }}
                >
                  {game.title}
                </h3>
                <p
                  className="font-sans text-[13.5px] leading-relaxed mt-3 flex-1"
                  style={{ color: "var(--muted)" }}
                >
                  {game.description}
                </p>
                <span
                  className="font-mono text-[11px] mt-6 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--gold)" }}
                >
                  Play →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
