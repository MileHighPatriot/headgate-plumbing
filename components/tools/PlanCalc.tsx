"use client";

import { useState } from "react";
import { money, priceById } from "@/data/pricing";
import { plan } from "@/data/plan";
import { site } from "@/data/site";

const PLAN_MONTHLY = plan.monthly;
const DISCOUNT = plan.discount;

const midpoint = (id: string) => {
  const p = priceById[id];
  return Math.round(((p.low + (p.high ?? p.low)) / 2) / 5) * 5;
};

const events = [
  { id: "wh-flush", label: "Water heater flush & check", included: true },
  { id: "backflow-res", label: "Sprinkler backflow test", included: true },
  { id: "main-cable", label: "A main line clog", included: false },
  { id: "wh-repair", label: "A water heater repair", included: false },
  { id: "toilet", label: "A toilet rebuild", included: false },
  { id: "after-hours", label: "One after-hours call", included: true },
];

export default function PlanCalc() {
  const [picked, setPicked] = useState<string[]>(["wh-flush", "main-cable"]);

  let without = 0;
  let withPlan = PLAN_MONTHLY * 12;
  for (const e of events) {
    if (!picked.includes(e.id)) continue;
    const price = midpoint(e.id);
    const dispatch = e.id === "after-hours" || e.id === "wh-flush" || e.id === "backflow-res" ? 0 : site.dispatchFee;
    without += price + dispatch;
    withPlan += e.included ? 0 : Math.round(price * (1 - DISCOUNT));
  }
  const diff = without - withPlan;

  return (
    <div className="panel grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
      <fieldset className="p-6 sm:p-8">
        <legend className="font-display text-2xl font-bold">In a typical year, would you need…</legend>
        <div className="mt-4 grid gap-1">
          {events.map((e) => (
            <label key={e.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl p-2.5 hover:bg-chalk">
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#1f7a6d]"
                  checked={picked.includes(e.id)}
                  onChange={() =>
                    setPicked((p) => (p.includes(e.id) ? p.filter((x) => x !== e.id) : [...p, e.id]))
                  }
                />
                {e.label}
              </span>
              <span className="t-data text-slate tabular">~{money(midpoint(e.id))}</span>
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate">
          Uses the middle of each price-book range, plus the ${site.dispatchFee} service call where it applies.
        </p>
      </fieldset>
      <div className="on-ink flex flex-col justify-center bg-ink p-6 text-paper sm:p-8" aria-live="polite">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="t-data text-fog">Without the plan</p>
            <p className="font-display text-3xl font-bold tabular">{money(without)}</p>
          </div>
          <div>
            <p className="t-data text-fog">With the plan</p>
            <p className="font-display text-3xl font-bold tabular">{money(withPlan)}</p>
            <p className="t-data text-fog">incl. {money(PLAN_MONTHLY * 12)}/yr</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-ink-2 p-5">
          {diff > 0 ? (
            <>
              <p className="t-data text-mint">You&apos;d come out ahead by</p>
              <p className="font-display text-5xl font-extrabold text-hivis tabular">{money(diff)}</p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-bold">Honestly? Skip it this year.</p>
              <p className="mt-1 text-fog">
                With that little plumbing, the plan costs {money(-diff)} more than paying as you go. We&apos;d rather tell
                you than sell you.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
