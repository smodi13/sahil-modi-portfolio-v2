"use client";

import { useMemo, useState } from "react";

const TARGET = 50; // founder ownership target at exit (%)
const RETENTION_MIN = 0.55; // early investors must keep >= 55% of entry stake

type RoundInput = { sell: number; pool: number }; // percentages
const ROUND_NAMES = ["Seed", "Series A", "Series B"];

type Holder = { key: string; label: string; pct: number; entry: number; color: string };

const COLORS: Record<string, string> = {
  founders: "#d0af57",
  esop: "rgba(28,26,22,0.22)",
  Seed: "#6fa8dc",
  "Series A": "#8e7cc3",
  "Series B": "#5fb59a",
};

function build(rounds: RoundInput[]) {
  let holders: Holder[] = [
    { key: "founders", label: "Founders", pct: 100, entry: 100, color: COLORS.founders },
    { key: "esop", label: "ESOP", pct: 0, entry: 0, color: COLORS.esop },
  ];
  rounds.forEach((r, i) => {
    const q = r.pool / 100;
    const s = r.sell / 100;
    if (q > 0) {
      holders = holders.map((h) => ({ ...h, pct: h.pct * (1 - q) }));
      holders.find((h) => h.key === "esop")!.pct += q * 100;
    }
    if (s > 0) {
      holders = holders.map((h) => ({ ...h, pct: h.pct * (1 - s) }));
      const name = ROUND_NAMES[i];
      holders.push({ key: name, label: name, pct: s * 100, entry: s * 100, color: COLORS[name] });
    }
  });
  return holders;
}

export default function CapTableChess() {
  const [rounds, setRounds] = useState<RoundInput[]>([
    { sell: 15, pool: 10 },
    { sell: 18, pool: 5 },
    { sell: 15, pool: 0 },
  ]);
  const [locked, setLocked] = useState(false);

  const holders = useMemo(() => build(rounds), [rounds]);
  const founder = holders.find((h) => h.key === "founders")!.pct;
  const investors = holders.filter((h) => ["Seed", "Series A", "Series B"].includes(h.key));
  const retentions = investors.map((h) => ({ label: h.label, r: h.pct / h.entry }));
  const overDiluted = retentions.filter((x) => x.r < RETENTION_MIN);
  const founderOk = founder >= TARGET;
  const win = founderOk && overDiluted.length === 0;

  const set = (i: number, key: keyof RoundInput, val: number) =>
    setRounds((rs) => rs.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));

  return (
    <div className="card p-7">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <div className="mono-label" style={{ color: "var(--subtle)" }}>Founder ownership at exit</div>
          <div className="font-display font-bold text-3xl tnum" style={{ color: founderOk ? "#34d17f" : "var(--ink)" }}>
            {founder.toFixed(1)}%
          </div>
        </div>
        <div className="text-right">
          <div className="mono-label" style={{ color: "var(--subtle)" }}>Target</div>
          <div className="font-mono text-lg tnum" style={{ color: "var(--gold)" }}>≥ {TARGET}%</div>
        </div>
      </div>

      {/* Stacked ownership bar */}
      <div className="flex h-9 rounded-lg overflow-hidden mb-2" style={{ border: "1px solid var(--line)" }}>
        {holders.filter((h) => h.pct > 0.5).map((h) => (
          <div
            key={h.key}
            className="h-full transition-all duration-300 flex items-center justify-center"
            style={{ width: `${h.pct}%`, background: h.color }}
            title={`${h.label} ${h.pct.toFixed(1)}%`}
          >
            {h.pct > 9 && (
              <span className="font-mono text-[10px] tnum" style={{ color: h.key === "esop" ? "var(--ink)" : "#0d0d0c" }}>
                {h.pct.toFixed(0)}%
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-7">
        {holders.filter((h) => h.pct > 0.5).map((h) => (
          <div key={h.key} className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--muted)" }}>
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: h.color }} />
            {h.label} {h.pct.toFixed(1)}%
          </div>
        ))}
      </div>

      {/* Round controls */}
      <div className="space-y-5">
        {rounds.map((r, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
            <div className="font-mono text-xs mb-3" style={{ color: COLORS[ROUND_NAMES[i]] }}>{ROUND_NAMES[i]}</div>
            <Slider label="Equity sold to new investor" v={r.sell} min={5} max={35} disabled={locked} onChange={(v) => set(i, "sell", v)} />
            <div className="h-3" />
            <Slider label="Option pool top-up" v={r.pool} min={0} max={15} disabled={locked} onChange={(v) => set(i, "pool", v)} />
          </div>
        ))}
      </div>

      {/* Constraints / feedback */}
      <div className="mt-6 space-y-2">
        <Check ok={founderOk} label={`Founders keep at least ${TARGET}%`} />
        <Check
          ok={overDiluted.length === 0}
          label={
            overDiluted.length === 0
              ? "No early investor over-diluted"
              : `Over-diluted: ${overDiluted.map((o) => o.label).join(", ")} (kept < ${Math.round(RETENTION_MIN * 100)}% of entry stake)`
          }
        />
      </div>

      {!locked ? (
        <button className="btn btn-primary w-full justify-center mt-6" onClick={() => setLocked(true)}>
          Lock the structure <span className="btn-icon">→</span>
        </button>
      ) : (
        <div className="mt-6">
          <div className="font-display font-bold text-xl" style={{ color: win ? "#34d17f" : "#e06a5a" }}>
            {win ? "Clean cap table — you threaded it." : "Structure needs work."}
          </div>
          <p className="font-sans text-sm mt-2" style={{ color: "var(--muted)" }}>
            {win
              ? "You hit the founder target while keeping every early backer whole. That's the balance a good term sheet strikes."
              : "Selling too much later dilutes the seed round that took the first risk. Try smaller later raises or a tighter option pool."}
          </p>
          <button className="btn btn-ghost w-full justify-center mt-5" onClick={() => setLocked(false)}>
            Keep tuning <span className="btn-icon">↺</span>
          </button>
        </div>
      )}
    </div>
  );
}

function Slider({ label, v, min, max, onChange, disabled }: { label: string; v: number; min: number; max: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[11px] mb-1.5">
        <span style={{ color: "var(--muted)" }}>{label}</span>
        <span className="tnum" style={{ color: "var(--gold)" }}>{v}%</span>
      </div>
      <input type="range" min={min} max={max} step={1} value={v} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[var(--gold)]" />
    </div>
  );
}
function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-start gap-2 font-mono text-[12px]">
      <span style={{ color: ok ? "#34d17f" : "#e06a5a" }}>{ok ? "✓" : "✗"}</span>
      <span style={{ color: "var(--muted)" }}>{label}</span>
    </div>
  );
}
