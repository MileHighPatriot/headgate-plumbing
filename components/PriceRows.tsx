import Link from "next/link";
import { priceById, priceRange } from "@/data/pricing";

/** Compact list of price ranges, used on service pages and triage results. */
export default function PriceRows({ ids, tone = "paper" }: { ids: string[]; tone?: "paper" | "ink" }) {
  const items = ids.map((id) => priceById[id]).filter(Boolean);
  if (!items.length) return null;
  return (
    <div>
      <ul className={`divide-y ${tone === "ink" ? "divide-white/10" : "divide-line"}`}>
        {items.map((p) => (
          <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
            <span className="font-bold">{p.name}</span>
            <span className={`tabular font-display text-lg font-bold ${tone === "ink" ? "text-hivis" : "text-patina-deep"}`}>
              {priceRange(p)}
            </span>
          </li>
        ))}
      </ul>
      <p className={`t-data mt-3 ${tone === "ink" ? "text-fog" : "text-slate"}`}>
        Typical ranges. Your price is confirmed on site before work starts.{" "}
        <Link href="/pricing/" className="link">
          Full price book
        </Link>
      </p>
    </div>
  );
}
