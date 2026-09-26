"use client";

import Link from "next/link";
import { useId, useState } from "react";
import Icon from "@/components/Icon";
import { ageInYears, brands, decodeSerial, TANK_LIFE, type Brand, type Decoded } from "@/lib/heater";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SCALE = 16; // years shown on the life bar

function verdict(age: number) {
  if (age < 6) return { tone: "wait", title: "Plenty of life left", body: "Flush it once a year to keep sediment from shortening that." } as const;
  if (age < TANK_LIFE.low)
    return { tone: "wait", title: "Mid-life", body: "Keep up the yearly flush and have the anode rod checked — it's what the tank sacrifices to avoid rusting." } as const;
  if (age <= TANK_LIFE.high)
    return { tone: "today", title: "In the replacement window", body: "No need to panic, but it's worth pricing a replacement now so you're choosing on your schedule, not after a leak." } as const;
  return { tone: "now", title: "Past typical life", body: "Tanks this old tend to fail by leaking. Check the base for moisture and plan a replacement soon." } as const;
}

export default function HeaterAge() {
  const inputId = useId();
  const [brand, setBrand] = useState<Brand>("rheem");
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<Decoded | null>(null);
  const b = brands.find((x) => x.id === brand)!;

  const run = (value = serial, which = brand) => setResult(decodeSerial(which, value));

  const now = new Date();
  const age = result?.ok ? ageInYears(result.year, result.month, now) : 0;
  const v = verdict(age);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form
        className="panel p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <p id="brand-label" className="font-display text-xl font-bold">
          1. Brand on the label
        </p>
        <div role="radiogroup" aria-labelledby="brand-label" className="mt-3 grid gap-2">
          {brands.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={brand === x.id}
              onClick={() => {
                setBrand(x.id);
                setResult(null);
              }}
              className="chip w-full justify-start"
            >
              {x.label}
            </button>
          ))}
        </div>

        <label htmlFor={inputId} className="mt-8 block font-display text-xl font-bold">
          2. Serial number
        </label>
        <p className="mt-1 text-sm text-slate">
          On the rating plate on the side of the tank, usually near the model number. Look for “S/N” or “Serial.”
        </p>
        <input
          id={inputId}
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder={b.example}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          className="field mt-3 font-mono text-lg tracking-wider"
        />
        <p className="mt-2 text-sm text-slate">
          {b.where}{" "}
          <button
            type="button"
            className="link"
            onClick={() => {
              setSerial(b.example);
              run(b.example);
            }}
          >
            Try the example
          </button>
        </p>
        <button type="submit" className="btn btn-ink mt-6 w-full">
          Decode the date
        </button>
      </form>

      <div aria-live="polite">
        {!result && (
          <div className="on-ink panel-ink flex min-h-72 flex-col justify-center p-8">
            <p className="label self-start">How long they last</p>
            <p className="mt-4 font-display text-4xl font-extrabold">
              {TANK_LIFE.low}–{TANK_LIFE.high} years
            </p>
            <p className="mt-3 max-w-md text-fog">
              That&apos;s the typical life of a tank water heater. Hard winters, high water pressure and skipped
              flushes pull it toward the low end. Tankless units often last 20 years with descaling.
            </p>
          </div>
        )}

        {result && !result.ok && (
          <div className="rise rounded-[var(--radius-fit)] bg-amber-note p-8">
            <p className="flex items-center gap-2 font-display text-2xl font-bold">
              <Icon name="alert" className="h-6 w-6" /> We couldn&apos;t read that one
            </p>
            <p className="mt-3">{result.reason}</p>
            <p className="mt-3 text-sm text-slate">
              Still stuck? Text a photo of the label to our dispatch line and we&apos;ll read it for you.
            </p>
          </div>
        )}

        {result?.ok && (
          <div className="on-ink panel-ink rise overflow-hidden">
            <div className="p-6 sm:p-8">
              <p className="t-data text-mint">Built {MONTHS[result.month - 1]} {result.year}</p>
              <p className="mt-2 font-display text-6xl font-extrabold tabular">
                {age < 1 ? "<1" : age.toFixed(1)}
                <span className="ml-2 text-2xl text-fog">years old</span>
              </p>

              <div className="mt-8" aria-hidden="true">
                <div className="relative h-4 rounded-full bg-ink-3">
                  <div
                    className="absolute inset-y-0 rounded-full bg-hivis/25"
                    style={{ left: `${(TANK_LIFE.low / SCALE) * 100}%`, width: `${((TANK_LIFE.high - TANK_LIFE.low) / SCALE) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-mint"
                    style={{ width: `${Math.min(100, (age / SCALE) * 100)}%` }}
                  />
                  <div
                    className="absolute -top-1.5 h-7 w-1.5 rounded bg-hivis"
                    style={{ left: `calc(${Math.min(100, (age / SCALE) * 100)}% - 3px)` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-xs text-fog">
                  <span>0</span>
                  <span style={{ marginLeft: `${(TANK_LIFE.low / SCALE) * 100 - 8}%` }}>
                    {TANK_LIFE.low}–{TANK_LIFE.high} yr typical
                  </span>
                  <span>{SCALE}+</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 bg-ink-2 p-6 sm:p-8">
              <span className={`urgency urgency-${v.tone === "now" ? "now" : v.tone === "today" ? "today" : "wait"}`}>
                {v.title}
              </span>
              <p className="mt-3 text-paper/90">{v.body}</p>
              <p className="t-data mt-4 text-fog">How we read it: {result.basis}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book/?need=no-hot" className="btn btn-go">
                  {age >= TANK_LIFE.low ? "Get a replacement price" : "Book a flush & check"}
                </Link>
                <Link href="/services/water-heaters/" className="btn btn-line">
                  Water heater service
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-line bg-paper p-5 text-sm text-slate">
          <p className="font-bold text-ink">Colorado note: altitude-rated gas units</p>
          <p className="mt-1">
            At Denver&apos;s elevation, gas appliances have to be derated (or supplied with gas that already accounts for
            altitude). When we replace a gas water heater, we install and set up a unit rated for 5,280 feet.
          </p>
        </div>
      </div>
    </div>
  );
}
