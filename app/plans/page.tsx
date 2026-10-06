import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import PlanCalc from "@/components/tools/PlanCalc";
import { plan } from "@/data/plan";

export const metadata: Metadata = {
  title: "Headgate Care Plan",
  description:
    "A $16/month plumbing plan for Denver homes: yearly water heater flush and check-up, 15% off repairs, and no service-call or after-hours fees. With the math shown.",
};

export default function PlansPage() {
  return (
    <>
      <PageHead
        label="Care Plan"
        title="A plan, with the math shown."
        lede="Most membership plans are sold on feelings. Ours comes with a calculator, and if it doesn't save you money, it'll say so."
        aside={
          <div className="on-ink panel-ink p-6 sm:p-8">
            <p className="t-data text-mint">{plan.name}</p>
            <p className="mt-2 font-display text-6xl font-extrabold">
              ${plan.monthly}
              <span className="text-2xl text-fog">/mo</span>
            </p>
            <p className="text-fog">or ${plan.yearly} a year. Cancel any time.</p>
            <Link href="/book/?need=inspect" className="btn btn-go mt-6 w-full">
              Start with a check-up
            </Link>
          </div>
        }
      />
      <section className="py-16 md:py-20">
        <div className="wrap">
          <h2 className="t-h2">What&apos;s included</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {plan.includes.map((i) => (
              <li key={i.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hivis text-ink">
                  <Icon name="check" className="h-5 w-5" strokeWidth={3} />
                </span>
                <span>
                  <span className="block font-bold">{i.title}</span>
                  <span className="mt-1 block text-slate">{i.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-line bg-paper py-16 md:py-20">
        <div className="wrap">
          <span className="label">Is it worth it for you?</span>
          <h2 className="t-h2 mt-4 max-w-[18ch]">Check the boxes. We&apos;ll do the math.</h2>
          <div className="mt-10">
            <PlanCalc />
          </div>
          <p className="mt-6 text-sm text-slate">
            Commercial buildings get a Building Account instead:{" "}
            <Link href="/commercial/" className="link">
              see commercial
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
