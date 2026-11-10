import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import DispatchBoard from "@/components/DispatchBoard";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import ToolCards from "@/components/ToolCards";
import WaterStory from "@/components/WaterStory";
import AreaChecker from "@/components/tools/AreaChecker";
import { areas } from "@/data/areas";
import { priceById, priceRange } from "@/data/pricing";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { symptoms, urgencyCopy } from "@/data/symptoms";
import { reviews } from "@/data/team";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const teaserPrices = ["clog-fixture", "main-cable", "camera", "wh-tank", "prv", "backflow-test"];

const teaserMax = Math.max(...teaserPrices.map((id) => priceById[id].high ?? priceById[id].low));

const promises = [
  {
    icon: "shield",
    title: "Locally owned. Not private equity.",
    body: "Headgate is owned by the master plumber who started it. No call-center quotas from out of state.",
  },
  {
    icon: "wrench",
    title: "Plumbers who aren't on commission",
    body: "Our plumbers are paid hourly. They don't earn more by selling you a water heater you don't need.",
  },
  {
    icon: "clock",
    title: "Two-hour arrival windows",
    body: "Not “sometime between 8 and 5.” We text when your plumber is 30 minutes out, with their name.",
  },
  {
    icon: "check",
    title: `${site.warrantyYears}-year labor warranty`,
    body: "If our work fails, we come back and fix it at no charge. In writing, on every invoice.",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero: headline + dispatch board, on ink */}
      <section className="hero-ink on-ink relative isolate overflow-hidden text-paper">
        <div className="wrap grid grid-cols-1 gap-10 pt-10 pb-12 md:pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-12 lg:pb-16">
          <div className="flex min-w-0 flex-col justify-center">
            <span className="label rise self-start">Denver metro plumbing · locally owned</span>
            <h1 className="t-hero mt-6">
              <span className="line-mask">
                <span className="line-rise">Water where</span>
              </span>
              <span className="line-mask">
                <span className="line-rise" style={{ "--d": "110ms" } as CSSProperties}>
                  it{" "}
                  <span className="waterline">
                    belongs.
                    <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                      <path pathLength={100} d="M3 7c16-7 32-7 48 0s32 7 48 0 32-7 48 0 32 7 50 0" />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>
            <p className="t-lede mt-7 max-w-xl text-fog rise-3">
              Plumbing and drain service for homes and commercial buildings. Real price ranges before we come out,
              two-hour arrival windows, and a person on the emergency line at 3am.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 rise-3">
              <Link href="/book/" className="btn btn-go">
                Book an arrival window
              </Link>
              <a href={site.phoneHref} className="btn btn-line">
                <Icon name="phone" className="h-4 w-4" />
                Call {site.phone}
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            {/* Supply pipe: down the right edge, behind the board, then left and down to the manifold. */}
            <div aria-hidden="true" className="hidden lg:block">
              <span className="pipe pipe-v right-[2%] -top-24 bottom-[38%] w-3.5" />
              <span className="pipe pipe-h right-[2%] bottom-[14%] left-[5%] h-3.5" />
              <span className="pipe pipe-v bottom-[-6rem] left-[5%] top-[86%] w-3.5" />
              <span className="fitting bottom-[calc(14%-5px)] left-[calc(5%-5px)] h-6 w-6" />
            </div>
            <div className="hero-photo-drift">
              <div className="fitting-photo photo-in aspect-[16/11] w-full bg-ink-2 lg:aspect-[16/9] lg:w-[90%]">
                <Photo
                  name="tech-pump"
                  alt="A plumber in a hi-vis shirt working on large valves and piping in a pump room"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>
            </div>
            <div className="board-in relative -mt-14 ml-auto w-[94%] sm:-mt-24 lg:w-[80%]">
              <DispatchBoard />
            </div>
          </div>
        </div>

        <div className="wrap pb-12 lg:pb-16">
          <ul className="manifold">
            <li aria-hidden="true" className="manifold-fill !border-0 !p-0" />
            {[
              ["2", "hr", "Arrival windows", "With a text when your plumber is 30 minutes out"],
              ["24", "/7", "A person answers", "The emergency line never goes to voicemail"],
              [String(site.warrantyYears), "yr", "Labor warranty", "In writing, on every invoice"],
              [`$${site.dispatchFee}`, "", "To come out", "Credited to the repair if you go ahead"],
            ].map(([n, unit, a, b]) => (
              <li key={a}>
                <b>
                  {n}
                  {unit ? <small>{unit}</small> : null}
                </b>
                <p className="mt-2 font-bold">{a}</p>
                <p className="text-sm text-fog">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Sort by symptom */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <span className="label">Start with what you&apos;re seeing</span>
              <h2 className="t-h2 wipe mt-4 max-w-[14ch]">Not sure what it&apos;s called? Start here.</h2>
            </div>
            <p className="t-lede text-slate lg:pb-1">
              Pick the symptom. We&apos;ll ask a question or two, tell you how urgent it is, and walk you through what
              to do in the next five minutes, before you pay anyone anything.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {symptoms.map((s) => {
              const urgencies = Array.from(new Set(Object.values(s.outcomes).map((o) => o.urgency)));
              return (
                <li key={s.id} className="reveal">
                  <Link
                    href={`/help/#${s.id}`}
                    className="lift group flex h-full flex-col justify-between gap-4 rounded-2xl border border-line bg-paper p-4 hover:border-patina sm:gap-6 sm:p-5"
                  >
                    <div>
                      <p className="font-display text-lg leading-tight font-bold sm:text-xl">{s.label}</p>
                      <p className="mt-1 text-sm text-slate max-sm:hidden">{s.hint}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex flex-wrap gap-1.5">
                        {urgencies.map((u) => (
                          <span key={u} className={`urgency urgency-${u} !px-2 !py-0.5 !text-xs`}>
                            {urgencyCopy[u].label}
                          </span>
                        ))}
                      </span>
                      <Icon name="arrow" className="h-5 w-5 text-patina transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <WaterStory />

      {/* 3. Services */}
      <section className="border-y border-line bg-paper py-16 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="label">What we do</span>
              <h2 className="t-h2 wipe mt-4">Homes and commercial buildings.</h2>
            </div>
            <Link href="/services/" className="btn btn-line">
              All services <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="snap-row mt-12 gap-x-5 gap-y-12 md:grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const from = Math.min(...s.prices.map((id) => priceById[id].low));
              return (
                <li key={s.slug} className="reveal">
                  <span className="tab tab-paper">From ${from.toLocaleString()}</span>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="panel tabbed lift group block overflow-hidden"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-ink/5">
                      <Photo
                        name={s.photo}
                        alt=""
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="t-h3 flex items-center justify-between gap-3">
                        {s.name}
                        <Icon name="arrow" className="h-5 w-5 shrink-0 text-patina transition-transform group-hover:translate-x-1" />
                      </h3>
                      <p className="mt-2 text-slate">{s.short}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Price book teaser */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="on-ink panel-ink hero-ink reveal relative isolate grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:p-14">
            <div className="pipe-run">
              <span className="label">Price book</span>
              <h2 className="t-h2 mt-4 max-w-[12ch]">Prices before we come out.</h2>
              <p className="mt-5 max-w-md text-fog">
                Most plumbers won&apos;t put a number on their website. We publish typical ranges for our most common
                jobs, and confirm your exact price on site before any work starts.
              </p>
              <Link href="/pricing/" className="btn btn-go mt-8">
                See the full price book
              </Link>
            </div>
            <ul className="divide-y divide-white/10 self-center">
              {teaserPrices.map((id) => {
                const p = priceById[id];
                return (
                  <li key={id} className="py-4">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span>
                        <span className="font-bold">{p.name}</span>
                        <span className="t-data ml-2 text-fog">{p.category}</span>
                      </span>
                      <span className="tabular font-display text-xl font-bold text-hivis">{priceRange(p)}</span>
                    </span>
                    <span aria-hidden="true" className="price-bar mt-3">
                      <i style={{ width: `${Math.round(22 + (Math.log(p.high ?? p.low) / Math.log(teaserMax)) ** 3 * 78)}%` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Tools */}
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <span className="label">Know your system</span>
              <h2 className="t-h2 wipe mt-4 max-w-[15ch]">Tools we wish every homeowner had.</h2>
            </div>
            <p className="t-lede text-slate lg:pb-1">
              Free, no sign-up, built on Denver Water&apos;s own rules and the manufacturers&apos; own serial codes.
            </p>
          </div>
          <div className="mt-10">
            <ToolCards />
          </div>
        </div>
      </section>

      {/* 6. Why Headgate */}
      <section className="border-y border-line bg-paper py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="label">Why Headgate</span>
            <h2 className="t-h2 wipe mt-4 max-w-[13ch]">The boring promises that matter at 3am.</h2>
            <div className="mt-8 rounded-2xl border border-line bg-chalk p-5">
              <p className="t-data text-patina-deep">Licensed in Colorado</p>
              <ul className="mt-3 grid gap-2">
                {site.licenses.map((l) => (
                  <li key={l.label} className="flex flex-wrap justify-between gap-x-4 text-sm">
                    <span className="text-slate">{l.label}</span>
                    <span className="t-data font-bold">{l.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p.title} className="reveal">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft text-patina-deep">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="t-h3 mt-4">{p.title}</h3>
                <p className="mt-2 text-slate">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="wrap mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-bold">From the invoice file</h3>
            <p className="t-data text-slate">Illustrative reviews. Headgate is a concept company.</p>
          </div>
          <ul className="snap-row mt-6 gap-5 md:grid md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.who} className="reveal flex flex-col rounded-2xl bg-chalk p-6">
                <p className="t-data text-patina-deep">{r.job}</p>
                <blockquote className="mt-3 flex-1 text-[1.05rem]">“{r.quote}”</blockquote>
                <p className="mt-5 text-sm font-bold text-slate">{r.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Service area + booking */}
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div className="panel reveal p-6 sm:p-10">
            <span className="label">Service area</span>
            <h2 className="t-h2 mt-4">Are we in your neighborhood?</h2>
            <p className="mt-4 text-slate">Same-day windows across Denver and the inner suburbs.</p>
            <div className="mt-6">
              <AreaChecker />
            </div>
            <p className="mt-2 text-sm text-slate">
              {areas.slice(0, 10).map((a) => a.city).join(" · ")} ·{" "}
              <Link href="/service-area/" className="link">
                and {areas.length - 10} more
              </Link>
            </p>
          </div>
          <div className="on-ink panel-ink hero-ink reveal relative isolate flex flex-col justify-between gap-10 overflow-hidden p-6 sm:p-10">
            <div>
              <span className="label">Book it</span>
              <h2 className="t-h2 mt-4 max-w-[12ch]">Pick a two-hour window.</h2>
              <p className="mt-4 max-w-md text-fog">
                Choose what&apos;s wrong and when works. You&apos;ll get a service ticket with your plumber&apos;s name
                and a text when they&apos;re 30 minutes out.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/book/" className="btn btn-go">
                Book an arrival window
              </Link>
              <a href={site.phoneHref} className="btn btn-line">
                <Icon name="phone" className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
