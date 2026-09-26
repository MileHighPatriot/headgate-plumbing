"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { FREEZE_F, useForecast } from "@/lib/useForecast";

const CHECKLIST = [
  { id: "shutoff", text: "Find your main shutoff and make sure it turns.", when: "Before winter" },
  { id: "hoses", text: "Disconnect garden hoses from outdoor spigots.", when: "Before winter" },
  { id: "sprinkler", text: "Blow out and drain the sprinkler system.", when: "Before winter" },
  { id: "insulate", text: "Insulate pipes on exterior walls, in crawlspaces and in the garage.", when: "Before winter" },
  { id: "meter", text: "Keep the meter pit lid on and clear of snow piles and decorations.", when: "Before winter" },
  { id: "cabinets", text: "Open sink cabinets on exterior walls so warm air reaches the pipes.", when: "Freeze night" },
  { id: "drip", text: "Drip the faucet farthest from where water enters the house.", when: "Freeze night" },
  { id: "heat", text: "Keep the heat at 65°F or higher, even when you're away.", when: "Freeze night" },
  { id: "garage", text: "Keep the garage door closed if pipes run through it.", when: "Freeze night" },
];

const KEY = "hg-freeze-checklist";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function FreezeWatch() {
  const forecast = useForecast();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved checklist
      if (Array.isArray(saved)) setDone(saved);
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setDone((d) => {
      const next = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const days = forecast.status === "ok" ? forecast.days : [];
  const coldest = days.length ? Math.min(...days.map((d) => d.low)) : null;
  const freezeNights = days.filter((d) => d.low <= FREEZE_F);
  const minScale = Math.min(-5, coldest ?? 0);
  const maxScale = Math.max(80, ...days.map((d) => d.high));
  const pct = (t: number) => ((t - minScale) / (maxScale - minScale)) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="on-ink panel-ink p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold">Denver, next 7 nights</p>
          {forecast.status === "ok" && (
            <span className={`urgency ${freezeNights.length ? "urgency-today" : "bg-white/10 text-mint"}`}>
              {freezeNights.length
                ? `Freeze Watch: ${freezeNights.length} night${freezeNights.length > 1 ? "s" : ""} at or below ${FREEZE_F}°F`
                : "No freeze-risk nights this week"}
            </span>
          )}
        </div>

        {forecast.status === "loading" && (
          <div className="mt-8 grid grid-cols-7 gap-2" aria-label="Loading forecast">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-ink-3" />
            ))}
          </div>
        )}

        {forecast.status === "error" && (
          <div className="mt-6 rounded-xl bg-ink-2 p-5">
            <p className="font-bold">The forecast didn&apos;t load.</p>
            <p className="mt-1 text-fog">
              The checklist still applies — any night forecast at {FREEZE_F}°F or below is a freeze-risk night for
              pipes on exterior walls.
            </p>
          </div>
        )}

        {forecast.status === "ok" && (
          <>
            <ul className="mt-8 grid grid-cols-7 gap-1.5 sm:gap-2">
              {days.map((d, i) => {
                const date = new Date(`${d.date}T12:00:00`);
                const cold = d.low <= FREEZE_F;
                return (
                  <li key={d.date} className={`flex flex-col items-center rounded-xl px-1 py-3 ${cold ? "bg-hivis/10 ring-1 ring-hivis/60" : "bg-ink-2"}`}>
                    <span className="t-data text-fog">{i === 0 ? "Today" : DAYS[date.getDay()]}</span>
                    <span className="t-data mt-1 text-paper tabular">{d.high}°</span>
                    <div className="relative my-2 h-36 w-2 rounded-full bg-ink-3" aria-hidden="true">
                      <div
                        className={`absolute inset-x-0 rounded-full ${cold ? "bg-hivis" : "bg-mint"}`}
                        style={{ bottom: `${pct(d.low)}%`, top: `${100 - pct(d.high)}%` }}
                      />
                      <div className="absolute -inset-x-1.5 h-px bg-alert/80" style={{ bottom: `${pct(FREEZE_F)}%` }} />
                    </div>
                    <span className={`font-display text-lg font-bold tabular ${cold ? "text-hivis" : "text-paper"}`}>
                      {d.low}°
                    </span>
                    {cold ? <Icon name="snow" className="mt-1 h-4 w-4 text-hivis" /> : <span className="mt-1 h-4" />}
                    <span className="sr-only">
                      {cold ? "Freeze risk. " : ""}Low {d.low}, high {d.high}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="t-data mt-4 flex items-center gap-2 text-fog">
              <span className="h-px w-5 bg-alert" /> {FREEZE_F}°F line · Forecast: Open-Meteo, updated every 30 min
            </p>
          </>
        )}
      </div>

      <div className="panel p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl font-bold">Freeze checklist</p>
          <span className="t-data text-slate tabular">
            {done.length}/{CHECKLIST.length}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate">Based on Denver Water&apos;s frozen-pipe advice. Saved on this device.</p>
        {(["Before winter", "Freeze night"] as const).map((group) => (
          <fieldset key={group} className="mt-6">
            <legend className="t-data text-patina-deep">{group}</legend>
            <div className="mt-2 grid gap-1">
              {CHECKLIST.filter((c) => c.when === group).map((c) => {
                const checked = done.includes(c.id);
                return (
                  <label key={c.id} className="flex cursor-pointer gap-3 rounded-xl p-2.5 hover:bg-chalk">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(c.id)}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#1f7a6d]"
                    />
                    <span className={checked ? "text-slate line-through decoration-patina/60" : ""}>{c.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
