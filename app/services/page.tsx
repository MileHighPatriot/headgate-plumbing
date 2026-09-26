import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import PageHead from "@/components/PageHead";
import TriageAside from "@/components/TriageAside";
import { priceById } from "@/data/pricing";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Plumbing services",
  description:
    "Drain and sewer, water heaters, water lines and repiping, leaks and fixtures, gas lines, and 24/7 emergency plumbing across the Denver metro.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        label="Services"
        title="Everything between the street and the faucet."
        lede="Residential and commercial plumbing across the Denver metro. Every service page lists typical prices and the Colorado-specific things worth knowing."
        aside={<TriageAside />}
      />
      <section className="py-12 md:py-16">
        <div className="wrap grid gap-5">
          {services.map((s, i) => {
            const from = Math.min(...s.prices.map((id) => priceById[id].low));
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                className="panel group grid overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(11_42_42/0.45)] md:grid-cols-[18rem_1fr_auto]"
              >
                <div className="aspect-[16/9] overflow-hidden md:aspect-auto">
                  <Photo name={s.photo} alt="" sizes="(min-width: 768px) 288px, 100vw" priority={i < 2} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 md:py-8">
                  <h2 className="t-h3">{s.name}</h2>
                  <p className="mt-2 max-w-2xl text-slate">{s.lede}</p>
                </div>
                <div className="flex items-center justify-between gap-6 border-t border-line px-6 py-4 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:px-8">
                  <span>
                    <span className="t-data block text-slate">From</span>
                    <span className="font-display text-2xl font-bold text-patina-deep">${from.toLocaleString()}</span>
                  </span>
                  <Icon name="arrow" className="h-6 w-6 text-patina transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
