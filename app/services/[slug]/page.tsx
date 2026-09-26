import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import PageHead from "@/components/PageHead";
import PriceRows from "@/components/PriceRows";
import { serviceBySlug, services } from "@/data/services";
import { site } from "@/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug[slug];
  if (!s) return {};
  return { title: `${s.name} in Denver`, description: s.short };
}

const decades = [
  { era: "Before 1950", pipe: "Clay tile or cast iron", note: "Joints every 2–3 feet. Roots find them." },
  { era: "1945–1972", pipe: "Orangeburg (tar paper) in some homes", note: "Deforms and collapses with age. Replace, don't clear." },
  { era: "1950s–1970s", pipe: "Clay or cast iron", note: "Cast iron scales and cracks from the inside." },
  { era: "1975 and later", pipe: "PVC or ABS plastic", note: "Long runs, few joints. Sags from shifting soil are the usual issue." },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = serviceBySlug[slug];
  if (!s) notFound();
  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHead
        label={`Services · ${s.name}`}
        title={s.name}
        lede={s.lede}
        aside={
          <div className="fitting-photo aspect-[4/3] bg-ink/10">
            <Photo name={s.photo} alt={s.photoAlt} sizes="(min-width: 1024px) 460px, 100vw" priority />
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/book/" className="btn btn-go">
            Book an arrival window
          </Link>
          <a href={site.phoneHref} className="btn btn-ink">
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </PageHead>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="tab">Signs you need us</span>
            <div className="panel tabbed p-6">
              <ul className="prose-hg !mt-0">
                {s.signs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link href="/help/" className="link mt-6 inline-flex items-center gap-1.5">
                Not sure? Try the triage tool <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <h2 className="t-h2">How we handle it</h2>
            <ol className="mt-8 grid gap-8">
              {s.work.map((w, i) => (
                <li key={w.title} className="pipe-run">
                  <p className="t-data text-patina-deep">Step {i + 1}</p>
                  <h3 className="t-h3 mt-1">{w.title}</h3>
                  <p className="mt-2 text-slate">{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <div className="on-ink panel-ink p-6 sm:p-8">
            <span className="label">Colorado note</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">{s.colorado.title}</h2>
            <p className="mt-4 text-paper/85">{s.colorado.body}</p>
            {slug === "water-lines" || slug === "drains-sewer" ? (
              <Link href="/tools/whose-pipe/" className="link mt-5 inline-flex items-center gap-1.5">
                See whose pipe is whose <Icon name="arrow" className="h-4 w-4" />
              </Link>
            ) : slug === "water-heaters" ? (
              <Link href="/tools/water-heater-age/" className="link mt-5 inline-flex items-center gap-1.5">
                Decode your water heater&apos;s age <Icon name="arrow" className="h-4 w-4" />
              </Link>
            ) : slug === "emergency" ? (
              <Link href="/tools/freeze-watch/" className="link mt-5 inline-flex items-center gap-1.5">
                Check this week&apos;s Freeze Watch <Icon name="arrow" className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <div className="panel p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Typical prices</h2>
            <div className="mt-2">
              <PriceRows ids={s.prices} />
            </div>
          </div>
        </div>
      </section>

      {slug === "drains-sewer" ? (
        <section className="border-y border-line bg-paper py-16 md:py-20">
          <div className="wrap">
            <span className="label">What&apos;s under your yard</span>
            <h2 className="t-h2 mt-4 max-w-[18ch]">Your sewer pipe depends on when the house was built.</h2>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left">
                <thead>
                  <tr className="t-data text-slate">
                    <th scope="col" className="pb-3 pr-6 font-normal">Built</th>
                    <th scope="col" className="pb-3 pr-6 font-normal">Usual sewer pipe</th>
                    <th scope="col" className="pb-3 font-normal">What to watch for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line border-t-2 border-ink">
                  {decades.map((d) => (
                    <tr key={d.era}>
                      <th scope="row" className="py-4 pr-6 font-display text-lg font-bold">{d.era}</th>
                      <td className="py-4 pr-6 font-bold">{d.pipe}</td>
                      <td className="py-4 text-slate">{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="t-data mt-4 text-slate">General guide — a camera inspection is the only way to know what&apos;s really there.</p>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="t-h2">Straight answers</h2>
          <dl className="grid gap-8">
            {s.questions.map((q) => (
              <div key={q.q} className="border-t border-line pt-6">
                <dt className="font-display text-xl font-bold">{q.q}</dt>
                <dd className="mt-2 text-slate">{q.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-16">
          <Link
            href={`/services/${next.slug}/`}
            className="group flex items-center justify-between gap-6 rounded-[var(--radius-fit)] bg-ink p-6 text-paper sm:p-8"
          >
            <span>
              <span className="t-data block text-mint">Next service</span>
              <span className="font-display text-2xl font-bold sm:text-3xl">{next.name}</span>
            </span>
            <Icon name="arrow" className="h-7 w-7 text-hivis transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
