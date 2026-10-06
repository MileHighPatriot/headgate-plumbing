import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PriceBook from "@/components/tools/PriceBook";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Price book: typical Denver plumbing prices",
  description:
    "Typical price ranges for drain cleaning, sewer repair, water heaters, repiping, gas lines and commercial backflow testing in the Denver metro.",
};

const rules = [
  ["The range is the range.", "Your exact price is confirmed on site, in writing, before any work starts. No surprise line items."],
  [`$${site.dispatchFee} to come out.`, "Credited to the repair if you go ahead. Waived for Care Plan members."],
  ["Nights and Sundays cost more.", `A flat $${site.afterHoursFee} after-hours fee, told to you on the phone before we roll.`],
  ["Permits are included.", "When a job needs a permit (water heaters, gas lines, sewer repairs), it's in the price."],
];

export default function PricingPage() {
  return (
    <>
      <PageHead
        label="Price book"
        title="What things usually cost."
        lede="Typical ranges for the jobs we do most across the Denver metro. The big swings come from access (a crawlspace, a finished ceiling, a sewer under the driveway), and we'll tell you which end you're on before we start."
        aside={
          <ul className="grid gap-4">
            {rules.map(([a, b]) => (
              <li key={a} className="border-l-2 border-patina pl-4">
                <p className="font-bold">{a}</p>
                <p className="text-sm text-slate">{b}</p>
              </li>
            ))}
          </ul>
        }
      />
      <section className="pb-16 pt-2 md:pb-24">
        <div className="wrap">
          <PriceBook />
          <p className="t-data mt-8 text-slate">
            Sample pricing for a concept company, set against published Denver-area averages. Not a quote.
          </p>
        </div>
      </section>
    </>
  );
}
