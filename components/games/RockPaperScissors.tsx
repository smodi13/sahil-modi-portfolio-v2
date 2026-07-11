"use client";

import { useRef, useState } from "react";

type Move = "rock" | "paper" | "scissors";
const MOVES: Move[] = ["rock", "paper", "scissors"];
const ICON: Record<Move, string> = { rock: "✊", paper: "✋", scissors: "✌️" };
// the move that beats the key
const BEATS: Record<Move, Move> = { rock: "paper", paper: "scissors", scissors: "rock" };
// key beats value
const LOSES_TO: Record<Move, Move> = { rock: "scissors", paper: "rock", scissors: "paper" };

function argmax(counts: Record<Move, number>): Move | null {
  let best: Move | null = null;
  let bestN = 0;
  for (const m of MOVES) if (counts[m] > bestN) { bestN = counts[m]; best = m; }
  return best;
}

export default function RockPaperScissors() {
  // order-1 transition counts: trans[prev][next]
  const trans = useRef<Record<Move, Record<Move, number>>>({
    rock: { rock: 0, paper: 0, scissors: 0 },
    paper: { rock: 0, paper: 0, scissors: 0 },
    scissors: { rock: 0, paper: 0, scissors: 0 },
  });
  const order0 = useRef<Record<Move, number>>({ rock: 0, paper: 0, scissors: 0 });
  const last = useRef<Move | null>(null);

  const [score, setScore] = useState({ win: 0, loss: 0, draw: 0 });
  const [round, setRound] = useState<{ you: Move; agent: Move; predicted: Move; result: "win" | "loss" | "draw" } | null>(null);
  const [history, setHistory] = useState<("win" | "loss" | "draw")[]>([]);
  const [expect, setExpect] = useState<Move | null>(null);

  const predict = (): Move => {
    const prev = last.current;
    if (prev) {
      const a = argmax(trans.current[prev]);
      if (a) return a;
    }
    const g = argmax(order0.current);
    return g ?? MOVES[Math.floor(Math.random() * 3)];
  };

  const play = (you: Move) => {
    // agent predicts BEFORE seeing this move, using the prior move
    const predicted = predict();
    const agent = BEATS[predicted]; // play the counter to the predicted move

    let result: "win" | "loss" | "draw";
    if (you === agent) result = "draw";
    else if (LOSES_TO[you] === agent) result = "win"; // your move beats agent's
    else result = "loss";

    // update model
    if (last.current) trans.current[last.current][you] += 1;
    order0.current[you] += 1;
    last.current = you;

    setScore((s) => ({ ...s, [result]: s[result] + 1 }));
    setRound({ you, agent, predicted, result });
    setHistory((h) => [result, ...h].slice(0, 18));
    setExpect(predict()); // what it now expects next
  };

  const reset = () => {
    trans.current = {
      rock: { rock: 0, paper: 0, scissors: 0 },
      paper: { rock: 0, paper: 0, scissors: 0 },
      scissors: { rock: 0, paper: 0, scissors: 0 },
    };
    order0.current = { rock: 0, paper: 0, scissors: 0 };
    last.current = null;
    setScore({ win: 0, loss: 0, draw: 0 });
    setRound(null);
    setHistory([]);
    setExpect(null);
  };

  const total = score.win + score.loss + score.draw;

  return (
    <div className="card p-7">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Score k="You" v={score.win} c="#34d17f" />
        <Score k="Draw" v={score.draw} c="var(--muted)" />
        <Score k="Agent" v={score.loss} c="#e06a5a" />
      </div>

      {/* Arena */}
      <div className="rounded-xl p-6 mb-6 flex items-center justify-around" style={{ background: "var(--surface-2)", border: "1px solid var(--line)", minHeight: 120 }}>
        {round ? (
          <>
            <div className="text-center">
              <div className="text-4xl">{ICON[round.you]}</div>
              <div className="font-mono text-[11px] mt-2" style={{ color: "var(--muted)" }}>you</div>
            </div>
            <div className="font-display font-bold text-lg" style={{ color: round.result === "win" ? "#34d17f" : round.result === "loss" ? "#e06a5a" : "var(--subtle)" }}>
              {round.result === "win" ? "WIN" : round.result === "loss" ? "LOSS" : "DRAW"}
            </div>
            <div className="text-center">
              <div className="text-4xl">{ICON[round.agent]}</div>
              <div className="font-mono text-[11px] mt-2" style={{ color: "var(--muted)" }}>agent</div>
            </div>
          </>
        ) : (
          <p className="font-sans text-sm text-center" style={{ color: "var(--muted)" }}>
            Throw a move. The agent learns your patterns and plays the counter — beating it means staying genuinely unpredictable.
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-3">
        {MOVES.map((m) => (
          <button
            key={m}
            onClick={() => play(m)}
            className="rounded-xl py-4 transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{ background: "var(--surface-2)", border: "1px solid var(--line-strong)" }}
          >
            <div className="text-3xl">{ICON[m]}</div>
            <div className="font-mono text-[10px] mt-1.5 capitalize" style={{ color: "var(--muted)" }}>{m}</div>
          </button>
        ))}
      </div>

      {/* Agent read */}
      {total >= 5 && expect && (
        <div className="rounded-xl p-4 mt-6" style={{ background: "rgba(169,126,40,0.07)", border: "1px solid rgba(169,126,40,0.22)" }}>
          <div className="font-mono text-[11px]" style={{ color: "var(--gold)" }}>
            The agent is now expecting you to throw {ICON[expect]} {expect} next.
          </div>
          <div className="font-mono text-[10px] mt-1" style={{ color: "var(--subtle)" }}>
            It plays the counter automatically. Break the pattern to break the model.
          </div>
        </div>
      )}

      {/* History strip */}
      {history.length > 0 && (
        <>
          <div className="flex gap-1 mt-6">
            {history.map((h, i) => (
              <span key={i} className="flex-1 h-1.5 rounded-full" style={{ background: h === "win" ? "#34d17f" : h === "loss" ? "#e06a5a" : "var(--line-strong)" }} />
            ))}
          </div>
          <button className="btn btn-ghost w-full justify-center mt-6" onClick={reset}>
            Reset the agent <span className="btn-icon">↺</span>
          </button>
        </>
      )}
    </div>
  );
}

function Score({ k, v, c }: { k: string; v: number; c: string }) {
  return (
    <div className="rounded-lg px-3 py-3 text-center" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
      <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>{k}</div>
      <div className="font-display font-bold text-2xl mt-1 tnum" style={{ color: c }}>{v}</div>
    </div>
  );
}
