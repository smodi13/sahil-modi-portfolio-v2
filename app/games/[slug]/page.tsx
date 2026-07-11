import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameShell from "@/components/games/GameShell";
import { games, getGame } from "@/data/games";
import LBOSpeedSolve from "@/components/games/LBOSpeedSolve";
import ReverseLineMovement from "@/components/games/ReverseLineMovement";
import AuctionFormats from "@/components/games/AuctionFormats";
import CapTableChess from "@/components/games/CapTableChess";
import MarketSizingDuel from "@/components/games/MarketSizingDuel";
import RockPaperScissors from "@/components/games/RockPaperScissors";

const registry: Record<string, React.ComponentType> = {
  "lbo-speed-solve": LBOSpeedSolve,
  "reverse-line-movement": ReverseLineMovement,
  "auction-formats": AuctionFormats,
  "cap-table-chess": CapTableChess,
  "market-sizing-duel": MarketSizingDuel,
  "rock-paper-scissors": RockPaperScissors,
};

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found" };
  return { title: game.title, description: game.description };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  const Game = registry[slug];
  if (!game || !Game) notFound();

  return (
    <GameShell skill={game.skill} title={game.title} blurb={game.description}>
      <Game />
    </GameShell>
  );
}
