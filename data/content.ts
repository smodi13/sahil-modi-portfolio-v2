export const personal = {
  name: "Sahil Modi",
  email: "modi.sahil@gmail.com",
  phone: "(602) 535-7223",
  linkedin: "https://www.linkedin.com/in/sahil-modi-",
  linkedinHandle: "linkedin.com/in/sahil-modi-",
  github: "https://github.com/smodi13",
  githubHandle: "github.com/smodi13",
  location: "Tempe, AZ",
  tagline:
    "Finance and technology analyst, building investment tools at the intersection of quantitative research and software",
  availability: "Available for full-time roles",
};

export const hero = {
  stats: [
    { label: "3.80 GPA" },
    { label: "10+ startups evaluated" },
    { label: "4 firms, 2 years" },
    { label: "Python, SQL, Excel" },
  ],
};

export const about = {
  bio: "I study Finance and Computer Information Systems at ASU's W.P. Carey School of Business and graduate with a 3.80 GPA. My background spans venture capital due diligence, equity compensation modeling at Equity Methods, and corporate finance at L'Oreal. I spend most of my time at the intersection of investment analysis and quantitative tools, building financial models during the day and Python systems at night. I am most energized working on problems that require both analytical rigor and technical execution.",
  education: {
    institution: "Arizona State University",
    school: "W.P. Carey School of Business",
    degree: "B.S. Finance and Computer Information Systems",
    gpa: "3.80",
    graduation: "May 2025",
  },
  certifications: [
    "PE and VC, Università Bocconi",
    "DCF Modeling, Coursera",
    "Claude 101, Anthropic",
    "Claude Code in Action, Anthropic",
    "Intro to Claude Cowork, Anthropic",
    "Intro to Agent Skills, Anthropic",
  ],
};

export const experience = [
  {
    company: "ASU",
    role: "Venture Capital Analyst",
    dates: "August 2024 to May 2025",
    location: "Tempe, AZ",
    bullets: [
      "Spearheaded due diligence on 10+ early-stage tech and AI startups using PitchBook, synthesizing market signals and financial models into 3 finalist investment pitches for VC partners",
      "Conducted TAM/SAM/SOM market sizing and comparable company analysis using revenue multiples, producing structured memos that shaped investment committee decisions on capital deployment",
      "Built scenario-based Excel models forecasting IRR, exit multiples, and revenue sensitivities, translating complex financial assumptions into clear recommendations for non-technical stakeholders",
      "Coordinated cross-functional workstreams across professors, entrepreneurs, and VC analysts, delivering investment outputs on tight timelines with a high degree of autonomy",
    ],
  },
  {
    company: "Equity Methods",
    role: "Equity Compensation Externship",
    dates: "December 2024",
    location: "Scottsdale, AZ",
    bullets: [
      "Analyzed Fortune 500 case studies to project equity compensation expenses and identify stock award trends, uncovering patterns in stock dilution impact and payout structures",
      "Developed SAS and Excel models to estimate fair value and forecast the cost of RSUs and stock options over 3 to 5 year periods, using historical stock volatility, risk-free rates, grant schedules, and vesting timelines",
      "Evaluated proprietary equity data and drafted strategic recommendations based on long-term incentive design and peer analysis",
    ],
  },
  {
    company: "L'Oreal",
    role: "Finance Intern",
    dates: "June 2024 to August 2024",
    location: "Tampa, FL",
    bullets: [
      "Streamlined invoice processing workflow by identifying bottlenecks and implementing automation, reducing processing time by 30% and improving vendor responsiveness",
      "Performed account reconciliations by identifying and resolving discrepancies in vendor account activity, ensuring accurate ledger balances and supporting financial statement integrity",
      "Assisted in reconciliations and audit preparation, ensuring data accuracy and process consistency across corporate finance functions",
    ],
  },
  {
    company: "ASU Enterprise Partners",
    role: "Accounting Intern",
    dates: "August 2023 to May 2024",
    location: "Tempe, AZ",
    bullets: [
      "Created monthly financial reporting packages tracking budget vs. actuals across departments, equipping leadership with actionable insights to optimize allocation strategies",
      "Performed reconciliations, resolved discrepancies, and supported monthly close activities, ensuring timely and accurate reporting across nonprofit financial operations",
    ],
  },
];

export const projects = [
  {
    title: "USV Portfolio Network Map",
    description:
      "An interactive force-directed graph mapping 42 Union Square Ventures portfolio companies as nodes, sized by total funding and colored by sector, with gold lines connecting founders who share prior employers. Built as a work product before applying to USV's analyst program, with four original investment memos on companies not yet in the portfolio.",
    tags: ["React", "Next.js", "D3.js", "Framer Motion", "GSAP"],
    live: "https://usv-network-map.vercel.app",
    code: "https://github.com/smodi13/usv-network-map",
  },
  {
    title: "Sports Betting Reverse Line Movement Tracker",
    description:
      "A Python daemon that polls live sports odds every 15 minutes via The Odds API, detects reverse line movement signals across all US sports, stores flagged events in SQLite, and surfaces a CLI alert system, deployed to a cloud server running continuously via systemd.",
    tags: ["Python", "SQLite", "REST API", "Linux", "systemd"],
    code: "https://github.com/smodi13",
  },
  {
    title: "Automated Finance Job Search Tool",
    description:
      "A Python scraper aggregating entry-level finance and VC job listings daily from LinkedIn, Indeed, and five niche industry job boards, deduplicating across sources using SQLite and delivering a formatted HTML digest via automated daily email.",
    tags: [
      "Python",
      "SQLite",
      "BeautifulSoup",
      "Email Automation",
      "Claude Code",
    ],
    code: "https://github.com/smodi13",
  },
  {
    title: "Quantitative Momentum Trading Engine",
    description:
      "A backtested quantitative momentum strategy using Python, analyzing historical price data and signal logic to evaluate risk-adjusted returns across market conditions. Modular codebase with configurable parameters for signal thresholds, position sizing, Sharpe ratio, max drawdown, and cumulative P and L visualization.",
    tags: ["Python", "pandas", "NumPy", "Backtesting", "Quantitative Finance"],
    code: "https://github.com/smodi13",
  },
  {
    title: "ZDeploy",
    description:
      "A Forward Deployed Engineering simulation tool mirroring real IBM Z client deployment workflows across Pilot, Proof of Value, Production Readiness, and Value Realized stages. Includes an AI deployment assistant and automated playbook generator.",
    tags: ["React", "Groq AI", "FDE Workflow", "Vite"],
    live: "https://zdeploy.vercel.app",
    code: "https://github.com/smodi13/zdeploy",
  },
  {
    title: "Calaveras Vineyards LBO Model",
    description:
      "A mid-market leveraged buyout case study using anonymized real-world deal data, focused on capital structure, returns analysis, and sponsor strategy. Full Excel LBO model evaluating IRR, MOIC, and cash flows under multiple operating and exit scenarios incorporating a sources and uses table, debt schedule, and performance sensitivities.",
    tags: ["Excel", "LBO Modeling", "Private Equity", "IRR", "MOIC"],
    confidential: true,
    confidentialLabel: "Confidential, available on request",
  },
];

export const skills = [
  {
    category: "Financial Modeling",
    items: [
      "LBO",
      "DCF",
      "Comparable Company Analysis",
      "IRR",
      "MOIC",
      "Sensitivity Analysis",
      "Scenario Modeling",
      "Equity Compensation Modeling",
      "RSU Valuation",
      "Stock Option Pricing",
    ],
  },
  {
    category: "Investment Research",
    items: [
      "Due Diligence",
      "TAM/SAM/SOM Sizing",
      "Investment Memos",
      "Portfolio Monitoring",
      "PitchBook",
      "Market Analysis",
      "Comparable Transactions",
    ],
  },
  {
    category: "Programming",
    items: ["Python", "SQL", "JavaScript", "HTML", "Java"],
  },
  {
    category: "Data and Analytics",
    items: [
      "Tableau",
      "Power BI",
      "Excel",
      "Google Sheets",
      "pandas",
      "NumPy",
    ],
  },
  {
    category: "Enterprise Tools",
    items: [
      "SAP",
      "Workday",
      "Microsoft Office Suite",
      "Adobe Creative Suite",
      "Google Suite",
    ],
  },
  {
    category: "Certifications",
    items: [
      "PE and VC by Università Bocconi",
      "DCF Modeling by Coursera",
      "Claude 101",
      "Claude Code in Action by Anthropic",
    ],
  },
];

export const contact = {
  headline: "Let's talk.",
  subline:
    "I am actively looking for investment analyst, portfolio operations, and venture capital roles. If you are building a team or want to discuss a project, reach out.",
};
