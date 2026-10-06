"use client";

import { useId, useState } from "react";
import Icon from "@/components/Icon";
import { money } from "@/data/pricing";

const FIRST = 150;
const EACH_ADDITIONAL = 95;

const providers = {
  denver: { label: "Denver Water", filing: "Denver Water requires the test report to be submitted within 10 days of the test. We file it for you." },
  aurora: { label: "Aurora Water", filing: "Aurora Water sets its own reporting rules. We file with them and confirm the deadline on your notice." },
  other: { label: "Another provider", filing: "Every provider sets its own deadline and reporting rules. Send us your notice and we'll match it." },
};

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BackflowTool() {
  const dateId = useId();
  const countId = useId();
  const [last, setLast] = useState("");
  const [count, setCount] = useState(1);
  const [provider, setProvider] = useState<keyof typeof providers>("denver");
  const [email, setEmail] = useState("");
  const [reminded, setReminded] = useState(false);

  const lastDate = last ? new Date(`${last}T00:00:00Z`) : null;
  const due = lastDate ? new Date(Date.UTC(lastDate.getUTCFullYear() + 1, lastDate.getUTCMonth(), lastDate.getUTCDate())) : null;
  const today = new Date();
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const daysLeft = due ? Math.round((due.getTime() - todayUTC) / 86400000) : null;
  const status =
    daysLeft === null ? null : daysLeft < 0 ? "overdue" : daysLeft <= 60 ? "soon" : "ok";
  const cost = count > 0 ? FIRST + (count - 1) * EACH_ADDITIONAL : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="panel p-6 sm:p-8">
        <p className="font-display text-2xl font-bold">When is your next backflow test due?</p>
        <div className="mt-6 grid gap-5">
          <label htmlFor={dateId} className="grid gap-1.5">
            <span className="font-bold">Date of the last test</span>
            <input id={dateId} type="date" className="field" value={last} onChange={(e) => setLast(e.target.value)} />
          </label>
          <label htmlFor={countId} className="grid gap-1.5">
            <span className="font-bold">Backflow assemblies on site</span>
            <span className="text-sm text-slate">Domestic, fire line and irrigation each count separately.</span>
            <input
              id={countId}
              type="number"
              min={1}
              max={40}
              className="field w-32"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(40, Number(e.target.value) || 1)))}
            />
          </label>
          <fieldset>
            <legend className="font-bold">Water provider</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(providers) as (keyof typeof providers)[]).map((p) => (
                <button key={p} type="button" aria-pressed={provider === p} onClick={() => setProvider(p)} className="chip min-h-10 text-sm">
                  {providers[p].label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="on-ink panel-ink flex flex-col p-6 sm:p-8" aria-live="polite">
        {!due ? (
          <div className="my-auto">
            <Icon name="calendar" className="h-8 w-8 text-mint" />
            <p className="mt-4 font-display text-2xl font-bold">Enter the last test date.</p>
            <p className="mt-2 text-fog">
              It&apos;s on last year&apos;s test tag hanging from the assembly, or on the notice from your water provider.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`urgency ${status === "overdue" ? "urgency-now" : status === "soon" ? "urgency-today" : "bg-white/10 text-mint"}`}
              >
                {status === "overdue" ? "Overdue" : status === "soon" ? "Due soon" : "On schedule"}
              </span>
              <span className="t-data text-fog">Annual test</span>
            </div>
            <p className="t-data mt-6 text-fog">Next test due by</p>
            <p className="font-display text-4xl font-extrabold">{fmt(due)}</p>
            <p className="mt-1 text-mint tabular">
              {daysLeft! < 0 ? `${Math.abs(daysLeft!)} days overdue` : daysLeft === 0 ? "Due today" : `${daysLeft} days from today`}
            </p>
            <p className="mt-5 text-paper/85">{providers[provider].filing}</p>
            <div className="mt-6 flex items-baseline justify-between gap-4 rounded-xl bg-ink-2 p-4">
              <span className="text-fog">
                {count} assembl{count === 1 ? "y" : "ies"}, tested and filed
              </span>
              <span className="font-display text-2xl font-bold text-hivis tabular">{money(cost)}</span>
            </div>

            {reminded ? (
              <p className="mt-6 flex items-center gap-2 font-bold text-hivis">
                <Icon name="check" className="h-5 w-5" strokeWidth={3} /> We&apos;ll remind {email} 45 days before it&apos;s
                due. (Demo only. Nothing sent.)
              </p>
            ) : (
              <form
                className="mt-6 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (/\S+@\S+\.\S+/.test(email)) setReminded(true);
                }}
              >
                <label className="sr-only" htmlFor="remind-email">
                  Email for a reminder
                </label>
                <input
                  id="remind-email"
                  type="email"
                  placeholder="Email me 45 days before"
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-go shrink-0">
                  Remind me
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
