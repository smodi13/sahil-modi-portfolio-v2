export type Game = {
  slug: string;
  title: string;
  // Skill this game demonstrates, shown as an eyebrow tag
  skill: string;
  // One to two sentence description in the reference voice
  description: string;
};

export const games: Game[] = [
  {
    slug: "lbo-speed-solve",
    title: "LBO Speed-Solve",
    skill: "Modeling instinct",
    description:
      "Given an entry multiple, leverage ratio, and exit assumptions, solve for the IRR before the clock runs out. Tests whether you can feel a return in your head, not just build it in a cell.",
  },
  {
    slug: "reverse-line-movement",
    title: "Reverse Line Movement Detector",
    skill: "Signal detection",
    description:
      "A playable version of a real sports-betting signal tool: watch the line and the public betting percentage, and call the moment sharp money starts moving against the crowd.",
  },
  {
    slug: "auction-formats",
    title: "First-Price vs Second-Price Auction",
    skill: "Bidding strategy",
    description:
      "Bid across both auction formats in a competitive M&A process and see how price discipline and format change what you pay and what you win.",
  },
  {
    slug: "cap-table-chess",
    title: "Cap Table Chess",
    skill: "Ownership structuring",
    description:
      "Structure each funding round's terms to land on a target founder ownership at exit, without over-diluting the early investors who backed you first.",
  },
  {
    slug: "market-sizing-duel",
    title: "Market Sizing Duel vs AI",
    skill: "Fermi estimation",
    description:
      "Take a Fermi estimation problem, commit to a number, and compare your build-up against an AI's estimate and the real answer. Closest order of magnitude wins.",
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock-Paper-Scissors vs a Learning Agent",
    skill: "Adaptive reasoning",
    description:
      "Play against a learning agent that models your recent moves and exploits predictable behavior. Staying random is harder than it looks.",
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}
