"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import { heroSymptoms, symptomById } from "@/data/symptoms";
import { FREEZE_F, useForecast } from "@/lib/useForecast";
import { useNow } from "@/lib/useNow";
import { dayLabel, denverNow, hourLabel, isOfficeOpen, nextOpenSlot, windowLabel } from "@/lib/schedule";

function Row({ k, children, href }: { k: string; children: React.ReactNode; href?: string }) {
  const body = (
    <>
      <span className="t-data shrink-0 text-fog">{k}</span>
      <span className="flex items-center gap-2 text-right font-bold">{children}</span>
    </>
  );
  return href ? (
    <Link
      href={href}
      className="group flex min-h-12 items-center justify-between gap-4 border-t border-white/10 py-2.5 hover:text-hivis"
    >
      {body}
    </Link>
  ) : (
    <div className="flex min-h-12 items-center justify-between gap-4 border-t border-white/10 py-2.5">{body}</div>
  );
}

export default function DispatchBoard() {
  const now = useNow(30000);
  const forecast = useForecast();

  const clock = now
    ? (() => {
        const t = denverNow(now);
        return `${hourLabel(t.hour).replace(/(am|pm)/, "")}:${String(t.minute).padStart(2, "0")}${t.hour >= 12 ? "pm" : "am"}`;
      })()
    : "--:--";
  const slot = now ? nextOpenSlot(now) : null;
  const open = now ? isOfficeOpen(now) : true;
  const low = forecast.status === "ok" ? forecast.days[0].low : null;
  const freeze = low !== null && low <= FREEZE_F;

  return (
    <div className="on-ink panel-ink tabbed relative shadow-[0_30px_60px_-30px_rgb(11_42_42/0.6)]">
      <div className="absolute -top-[2.05rem] left-0">
        <span className="tab">Dispatch board</span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-hivis animate-tick" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-hivis" />
            </span>
            <span className="whitespace-nowrap">Live from the shop</span>
          </p>
          <p className="t-data whitespace-nowrap tabular text-mint" suppressHydrationWarning>
            Denver {clock}
          </p>
        </div>

        <div className="mt-4">
          <Row k="Next open arrival" href="/book/">
            {slot ? (
              <>
                {dayLabel(slot.date, now ?? undefined)}, {windowLabel(slot.start)}
              </>
            ) : (
              <span className="text-fog">Checking…</span>
            )}
            <Icon name="arrow" className="h-4 w-4 text-mint transition-transform group-hover:translate-x-0.5" />
          </Row>
          <Row k="Emergency line">
            <a href={site.phoneHref} className="hover:text-hivis">
              A person answers, 24/7
            </a>
          </Row>
          <Row k={open ? "Crews in the field" : "On call tonight"}>
            {open ? "7 trucks" : "2 plumbers"}
          </Row>
          <Row k="Tonight's low" href="/tools/freeze-watch/">
            {forecast.status === "loading" && <span className="text-fog">Loading…</span>}
            {forecast.status === "error" && <span className="text-fog">See Freeze Watch</span>}
            {low !== null && (
              <>
                <span className="tabular">{low}°F</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs ${freeze ? "bg-hivis text-ink" : "bg-white/10 text-mint"}`}
                >
                  {freeze ? "Freeze Watch on" : "No freeze risk"}
                </span>
              </>
            )}
          </Row>
        </div>

        <div className="mt-5 rounded-2xl bg-ink-2 p-4">
          <p className="font-bold">What&apos;s going on?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heroSymptoms.map((id) => {
              const s = symptomById[id];
              return (
                <Link
                  key={id}
                  href={`/help/#${id}`}
                  className={`chip min-h-10 text-sm ${id === "gas" ? "!border-alert/70" : ""}`}
                >
                  {id === "gas" ? <Icon name="alert" className="h-4 w-4 text-[#ff8a8c]" /> : null}
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
