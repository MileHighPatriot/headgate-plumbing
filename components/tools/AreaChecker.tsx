"use client";

import Link from "next/link";
import { useId, useState } from "react";
import Icon from "@/components/Icon";
import { areas, zoneCopy } from "@/data/areas";
import { site } from "@/data/site";

type Result =
  | { kind: "yes"; city: string; zone: "core" | "edge" }
  | { kind: "no"; query: string }
  | { kind: "invalid" };

function check(q: string): Result {
  const query = q.trim().toLowerCase();
  if (!query) return { kind: "invalid" };
  if (/^\d{5}$/.test(query)) {
    const hit = areas.find((a) => a.zips.includes(query));
    return hit ? { kind: "yes", city: hit.city, zone: hit.zone } : { kind: "no", query };
  }
  if (/^\d+$/.test(query)) return { kind: "invalid" };
  const hit = areas.find((a) => a.city.toLowerCase() === query || a.city.toLowerCase().startsWith(query));
  return hit ? { kind: "yes", city: hit.city, zone: hit.zone } : { kind: "no", query: q.trim() };
}

export default function AreaChecker({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const id = useId();
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(check(q));
        }}
        className="flex gap-2"
      >
        <label htmlFor={id} className="sr-only">
          ZIP code or city
        </label>
        <input
          id={id}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ZIP code or city"
          autoComplete="postal-code"
          className="field"
        />
        <button type="submit" className={`btn shrink-0 ${tone === "ink" ? "btn-go" : "btn-ink"}`}>
          Check
        </button>
      </form>

      <div aria-live="polite" className="min-h-[5.5rem]">
        {result?.kind === "yes" && (
          <div className="mt-4 flex gap-3 rounded-2xl bg-mint-soft p-4 text-ink">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-patina-deep" strokeWidth={3} />
            <div>
              <p className="font-bold">Yes, we cover {result.city}.</p>
              <p className="text-sm text-slate">{zoneCopy[result.zone]}</p>
              <Link href="/book/" className="link mt-1 inline-block text-sm">
                Pick an arrival window
              </Link>
            </div>
          </div>
        )}
        {result?.kind === "no" && (
          <div className="mt-4 flex gap-3 rounded-2xl bg-amber-note p-4 text-ink">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">“{result.query}” is outside our regular area.</p>
              <p className="text-sm text-slate">
                Commercial accounts and emergencies sometimes make sense farther out, so{" "}
                <a href={site.phoneHref} className="link">
                  call and ask
                </a>
                .
              </p>
            </div>
          </div>
        )}
        {result?.kind === "invalid" && (
          <p className="mt-4 text-sm font-bold text-alert">Enter a 5-digit ZIP code or a city name.</p>
        )}
      </div>
    </div>
  );
}
