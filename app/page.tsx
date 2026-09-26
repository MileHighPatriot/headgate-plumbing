import Link from "next/link";
import DispatchBoard from "@/components/DispatchBoard";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import ToolCards from "@/components/ToolCards";
import AreaChecker from "@/components/tools/AreaChecker";
import { areas } from "@/data/areas";
import { priceById, priceRange } from "@/data/pricing";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { symptoms, urgencyCopy } from "@/data/symptoms";
import { reviews } from "@/data/team";

const teaserPrices = ["clog-fixture", "main-cable", "camera", "wh-tank", "prv", "backflow-test"];

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
      {/* 1 — Hero: headline + dispatch board */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="label rise self-start">Denver metro plumbing · since {site.founded}</span>
            <h1 className="t-hero mt-6 rise-2">
              Water where it <span className="text-patina">belongs.</span>
            </h1>
            <p className="t-lede mt-6 max-w-xl text-slate rise-3">
              Plumbing and drain service for homes and commercial buildings. Real price ranges before we come out,
              two-hour arrival windows, and a person on the emergency line at 3am.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 rise-3">
              <a href={site.phoneHref} className="btn btn-ink">
                <Icon name="phone" className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link href="/book/" className="btn btn-go">
                Book an arrival window
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-3 rise-3">
              {[
                ["Licensed master plumber", "PC & MP registered"],
                [`${site.warrantyYears}-year labor warranty`, "On every job"],
                ["Upfront price ranges", "Published, not hidden"],
              ].map(([a, b]) => (
                <li key={a} className="border-l-2 border-patina pl-3">
                  <p className="font-bold">{a}</p>
                  <p className="text-slate">{b}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="fitting-photo aspect-[16/11] w-full bg-ink/10 lg:w-[92%]">
              <Photo
                name="tech-pump"
                alt="A plumber in a hi-vis shirt working on large valves and piping in a pump room"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
            <div className="relative -mt-16 ml-auto w-[94%] sm:-mt-24 lg:w-[80%]">
              <DispatchBoard />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Sort by symptom */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <span className="label">Start with what you&apos;re seeing</span>
              <h2 className="t-h2 mt-4 max-w-[14ch]">Not sure what it&apos;s called? Start here.</h2>
            </div>
            <p className="t-lede text-slate lg:pb-1">
              Pick the symptom. We&apos;ll ask a question or two, tell you how urgent it is, and walk you through what
              to do in the next five minutes — before you pay anyone anything.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {symptoms.map((s) => {
              const urgencies = Array.from(new Set(Object.values(s.outcomes).map((o) => o.urgency)));
              return (
                <li key={s.id}>
                  <Link
                    href={`/help/#${s.id}`}
                    className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-patina"
                  >
                    <div>
                      <p className="font-display text-xl font-bold">{s.label}</p>
                      <p className="mt-1 text-sm text-slate">{s.hint}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1.5">
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

      {/* 3 — Services */}
      <section className="border-y border-line bg-paper py-16 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="label">What we do</span>
              <h2 className="t-h2 mt-4">Homes and commercial buildings.</h2>
            </div>
            <Link href="/services/" className="btn btn-line">
              All services <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const from = Math.min(...s.prices.map((id) => priceById[id].low));
              return (
                <li key={s.slug}>
                  <span className="tab tab-paper">From ${from.toLocaleString()}</span>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="panel tabbed group block overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(11_42_42/0.45)]"
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

      {/* 4 — Price book teaser */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="on-ink panel-ink grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:p-14">
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
                  <li key={id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <span>
                      <span className="font-bold">{p.name}</span>
                      <span className="t-data ml-2 text-fog">{p.category}</span>
                    </span>
                    <span className="tabular font-display text-xl font-bold text-hivis">{priceRange(p)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — Tools */}
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <span className="label">Know your system</span>
              <h2 className="t-h2 mt-4 max-w-[15ch]">Tools we wish every homeowner had.</h2>
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

      {/* 6 — Why Headgate */}
      <section className="border-y border-line bg-paper py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="label">Why Headgate</span>
            <h2 className="t-h2 mt-4 max-w-[13ch]">The boring promises that matter at 3am.</h2>
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
              <li key={p.title}>
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
            <p className="t-data text-slate">Illustrative reviews — Headgate is a concept company.</p>
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.who} className="flex flex-col rounded-2xl bg-chalk p-6">
                <p className="t-data text-patina-deep">{r.job}</p>
                <blockquote className="mt-3 flex-1 text-[1.05rem]">“{r.quote}”</blockquote>
                <p className="mt-5 text-sm font-bold text-slate">— {r.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Service area + booking */}
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div className="panel p-6 sm:p-10">
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
          <div className="on-ink panel-ink flex flex-col justify-between gap-10 p-6 sm:p-10">
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
