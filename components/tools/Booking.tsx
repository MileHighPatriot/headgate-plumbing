"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import { symptomById, symptoms } from "@/data/symptoms";
import { team } from "@/data/team";
import { dayLabel, shortDate, upcomingDays, windowLabel, type Slot } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";

const extraNeeds = [
  { id: "install", label: "Install or replace something" },
  { id: "inspect", label: "Inspection or camera scope" },
  { id: "backflow", label: "Backflow test" },
  { id: "other", label: "Something else" },
];

function needLabel(id: string) {
  return symptomById[id]?.label ?? extraNeeds.find((n) => n.id === id)?.label ?? "";
}

function techFor(need: string, kind: string) {
  if (kind === "business" || need === "backflow") return team[3];
  if (need === "no-hot" || need === "install") return team[2];
  if (need === "backup" || need === "sewer-smell" || need === "inspect") return team[1];
  return team[1];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

function Line({ k, v }: { k: string; v?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2.5">
      <span className="t-data text-slate">{k}</span>
      <span className="text-right font-bold">{v}</span>
    </div>
  );
}

export default function Booking() {
  const now = useNow(60000);
  const [need, setNeed] = useState("");
  const [kind, setKind] = useState<"home" | "business">("home");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("need");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- prefill from triage deep link
    if (p && (symptomById[p] || extraNeeds.some((n) => n.id === p))) setNeed(p);
  }, []);

  const days = useMemo(() => (now ? upcomingDays(5, now) : []), [now]);
  const emergency = need && symptomById[need] && Object.values(symptomById[need].outcomes).every((o) => o.urgency === "now");
  const tech = techFor(need, kind);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!need) errs.push("Choose what's going on.");
    if (!slot) errs.push("Pick an arrival window.");
    if (!form.name.trim()) errs.push("Add your name.");
    if (form.phone.replace(/\D/g, "").length < 10) errs.push("Add a 10-digit phone number so we can text you.");
    if (!form.address.trim()) errs.push("Add the service address.");
    setErrors(errs);
    if (errs.length) return;
    const n = Math.floor(1000 + Math.random() * 9000);
    setRef(`HG-${String(slot!.date.m).padStart(2, "0")}${String(slot!.date.d).padStart(2, "0")}-${n}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (ref && slot) {
    return (
      <div className="mx-auto max-w-2xl rise">
        <div className="on-ink panel-ink overflow-hidden">
          <div className="flex items-center justify-between gap-4 bg-hivis px-6 py-4 text-ink sm:px-8">
            <p className="flex items-center gap-2 font-display text-xl font-extrabold">
              <Icon name="check" className="h-6 w-6" strokeWidth={3} /> You&apos;re on the board
            </p>
            <p className="font-mono font-bold">{ref}</p>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="t-data text-fog">Arrival window</p>
              <p className="mt-1 font-display text-3xl font-extrabold">{windowLabel(slot.start)}</p>
              <p className="text-mint">
                {dayLabel(slot.date, now ?? undefined)}, {shortDate(slot.date)}
              </p>
              <p className="t-data mt-5 text-fog">For</p>
              <p className="font-bold">{needLabel(need)}</p>
              <p className="text-fog">{form.address}</p>
            </div>
            <div className="rounded-2xl bg-ink-2 p-5">
              <p className="t-data text-fog">Your plumber (sample)</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint font-display text-xl font-extrabold text-ink">
                  {initials(tech.name)}
                </span>
                <div>
                  <p className="font-bold">{tech.name}</p>
                  <p className="text-sm text-fog">
                    {tech.role} · {tech.years} yrs
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-paper/85">{tech.note}</p>
            </div>
          </div>
          <div className="border-t border-white/10 px-6 py-5 text-sm text-fog sm:px-8">
            <p>
              <strong className="text-paper">What happens next:</strong> a text to {form.phone} confirming this window,
              then another when {tech.name.split(" ")[0]} is 30 minutes out. The ${site.dispatchFee} service call is
              credited to the repair.
            </p>
          </div>
        </div>
        <p className="t-data mt-4 text-center text-slate">
          Demo only. Headgate is a concept company and nothing was sent.
        </p>
        <button
          type="button"
          className="link mx-auto mt-4 block"
          onClick={() => {
            setRef(null);
            setSlot(null);
          }}
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
      <div className="grid gap-12">
        {/* 1. Need */}
        <fieldset>
          <legend className="font-display text-2xl font-bold">1. What&apos;s going on?</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {symptoms.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={need === s.id}
                onClick={() => setNeed(s.id)}
                className="chip"
              >
                {s.label}
              </button>
            ))}
            {extraNeeds.map((n) => (
              <button key={n.id} type="button" aria-pressed={need === n.id} onClick={() => setNeed(n.id)} className="chip">
                {n.label}
              </button>
            ))}
          </div>
          {emergency ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-alert p-4 text-white">
              <p className="font-bold">
                {need === "gas"
                  ? `Smell gas? Leave the house and call Xcel Energy at ${site.xcelGasEmergency} first.`
                  : "This one shouldn't wait for a window. Call us now."}
              </p>
              <a
                href={need === "gas" ? site.xcelGasEmergencyHref : site.phoneHref}
                className="btn min-h-10 bg-white text-alert hover:bg-alert-soft"
              >
                <Icon name="phone" className="h-4 w-4" />
                {need === "gas" ? site.xcelGasEmergency : site.phone}
              </a>
            </div>
          ) : null}
          <div className="mt-6 inline-flex rounded-xl border border-line bg-paper p-1" role="group" aria-label="Property type">
            {(["home", "business"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
                className="rounded-lg px-4 py-2 font-bold aria-pressed:bg-ink aria-pressed:text-paper"
              >
                {k === "home" ? "Home" : "Business / property"}
              </button>
            ))}
          </div>
        </fieldset>

        {/* 2. Window */}
        <fieldset>
          <legend className="font-display text-2xl font-bold">2. Pick a two-hour window</legend>
          <p className="mt-1 text-slate">Mon–Sat. Crossed-out windows are already booked.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {days.length === 0 &&
              Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-paper" />)}
            {days.map((d) => (
              <div key={`${d.m}-${d.d}`} className="rounded-2xl border border-line bg-paper p-2">
                <p className="px-2 pt-1 font-bold">{dayLabel(d, now ?? undefined)}</p>
                <p className="t-data px-2 text-slate">{shortDate(d)}</p>
                <div className="mt-2 grid gap-1.5">
                  {d.slots.map((s) => {
                    const disabled = s.taken || s.past;
                    const chosen = slot?.key === s.key;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        disabled={disabled}
                        aria-pressed={chosen}
                        aria-label={`${dayLabel(d, now ?? undefined)} ${windowLabel(s.start)}${s.taken ? ", booked" : s.past ? ", unavailable" : ""}`}
                        onClick={() => setSlot(s)}
                        className={`min-h-11 rounded-lg px-2 text-sm font-bold tabular transition-colors ${
                          chosen
                            ? "bg-hivis text-ink ring-2 ring-ink"
                            : disabled
                              ? "cursor-not-allowed text-slate/50 line-through"
                              : "bg-chalk hover:bg-mint-soft"
                        }`}
                      >
                        {windowLabel(s.start)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* 3. Contact */}
        <fieldset>
          <legend className="font-display text-2xl font-bold">3. Where and who</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="font-bold">Name</span>
              <input className="field" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="grid gap-1.5">
              <span className="font-bold">Mobile (for arrival texts)</span>
              <input
                className="field"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="font-bold">Service address</span>
              <input
                className="field"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="font-bold">
                Anything we should know? <span className="font-normal text-slate">(optional)</span>
              </span>
              <textarea
                className="field min-h-28"
                placeholder="Gate code, where the water heater is, a dog that loves plumbers…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
          </div>
        </fieldset>
      </div>

      {/* The ticket */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <span className="tab">Service ticket</span>
        <div className="panel tabbed p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl font-bold">{site.shortName} dispatch</p>
            <span className="t-data text-slate">{kind === "home" ? "Residential" : "Commercial"}</span>
          </div>
          <div className="mt-3">
            <Line k="Job" v={needLabel(need)} />
            <Line k="Day" v={slot ? `${dayLabel(slot.date, now ?? undefined)}, ${shortDate(slot.date)}` : ""} />
            <Line k="Window" v={slot ? windowLabel(slot.start) : ""} />
            <Line k="Name" v={form.name} />
            <Line k="Address" v={form.address} />
            <Line k="Service call" v={`$${site.dispatchFee}, credited to repair`} />
          </div>
          {errors.length ? (
            <ul className="mt-4 grid gap-1 rounded-xl bg-alert-soft p-3 text-sm font-bold text-alert" role="alert">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          ) : null}
          <button type="submit" className="btn btn-go mt-5 w-full">
            Put me on the board
          </button>
          <p className="mt-3 text-center text-xs text-slate">Demo form. Nothing is sent.</p>
        </div>
      </div>
    </form>
  );
}
