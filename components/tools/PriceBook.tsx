"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { priceCategories, priceItems, priceRange, type PriceCategory } from "@/data/pricing";

export default function PriceBook() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PriceCategory | "All">("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return priceItems.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!query || p.name.toLowerCase().includes(query) || p.note.toLowerCase().includes(query)),
    );
  }, [q, cat]);

  const groups = priceCategories
    .map((c) => ({ c, items: filtered.filter((p) => p.category === c) }))
    .filter((g) => g.items.length);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 border-b border-line bg-chalk/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-72 lg:shrink-0">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <label htmlFor="price-search" className="sr-only">
              Search prices
            </label>
            <input
              id="price-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: toilet, jetting, tankless…"
              className="field pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0" role="group" aria-label="Filter by category">
            {(["All", ...priceCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className="chip min-h-10 shrink-0 text-sm"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} prices shown
      </p>

      {groups.length === 0 && (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-line p-8 text-center">
          <p className="font-bold">Nothing matches “{q}”.</p>
          <p className="mt-1 text-slate">Call or text us. If we do it, we&apos;ll give you a range on the phone.</p>
        </div>
      )}

      <div className="mt-8 grid gap-10">
        {groups.map(({ c, items }) => (
          <section key={c} aria-labelledby={`cat-${c}`}>
            <span className="tab" id={`cat-${c}`}>
              {c}
            </span>
            <div className="panel tabbed overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">{c} price ranges</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Job</th>
                    <th scope="col">Typical range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((p) => (
                    <tr key={p.id} className="align-top">
                      <th scope="row" className="p-5 font-normal sm:px-6">
                        <span className="flex flex-wrap items-center gap-2 font-bold">
                          {p.name}
                          {p.commercial ? (
                            <span className="rounded-md bg-ink px-1.5 py-0.5 font-mono text-[0.7rem] text-mint">
                              Commercial
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1 block text-sm text-slate">{p.note}</span>
                      </th>
                      <td className="whitespace-nowrap p-5 text-right font-display text-xl font-bold text-patina-deep tabular sm:px-6">
                        {priceRange(p)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
