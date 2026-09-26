"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import PriceRows from "@/components/PriceRows";
import { serviceBySlug } from "@/data/services";
import { site } from "@/data/site";
import { symptomById, symptoms, urgencyCopy } from "@/data/symptoms";

export default function Triage() {
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Deep links from the homepage: /help/#no-hot
  useEffect(() => {
    const read = () => {
      const id = window.location.hash.slice(1);
      if (symptomById[id]) {
        setSymptomId(id);
        setPath([symptomById[id].start]);
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const choose = (id: string) => {
    setSymptomId(id);
    setPath([symptomById[id].start]);
    history.replaceState(null, "", `#${id}`);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const symptom = symptomId ? symptomById[symptomId] : null;
  const step = path[path.length - 1];
  const outcome = symptom && step?.startsWith("out:") ? symptom.outcomes[step.slice(4)] : null;
  const question = symptom && step && !step.startsWith("out:") ? symptom.questions[step] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-10">
      <div>
        <p id="symptom-heading" className="font-display text-xl font-bold">
          1. What are you seeing?
        </p>
        <div role="radiogroup" aria-labelledby="symptom-heading" className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {symptoms.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={symptomId === s.id}
              onClick={() => choose(s.id)}
              className="chip w-full justify-between text-left"
            >
              <span>
                <span className="block">{s.label}</span>
                <span className="block text-xs font-normal opacity-70">{s.hint}</span>
              </span>
              {s.id === "gas" ? (
                <Icon name="alert" className="h-5 w-5 shrink-0 text-alert" />
              ) : (
                <Icon name="arrow" className="h-4 w-4 shrink-0 opacity-50" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div ref={panelRef} className="scroll-mt-32" aria-live="polite">
        {!symptom && (
          <div className="flex h-full min-h-80 flex-col items-start justify-center rounded-[var(--radius-fit)] border-2 border-dashed border-line p-8">
            <Icon name="drop" className="h-8 w-8 text-patina" />
            <p className="mt-4 font-display text-2xl font-bold">Pick a symptom to start.</p>
            <p className="mt-2 max-w-md text-slate">
              If water is pouring out right now, don&apos;t wait on this page — shut off your main valve and call{" "}
              <a href={site.phoneHref} className="link">
                {site.phone}
              </a>
              .
            </p>
          </div>
        )}

        {symptom && question && (
          <div key={step} className="panel rise p-6 sm:p-8">
            <p className="t-data text-patina-deep">{symptom.label}</p>
            <p className="mt-3 font-display text-2xl font-bold sm:text-3xl">2. {question.q}</p>
            <div className="mt-6 grid gap-2">
              {question.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setPath((p) => [...p, o.to])}
                  className="chip w-full justify-between py-3 text-left text-base"
                >
                  {o.label}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-patina" />
                </button>
              ))}
            </div>
            {path.length > 1 && (
              <button type="button" onClick={() => setPath((p) => p.slice(0, -1))} className="link mt-6 text-sm">
                Back
              </button>
            )}
          </div>
        )}

        {symptom && outcome && (
          <div key={step} className="rise overflow-hidden rounded-[var(--radius-fit)] border border-line bg-paper">
            <div
              className={`p-6 sm:p-8 ${outcome.urgency === "now" ? "bg-alert text-white" : outcome.urgency === "today" ? "bg-ink text-paper on-ink" : "bg-mint-soft"}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`urgency ${outcome.urgency === "now" ? "bg-white text-alert" : `urgency-${outcome.urgency}`}`}
                >
                  Urgency: {urgencyCopy[outcome.urgency].label}
                </span>
                <span className="t-data opacity-80">{symptom.label}</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">{outcome.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {outcome.callFirst === "xcel" ? (
                  <>
                    <a href={site.xcelGasEmergencyHref} className="btn bg-white text-alert hover:bg-alert-soft">
                      <Icon name="phone" className="h-4 w-4" /> Xcel gas emergency {site.xcelGasEmergency}
                    </a>
                    <a href={site.phoneHref} className="btn btn-line">
                      Then call us: {site.phone}
                    </a>
                  </>
                ) : outcome.urgency === "now" ? (
                  <a href={site.phoneHref} className="btn bg-white text-alert hover:bg-alert-soft">
                    <Icon name="phone" className="h-4 w-4" /> Call {site.phone} now
                  </a>
                ) : (
                  <>
                    <Link href={`/book/?need=${symptom.id}`} className="btn btn-go">
                      Book an arrival window
                    </Link>
                    <a href={site.phoneHref} className="btn btn-line">
                      <Icon name="phone" className="h-4 w-4" /> {site.phone}
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.1fr_1fr]">
              <div>
                <h3 className="font-display text-xl font-bold">Do this in the next five minutes</h3>
                <ol className="mt-4 grid gap-3">
                  {outcome.steps.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink font-mono text-sm font-bold text-hivis">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 rounded-xl bg-chalk p-4 text-slate">
                  <strong className="text-ink">Why: </strong>
                  {outcome.why}
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">What it usually costs</h3>
                <div className="mt-2">
                  <PriceRows ids={outcome.prices} />
                </div>
                <Link href={`/services/${outcome.service}/`} className="link mt-5 inline-flex items-center gap-1.5">
                  More about {serviceBySlug[outcome.service].name.toLowerCase()}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-line px-6 py-4 text-sm sm:px-8">
              {path.length > 1 && (
                <button type="button" onClick={() => setPath((p) => p.slice(0, -1))} className="link">
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSymptomId(null);
                  setPath([]);
                  history.replaceState(null, "", location.pathname);
                }}
                className="link"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
