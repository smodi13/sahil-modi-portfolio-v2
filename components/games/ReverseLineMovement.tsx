"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Tick = { pct: number; line: number };
type Round = { team: string; opp: string; ticks: Tick[]; rlmStep: number };

const TEAMS = [
  ["Lakers", "Nuggets"],
  ["Chiefs", "Bills"],
  ["Celtics", "Heat"],
  ["Cowboys", "Eagles"],
  ["Yankees", "Astros"],
];

function makeRound(): Round {
  const [team, opp] = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const rlmStep = 3 + Math.floor(Math.random() * 3); // 3..5
  const steps = 7;
  let pct = 70 + Math.floor(Math.random() * 8); // heavy public on `team`
  let line = -(5 + Math.floor(Math.random() * 5)); // favorite spread
  const ticks: Tick[] = [];
  for (let i = 0; i < steps; i++) {
    ticks.push({ pct, line });
    // public keeps piling on
    pct = Math.min(88, pct + Math.floor(Math.random() * 3));
    // line normally drifts WITH the public (more negative). At RLM it reverses.
    if (i + 1 === rlmStep) line += 1; // sharp money: line moves toward the dog
    else line -= 0.5;
  }
  return { team, opp, ticks, rlmStep };
}

export default function ReverseLineMovement() {
  const [round, setRound] = useState<Round | null>(null);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [result, setResult] = useState<"hit" | "early" | "missed" | "">("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const start = () => {
    stop();
    setRound(makeRound());
    setStep(0);
    setResult("");
    setPhase("playing");
  };

  useEffect(() => {
    if (phase !== "playing" || !round) return;
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= round.ticks.length - 1) {
          stop();
          setPhase("done");
          setResult("missed");
          setScore((sc) => ({ correct: sc.correct, total: sc.total + 1 }));
          return s;
        }
        return s + 1;
      });
    }, 2200);
    return stop;
  }, [phase, round, stop]);

  const flag = () => {
    if (phase !== "playing" || !round) return;
    stop();
    setPhase("done");
    const hit = step >= round.rlmStep && step <= round.rlmStep + 1;
    setResult(hit ? "hit" : "early");
    setScore((sc) => ({ correct: sc.correct + (hit ? 1 : 0), total: sc.total + 1 }));
  };

  const cur = round?.ticks[step];
  const prev = step > 0 ? round?.ticks[step - 1] : undefined;
  const delta = cur && prev ? cur.line - prev.line : 0;

  return (
    <div className="card p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="mono-label" style={{ color: "var(--subtle)" }}>
          Accuracy
        </div>
        <div className="font-mono text-sm tnum" style={{ color: "var(--gold)" }}>
          {score.correct} / {score.total}
        </div>
      </div>

      {phase === "idle" && (
        <div className="text-center py-10">
          <p className="font-sans text-sm mb-2" style={{ color: "var(--muted)" }}>
            The public is hammering one side. Watch the line move tick by tick.
          </p>
          <p className="font-sans text-sm mb-6" style={{ color: "var(--muted)" }}>
            The instant the line moves <em>against</em> the public — sharp money —
            hit the flag. Too early and it counts against you.
          </p>
          <button className="btn btn-primary" onClick={start}>
            Start watching <span className="btn-icon">→</span>
          </button>
        </div>
      )}

      {round && cur && phase !== "idle" && (
        <>
          <div className="flex items-center justify-between mb-1">
            <div className="font-display font-bold text-lg" style={{ color: "var(--ink)" }}>
              {round.team} <span style={{ color: "var(--subtle)" }}>vs {round.opp}</span>
            </div>
            <div className="font-mono text-[11px]" style={{ color: "var(--subtle)" }}>
              tick {step + 1}/{round.ticks.length}
            </div>
          </div>

          {/* Public % bar */}
          <div className="mt-4">
            <div className="flex justify-between font-mono text-[11px] mb-1.5" style={{ color: "var(--muted)" }}>
              <span>{round.team} public bets</span>
              <span className="tnum">{cur.pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cur.pct}%`, background: "var(--gold)" }} />
            </div>
          </div>

          {/* Line */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="mono-label" style={{ color: "var(--subtle)" }}>{round.team} line</div>
              <div className="font-display font-bold text-4xl tnum mt-1" style={{ color: "var(--ink)" }}>
                {cur.line > 0 ? `+${cur.line}` : cur.line}
              </div>
            </div>
            {prev && (
              <div className="font-mono text-sm tnum" style={{ color: delta > 0 ? "#e06a5a" : "var(--muted)" }}>
                {delta > 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}
                <div className="text-[10px]" style={{ color: "var(--subtle)" }}>
                  {delta > 0 ? "toward the dog" : "with the public"}
                </div>
              </div>
            )}
          </div>

          {/* Tick history */}
          <div className="flex gap-1.5 mt-6">
            {round.ticks.map((t, i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded flex items-center justify-center font-mono text-[10px] tnum"
                style={{
                  background: i <= step ? "var(--surface-2)" : "transparent",
                  border: "1px solid var(--line)",
                  color: i <= step ? "var(--muted)" : "var(--subtle)",
                  opacity: i <= step ? 1 : 0.4,
                }}
              >
                {i <= step ? t.line : "·"}
              </div>
            ))}
          </div>

          {phase === "playing" && (
            <button className="btn btn-primary w-full justify-center mt-6" onClick={flag}>
              Flag reverse movement
            </button>
          )}

          {phase === "done" && (
            <div className="mt-6">
              <div
                className="font-display font-bold text-xl"
                style={{ color: result === "hit" ? "#34d17f" : "#e06a5a" }}
              >
                {result === "hit" && "Sharp read."}
                {result === "early" && "Too early — that was normal drift."}
                {result === "missed" && "Missed it."}
              </div>
              <p className="font-sans text-sm mt-2" style={{ color: "var(--muted)" }}>
                The reverse move landed on tick {round.rlmStep + 1}: the line ticked
                up toward the underdog while {round.ticks[round.rlmStep].pct}% of bets
                were still on {round.team}. That gap is the sharp-money footprint.
              </p>
              <button className="btn btn-ghost w-full justify-center mt-5" onClick={start}>
                New matchup <span className="btn-icon">→</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
