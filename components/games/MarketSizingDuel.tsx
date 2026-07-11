"use client";

import { useState } from "react";

type Q = {
  q: string;
  unit: string;
  actual: number;
  ai: number;
  aiReasoning: string[];
  source: string;
};

const QUESTIONS: Q[] = [
  {
    q: "How many gas stations are there in the United States?",
    unit: "stations",
    actual: 145000,
    ai: 130000,
    aiReasoning: [
      "~330M people, roughly 1 station per ~2,300 people in a car-dependent country.",
      "That lands around 140k; I'll shade slightly for rural density gaps.",
    ],
    source: "≈145,000 (NACS / Census).",
  },
  {
    q: "How many commercial passenger flights take off worldwide each day?",
    unit: "flights/day",
    actual: 100000,
    ai: 90000,
    aiReasoning: [
      "~25,000 commercial aircraft, each flying ~4 legs/day → ~100k.",
      "Utilization varies, so I'll estimate a touch under.",
    ],
    source: "≈100,000 flights/day (FlightRadar24).",
  },
  {
    q: "Annual revenue of a single busy urban Starbucks store?",
    unit: "USD",
    actual: 1500000,
    ai: 1700000,
    aiReasoning: [
      "~500 customers/day × ~$8 ticket × 360 days ≈ $1.4M.",
      "A busy urban store skews higher on volume and ticket.",
    ],
    source: "≈$1.5M/store (company store-count vs revenue).",
  },
  {
    q: "How many piano tuners work in the Chicago metro area?",
    unit: "tuners",
    actual: 250,
    ai: 220,
    aiReasoning: [
      "~9M metro → ~1M pianos at ~1 per 9 people incl. institutions.",
      "Tuned ~once/yr, a tuner does ~800/yr → ~250 tuners.",
    ],
    source: "≈200–300 (the classic Fermi answer).",
  },
  {
    q: "How many diapers does one baby go through in its first year?",
    unit: "diapers",
    actual: 2700,
    ai: 2400,
    aiReasoning: [
      "~8/day early tapering to ~6/day → avg ~7/day.",
      "7 × 365 ≈ 2,550; round up for newborn frequency.",
    ],
    source: "≈2,500–3,000 (pediatric estimates).",
  },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}
function logErr(guess: number, actual: number) {
  return Math.abs(Math.log10(guess / actual));
}

export default function MarketSizingDuel() {
  const [i, setI] = useState(() => Math.floor(Math.random() * QUESTIONS.length));
  const [val, setVal] = useState("");
  const [done, setDone] = useState(false);
  const [score, setScore] = useState({ you: 0, ai: 0 });

  const Qn = QUESTIONS[i];

  const guess = parseFloat(val.replace(/[^0-9.]/g, ""));
  const valid = Number.isFinite(guess) && guess > 0;
  const youErr = valid ? logErr(guess, Qn.actual) : Infinity;
  const aiErr = logErr(Qn.ai, Qn.actual);
  const youWin = youErr < aiErr;

  const submit = () => {
    if (!valid || done) return;
    setDone(true);
    setScore((s) => ({ you: s.you + (youWin ? 1 : 0), ai: s.ai + (youWin ? 0 : 1) }));
  };
  const next = () => {
    setI((c) => (c + 1) % QUESTIONS.length);
    setVal("");
    setDone(false);
  };

  return (
    <div className="card p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="mono-label" style={{ color: "var(--subtle)" }}>Duel score</div>
        <div className="font-mono text-sm tnum">
          <span style={{ color: "var(--gold)" }}>You {score.you}</span>
          <span style={{ color: "var(--subtle)" }}> · </span>
          <span style={{ color: "var(--muted)" }}>AI {score.ai}</span>
        </div>
      </div>

      <div className="rounded-xl p-5 mb-6" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
        <div className="mono-label mb-2" style={{ color: "var(--subtle)" }}>Estimate</div>
        <p className="font-display font-bold text-lg leading-snug" style={{ color: "var(--ink)" }}>{Qn.q}</p>
      </div>

      {!done ? (
        <>
          <div className="flex gap-3">
            <input
              autoFocus
              inputMode="decimal"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={`Your number (${Qn.unit})`}
              className="flex-1 font-mono text-sm rounded-full px-5 py-3 outline-none"
              style={{ background: "var(--surface-2)", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
            />
            <button className="btn btn-primary" onClick={submit} disabled={!valid}>Commit</button>
          </div>
          <p className="font-mono text-[11px] mt-3" style={{ color: "var(--subtle)" }}>
            Tip: you can type 145000, 145k, or 1.5M. Closest order of magnitude wins.
          </p>
        </>
      ) : (
        <div>
          <div className="font-display font-bold text-xl mb-4" style={{ color: youWin ? "#34d17f" : "#e06a5a" }}>
            {youWin ? "You beat the model" : "The model edged you"}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Col k="You" v={fmt(guess)} err={youErr} win={youWin} />
            <Col k="AI" v={fmt(Qn.ai)} err={aiErr} win={!youWin} />
            <Col k="Actual" v={fmt(Qn.actual)} accent />
          </div>
          <div className="rounded-xl p-4 mt-4" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
            <div className="mono-label mb-2" style={{ color: "var(--gold)" }}>How the AI reasoned</div>
            {Qn.aiReasoning.map((r, idx) => (
              <p key={idx} className="font-sans text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>• {r}</p>
            ))}
            <p className="font-mono text-[11px] mt-3" style={{ color: "var(--subtle)" }}>Actual: {Qn.source}</p>
          </div>
          <button className="btn btn-ghost w-full justify-center mt-5" onClick={next}>
            Next problem <span className="btn-icon">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

function Col({ k, v, err, win, accent }: { k: string; v: string; err?: number; win?: boolean; accent?: boolean }) {
  return (
    <div className="rounded-lg px-3 py-3 text-center" style={{ background: "var(--surface-2)", border: `1px solid ${win ? "var(--gold)" : "var(--line)"}` }}>
      <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>{k}</div>
      <div className="font-display font-bold text-lg mt-1 tnum" style={{ color: accent ? "var(--gold)" : "var(--ink)" }}>{v}</div>
      {err !== undefined && Number.isFinite(err) && (
        <div className="font-mono text-[10px] mt-1" style={{ color: "var(--subtle)" }}>{err.toFixed(2)}× off (log)</div>
      )}
    </div>
  );
}
