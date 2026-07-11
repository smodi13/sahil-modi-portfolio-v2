"use client";

import { useMemo, useState } from "react";

type Format = "first" | "second";
const N = 4; // total bidders (you + 3 rivals)

function makeRound() {
  const value = 400 + Math.round(Math.random() * 20) * 10; // $400–600M, round
  const rivals = Array.from({ length: N - 1 }, () =>
    Math.round((value * (0.68 + Math.random() * 0.5)) / 10) * 10
  );
  return { value, rivals };
}

export default function AuctionFormats() {
  const [round, setRound] = useState(makeRound);
  const [format, setFormat] = useState<Format>("second");
  const [bid, setBid] = useState(() => round.value);
  const [done, setDone] = useState(false);
  const [totals, setTotals] = useState({ surplus: 0, rounds: 0, wins: 0 });

  const maxBid = Math.round(round.value * 1.25);

  const outcome = useMemo(() => {
    // rivals bid truthfully in second-price, shade by (N-1)/N in first-price
    const rivalBids = round.rivals.map((v) =>
      format === "first" ? Math.round((v * (N - 1)) / N) : v
    );
    const topRival = Math.max(...rivalBids);
    const win = bid > topRival;
    const pay = win ? (format === "first" ? bid : topRival) : 0;
    const surplus = win ? round.value - pay : 0;
    return { rivalBids, topRival, win, pay, surplus };
  }, [round, format, bid]);

  const submit = () => {
    if (done) return;
    setDone(true);
    setTotals((t) => ({
      surplus: t.surplus + outcome.surplus,
      rounds: t.rounds + 1,
      wins: t.wins + (outcome.win ? 1 : 0),
    }));
  };

  const next = () => {
    const r = makeRound();
    setRound(r);
    setBid(r.value);
    setFormat(Math.random() > 0.5 ? "first" : "second");
    setDone(false);
  };

  const optimal =
    format === "second"
      ? round.value
      : Math.round((round.value * (N - 1)) / N);

  return (
    <div className="card p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="mono-label" style={{ color: "var(--subtle)" }}>
          Net value captured
        </div>
        <div className="font-mono text-sm tnum" style={{ color: totals.surplus >= 0 ? "var(--gold)" : "#e06a5a" }}>
          ${totals.surplus}M · {totals.wins}/{totals.rounds} won
        </div>
      </div>

      {/* Format toggle */}
      <div className="flex gap-2 mb-6">
        {(["first", "second"] as Format[]).map((f) => (
          <button
            key={f}
            disabled={done}
            onClick={() => setFormat(f)}
            className="flex-1 rounded-full py-2.5 font-mono text-xs transition-colors"
            style={{
              background: format === f ? "var(--gold)" : "var(--surface-2)",
              color: format === f ? "#0d0d0c" : "var(--muted)",
              border: "1px solid var(--line)",
              opacity: done && format !== f ? 0.4 : 1,
            }}
          >
            {f === "first" ? "Sealed first-price" : "Second-price (Vickrey)"}
          </button>
        ))}
      </div>

      <p className="font-sans text-[13px] leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        {format === "first"
          ? "Highest sealed bid wins and pays exactly what they bid. Bid your full value and you win but capture nothing — you have to shade down."
          : "Highest bid wins but pays the runner-up's bid. Your dominant strategy is to bid your true value: it never changes what you pay, only whether you win."}
      </p>

      <div className="rounded-xl p-5 mb-6" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
        <div className="flex items-baseline justify-between">
          <span className="mono-label" style={{ color: "var(--subtle)" }}>Target worth to you</span>
          <span className="font-display font-bold text-2xl tnum" style={{ color: "var(--ink)" }}>${round.value}M</span>
        </div>
        <div className="font-mono text-[11px] mt-2" style={{ color: "var(--subtle)" }}>
          Three rival acquirers are bidding against you.
        </div>
      </div>

      {/* Bid slider */}
      <div className="mb-2 flex items-baseline justify-between">
        <span className="mono-label">Your bid</span>
        <span className="font-display font-bold text-xl tnum" style={{ color: "var(--gold)" }}>${bid}M</span>
      </div>
      <input
        type="range"
        min={0}
        max={maxBid}
        step={10}
        value={bid}
        disabled={done}
        onChange={(e) => setBid(Number(e.target.value))}
        className="w-full accent-[var(--gold)]"
      />
      <div className="flex justify-between font-mono text-[10px] mt-1" style={{ color: "var(--subtle)" }}>
        <span>$0</span>
        <span>${maxBid}M</span>
      </div>

      {!done ? (
        <button className="btn btn-primary w-full justify-center mt-6" onClick={submit}>
          Submit bid <span className="btn-icon">→</span>
        </button>
      ) : (
        <div className="mt-6">
          <div className="font-display font-bold text-xl" style={{ color: outcome.win ? "#34d17f" : "#e06a5a" }}>
            {outcome.win ? "You won the deal" : "Outbid — you walk"}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <MiniStat k="You paid" v={outcome.win ? `$${outcome.pay}M` : "—"} />
            <MiniStat k="Net captured" v={outcome.win ? `$${outcome.surplus}M` : "$0M"} accent={outcome.surplus > 0} />
            <MiniStat k="Top rival bid" v={`$${outcome.topRival}M`} />
          </div>
          <div className="rounded-xl p-4 mt-4" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
            <div className="font-mono text-[11px]" style={{ color: "var(--subtle)" }}>Rival bids: {outcome.rivalBids.map((b) => `$${b}M`).join(" · ")}</div>
            <div className="font-mono text-[11px] mt-2" style={{ color: "var(--gold)" }}>
              Textbook bid here ≈ ${optimal}M ({format === "second" ? "your true value" : `${Math.round(((N - 1) / N) * 100)}% of value`}).
            </div>
          </div>
          <button className="btn btn-ghost w-full justify-center mt-5" onClick={next}>
            Next target <span className="btn-icon">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

function MiniStat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-lg px-3 py-3" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
      <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>{k}</div>
      <div className="font-display font-bold text-base mt-1 tnum" style={{ color: accent ? "#34d17f" : "var(--ink)" }}>{v}</div>
    </div>
  );
}
