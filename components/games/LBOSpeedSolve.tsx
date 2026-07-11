"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Deal = {
  ebitda: number;
  entryMultiple: number;
  leverage: number;
  years: number;
  growth: number;
  exitMultiple: number;
  paydown: number; // fraction of entry debt repaid by exit
};

function makeDeal(): Deal {
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  const entryMultiple = pick([8, 9, 10, 11, 12]);
  const exitDelta = pick([-1, 0, 0, 0, 1]);
  return {
    ebitda: 100,
    entryMultiple,
    leverage: pick([4, 5, 6]),
    years: 5,
    growth: pick([0.05, 0.08, 0.1, 0.12, 0.15]),
    exitMultiple: Math.max(6, entryMultiple + exitDelta),
    paydown: pick([0, 0.25, 0.5]),
  };
}

function solve(d: Deal) {
  const entryEV = d.entryMultiple * d.ebitda;
  const entryDebt = d.leverage * d.ebitda;
  const entryEquity = entryEV - entryDebt;
  const exitEbitda = d.ebitda * Math.pow(1 + d.growth, d.years);
  const exitEV = d.exitMultiple * exitEbitda;
  const exitDebt = entryDebt * (1 - d.paydown);
  const exitEquity = exitEV - exitDebt;
  const moic = exitEquity / entryEquity;
  const irr = Math.pow(moic, 1 / d.years) - 1;
  return { entryEV, entryDebt, entryEquity, exitEbitda, exitEV, exitDebt, exitEquity, moic, irr };
}

const START = 45;

export default function LBOSpeedSolve() {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [guess, setGuess] = useState("");
  const [time, setTime] = useState(START);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [verdict, setVerdict] = useState("");

  const answer = useMemo(() => (deal ? solve(deal) : null), [deal]);

  const reveal = useCallback(
    (g: number | null) => {
      setPhase("done");
      if (!answer) return;
      const actual = answer.irr * 100;
      if (g === null) {
        setVerdict("time");
        setStreak(0);
        return;
      }
      const err = Math.abs(g - actual);
      if (err <= 2) {
        setVerdict("nailed");
        setStreak((s) => {
          const n = s + 1;
          setBest((b) => Math.max(b, n));
          return n;
        });
      } else if (err <= 5) {
        setVerdict("close");
        setStreak(0);
      } else {
        setVerdict("off");
        setStreak(0);
      }
    },
    [answer]
  );

  useEffect(() => {
    if (phase !== "playing") return;
    if (time <= 0) {
      reveal(null);
      return;
    }
    const t = setTimeout(() => setTime((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, time, reveal]);

  const start = () => {
    setDeal(makeDeal());
    setGuess("");
    setTime(START);
    setVerdict("");
    setPhase("playing");
  };

  const submit = () => {
    if (phase !== "playing") return;
    const g = parseFloat(guess);
    reveal(Number.isFinite(g) ? g : null);
  };

  return (
    <div className="card p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6">
          <Stat label="Streak" value={String(streak)} />
          <Stat label="Best" value={String(best)} />
        </div>
        <div
          className="font-mono text-2xl tnum"
          style={{ color: time <= 10 && phase === "playing" ? "#e06a5a" : "var(--gold)" }}
        >
          {phase === "playing" ? `0:${String(time).padStart(2, "0")}` : "0:45"}
        </div>
      </div>

      {phase === "idle" && (
        <div className="text-center py-10">
          <p className="font-sans text-sm mb-6" style={{ color: "var(--muted)" }}>
            You&rsquo;ll get a deal. Estimate the 5-year equity IRR in your head and
            enter it before the clock hits zero.
          </p>
          <button className="btn btn-primary" onClick={start}>
            Deal me in <span className="btn-icon">→</span>
          </button>
        </div>
      )}

      {deal && phase !== "idle" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Fact k="Entry EBITDA" v={`$${deal.ebitda}M`} />
            <Fact k="Entry multiple" v={`${deal.entryMultiple}.0×`} />
            <Fact k="Leverage" v={`${deal.leverage}.0× EBITDA`} />
            <Fact k="Hold" v={`${deal.years} years`} />
            <Fact k="EBITDA growth" v={`${(deal.growth * 100).toFixed(0)}% / yr`} />
            <Fact k="Exit multiple" v={`${deal.exitMultiple}.0×`} />
            <Fact k="Debt paid down" v={`${(deal.paydown * 100).toFixed(0)}%`} />
          </div>

          {phase === "playing" && (
            <div className="flex gap-3 mt-6">
              <div className="relative flex-1">
                <input
                  autoFocus
                  inputMode="decimal"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Your IRR estimate"
                  className="w-full font-mono text-sm rounded-full px-5 py-3 pr-9 outline-none"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm" style={{ color: "var(--subtle)" }}>%</span>
              </div>
              <button className="btn btn-primary" onClick={submit}>Lock in</button>
            </div>
          )}

          {phase === "done" && answer && (
            <div className="mt-6">
              <Result verdict={verdict} actual={answer.irr * 100} guess={parseFloat(guess)} />
              <div className="mt-5 rounded-xl p-5" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                <div className="mono-label mb-3">The math</div>
                <Line k="Entry equity" v={`$${answer.entryEquity.toFixed(0)}M`} sub={`$${answer.entryEV.toFixed(0)}M EV − $${answer.entryDebt.toFixed(0)}M debt`} />
                <Line k="Exit EBITDA" v={`$${answer.exitEbitda.toFixed(0)}M`} sub={`$${deal.ebitda}M × ${(1 + deal.growth).toFixed(2)}^${deal.years}`} />
                <Line k="Exit equity" v={`$${answer.exitEquity.toFixed(0)}M`} sub={`$${answer.exitEV.toFixed(0)}M EV − $${answer.exitDebt.toFixed(0)}M debt`} />
                <Line k="MOIC" v={`${answer.moic.toFixed(2)}×`} sub={`IRR = ${answer.moic.toFixed(2)}^(1/${deal.years}) − 1`} last />
              </div>
              <button className="btn btn-ghost mt-5 w-full justify-center" onClick={start}>
                Next deal <span className="btn-icon">→</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--subtle)" }}>{label}</div>
      <div className="font-display font-bold text-lg tnum" style={{ color: "var(--ink)" }}>{value}</div>
    </div>
  );
}
function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg px-3 py-2.5" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
      <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>{k}</div>
      <div className="font-mono text-sm mt-1 tnum" style={{ color: "var(--ink)" }}>{v}</div>
    </div>
  );
}
function Line({ k, v, sub, last }: { k: string; v: string; sub: string; last?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between py-2 ${last ? "" : "border-b"}`} style={{ borderColor: "var(--line)" }}>
      <div>
        <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>{k}</div>
        <div className="font-mono text-[10px] mt-0.5" style={{ color: "var(--subtle)" }}>{sub}</div>
      </div>
      <div className="font-mono text-sm tnum" style={{ color: "var(--gold)" }}>{v}</div>
    </div>
  );
}
function Result({ verdict, actual, guess }: { verdict: string; actual: number; guess: number }) {
  const map: Record<string, { t: string; c: string }> = {
    nailed: { t: "Nailed it", c: "#34d17f" },
    close: { t: "Close", c: "var(--gold)" },
    off: { t: "Off the mark", c: "#e06a5a" },
    time: { t: "Out of time", c: "#e06a5a" },
  };
  const m = map[verdict] ?? map.off;
  return (
    <div className="flex items-baseline justify-between">
      <div className="font-display font-bold text-2xl" style={{ color: m.c }}>{m.t}</div>
      <div className="text-right">
        <div className="font-mono text-xs" style={{ color: "var(--subtle)" }}>
          {verdict !== "time" && Number.isFinite(guess) ? `You: ${guess.toFixed(1)}%  ·  ` : ""}
          Actual IRR
        </div>
        <div className="font-display font-bold text-2xl tnum" style={{ color: "var(--ink)" }}>{actual.toFixed(1)}%</div>
      </div>
    </div>
  );
}
