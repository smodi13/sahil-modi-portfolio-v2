export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  // Short one-liner shown on the card and detail hero
  tagline: string;
  // Longer card blurb
  summary: string;
  // Detail-page body paragraphs
  overview: string[];
  tags: string[];
  live?: string;
  liveLabel?: string;
  code?: string;
  confidential?: boolean;
  confidentialLabel?: string;
  // Framing note for work built as an application sample rather than employment
  context?: string;
};

// Ordered most impressive → least.
export const projects: Project[] = [
  {
    slug: "malik-trading-bot",
    title: "Malik Trading Bot",
    category: "Quant & Trading",
    year: "2025",
    tagline:
      "A systematic TQQQ/SQQQ strategy on 250/200-day moving-average rules, running live on Alpaca paper trading.",
    summary:
      "A systematic trading system for leveraged index ETFs. It backtests a 250/200-day moving-average strategy against 15+ years of TQQQ/SQQQ data, then executes automatically each day on an Alpaca paper-trading account with position sizing and risk rules enforced in code.",
    overview: [
      "A systematic trading system for leveraged index ETFs, rebuilt from scratch as a full engine around a moving-average strategy discussed on the Undiscovered Traders podcast.",
      "The core rules trade TQQQ and SQQQ off 250- and 200-day moving-average signals. I backtested the strategy against more than fifteen years of real price data, reporting risk-adjusted returns, drawdowns, and hit rates so the logic was validated before any capital was committed.",
      "The live layer connects to an Alpaca account and places orders automatically each day, currently running on paper trading, with entry and exit rules, position sizing, and risk limits enforced entirely in code. Performance metrics include Sharpe ratio, max drawdown, and cumulative P&L.",
    ],
    tags: ["Python", "Alpaca API", "Backtesting", "Quantitative Finance", "Automation"],
    code: "https://github.com/smodi13",
  },
  {
    slug: "usv-portfolio-network-map",
    title: "USV Portfolio Network Map",
    category: "Venture Research",
    year: "2025",
    tagline:
      "A force-directed map of a fund's entire portfolio and the founder network behind it.",
    summary:
      "Maps all 42 portfolio companies as a force-directed graph sized by funding and colored by sector, with edges between founders who share prior employers, plus a filterable explorer of 87 founders and four original investment memos.",
    overview: [
      "I built this before applying to Union Square Ventures' analyst program to understand how the firm thinks about networks, and to show that thinking in a live tool rather than a cover letter. It is an independent work sample, not employment.",
      "It worked: after I sent it, USV's Head of Talent replied within 23 minutes.",
      "The site renders all 42 portfolio companies as a force-directed graph, sized by funding and colored by sector, with connections drawn between founders who share a prior employer, so the network effects the firm invests behind are visible at a glance.",
      "It also includes a filterable explorer of 87 founders by university and prior employer, and four original investment memos on companies not yet in the portfolio.",
    ],
    tags: ["React", "Next.js", "D3.js", "Framer Motion", "GSAP"],
    live: "https://usv-network-map.vercel.app",
    code: "https://github.com/smodi13/usv-network-map",
    context: "Independent work sample built for a venture analyst application.",
  },
  {
    slug: "ai-thesis-engine",
    title: "AI Thesis Engine",
    category: "Venture Research",
    year: "2025",
    tagline:
      "A research tool that maps frontier-AI and deep-tech companies to investable theses.",
    summary:
      "An interactive thesis engine that organizes frontier AI, defense, robotics, and climate companies into structured investment theses, so a fund's focus areas can be explored as a living map instead of a static memo.",
    overview: [
      "I built this as an independent work sample for a VC cold outreach, to show how I think about thesis-driven investing rather than one-off deals. It is not employment; it is a project I designed and shipped on my own to open a conversation.",
      "The app catalogs frontier companies across AI infrastructure, defense, robotics, and climate, including labs like Anthropic, Mistral, Perplexity, and Sierra, and ties each one back to a specific investment thesis with the signal that would make it a fit.",
      "It is a full Next.js application with its own data layer and API routes, deployed and publicly live, so a partner can click through the reasoning instead of reading a PDF.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Investment Research", "Deep Tech"],
    live: "https://ldv-thesis-engine.vercel.app",
    context: "Independent work sample built for a VC cold outreach.",
  },
  {
    slug: "take-private-lbo-model",
    title: "Take-Private LBO Model",
    category: "Private Equity",
    year: "2025",
    tagline:
      "A full take-private leveraged buyout model with returns and sensitivity analysis.",
    summary:
      "A complete take-private LBO model: sources and uses, a full debt schedule, IRR and MOIC across operating and exit scenarios, and sensitivity tables on entry multiple, leverage, and growth.",
    overview: [
      "I built this LBO model as an independent work sample for a private equity application. I am naming it by the work rather than the firm, and it is a project I built on my own, not employment.",
      "The model runs the full mechanics of a take-private buyout: a sources and uses table, a term-loan debt schedule with cash sweep, and returns analysis producing IRR and MOIC under multiple operating and exit cases.",
      "Sensitivity tables flex entry multiple, leverage, and revenue growth so the return profile can be pressure-tested rather than presented as a single point estimate. The underlying workbook is confidential and available on request.",
    ],
    tags: ["Excel", "LBO Modeling", "Private Equity", "IRR", "MOIC", "Sensitivity Analysis"],
    confidential: true,
    confidentialLabel: "Built as an application work product — available on request",
    context: "Independent work sample built for a private equity application.",
  },
  {
    slug: "reverse-line-movement-tracker",
    title: "Reverse Line Movement Tracker",
    category: "Signal Detection",
    year: "2025",
    tagline:
      "A daemon that flags when sharp money moves against the public across US sports.",
    summary:
      "A Python daemon that polls live odds every 15 minutes, detects reverse line movement across US sports, stores flagged events in SQLite, and surfaces a CLI alert system, deployed to a cloud server running continuously via systemd.",
    overview: [
      "A signal-detection system for sports betting markets that watches for reverse line movement, the moment a betting line moves against the side the public is on, which is a classic footprint of sharp money.",
      "A Python daemon polls live odds every fifteen minutes through The Odds API across all US sports, deduplicates and stores flagged events in SQLite, and surfaces alerts through a CLI.",
      "It runs continuously on a cloud server under systemd, so the detection loop keeps working without supervision. The Reverse Line Movement game in the Games section is a playable version of this same logic.",
    ],
    tags: ["Python", "SQLite", "REST API", "Linux", "systemd"],
    code: "https://github.com/smodi13",
  },
  {
    slug: "b2b-ai-deal-flow-tracker",
    title: "B2B AI Deal Flow Tracker",
    category: "Venture Research",
    year: "2025",
    tagline:
      "A curated deal-flow board of B2B AI startups mapped to a fund's theses.",
    summary:
      "A Streamlit app curating 30 active B2B AI startups, four investment theses, and visual market analytics, calibrated to a Seed-through-Series-B enterprise AI focus.",
    overview: [
      "I built this as an independent work sample for a Counterpart Ventures application, to show deal-flow judgment in a working tool rather than a list. It is a project I built on my own, not employment.",
      "The app curates thirty active B2B AI startups and organizes them under four investment theses, each calibrated to a Seed-through-Series-B enterprise AI focus.",
      "Visual market analytics let a reader slice the set by stage, category, and thesis fit, so the curation logic is transparent and interactive rather than buried in a spreadsheet.",
    ],
    tags: ["Python", "Streamlit", "Market Analysis", "Investment Research"],
    live: "https://counterpart-deal-tracker.streamlit.app",
    context: "Independent work sample built for a venture fund application.",
  },
  {
    slug: "finance-intelligence-aggregator",
    title: "Finance Intelligence Aggregator",
    category: "Automation",
    year: "2025",
    tagline:
      "A daily pipeline that scrapes finance and VC job boards into one clean digest.",
    summary:
      "A daily data pipeline that scrapes listings across LinkedIn, Indeed, and five niche VC and finance boards, deduplicates across sources in SQLite, and delivers a structured HTML digest by automated email.",
    overview: [
      "A daily automation pipeline that aggregates entry-level finance and venture capital postings from LinkedIn, Indeed, and five niche job boards into a single email digest.",
      "The system handles the full workflow: scraping each source, normalizing and deduplicating listings in SQLite so the same role never shows up twice, and rendering a structured HTML digest.",
      "It runs on a schedule and delivers automatically, and the entire system was architected and built with Claude Code.",
    ],
    tags: ["Python", "SQLite", "BeautifulSoup", "Email Automation", "Claude Code"],
    code: "https://github.com/smodi13",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
