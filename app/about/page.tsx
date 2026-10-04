import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import { site } from "@/data/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Headgate",
  description:
    "Headgate Plumbing & Drain is a locally owned Denver plumbing company, founded in 2009 by a master plumber. Not private equity. Plumbers paid hourly, not on commission.",
};

const beliefs = [
  ["Say the price out loud.", "Published ranges online, a written price on site, and no work until you say yes."],
  ["Pay plumbers to fix things, not sell things.", "Our plumbers are paid hourly. Nobody here earns a bonus for a water heater."],
  ["Answer the phone.", "A person on the emergency line all night, who can walk you to your shutoff before a truck arrives."],
  ["Leave it better documented.", "Photos, camera video, and a written cause on every job, so the next plumber — or buyer — knows what's there."],
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHead
        label="About"
        title="Named after a ditch gate. Run like one."
        lede={`A headgate is the gate at the top of an irrigation ditch — the thing that decides where the water goes. Marisol Vega grew up opening and closing them on her grandfather's farm near Brighton. She started Headgate in ${site.founded} with one truck and a sewer camera.`}
        aside={
          <div className="fitting-photo aspect-[3/4] max-h-[28rem] bg-ink/10">
            <Photo name="wall-pipes" alt="White pipes running up a blue corrugated wall" sizes="(min-width: 1024px) 460px, 100vw" priority />
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="label">Still local</span>
            <h2 className="t-h2 mt-4 max-w-[13ch]">Locally owned. Not private equity.</h2>
            <p className="mt-5 text-slate">
              A lot of the Front Range&apos;s best-known plumbing brands now belong to national investment groups. There&apos;s
              nothing wrong with that — but it changes who the company answers to. Headgate is owned by the master
              plumber whose license it runs under, and she still takes the Monday dispatch meeting.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {beliefs.map(([a, b]) => (
              <li key={a} className="pipe-run">
                <h3 className="t-h3">{a}</h3>
                <p className="mt-2 text-slate">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 md:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="t-h2">Who shows up</h2>
            <p className="t-data text-slate">Sample crew. Headgate is a concept company.</p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <li key={t.name} className="rounded-2xl bg-chalk p-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink font-display text-2xl font-extrabold text-hivis">
                  {initials(t.name)}
                </span>
                <p className="mt-5 font-display text-xl font-bold">{t.name}</p>
                <p className="text-sm text-patina-deep">{t.role}</p>
                <p className="t-data mt-1 text-slate">{t.years} years in the trade</p>
                <p className="mt-4 text-slate">{t.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-slate">
            Every Headgate plumber is licensed by the State of Colorado, background-checked, and drug-tested. We text
            you their name before they arrive so you know who&apos;s at the door.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <h2 className="t-h2 max-w-[16ch]">Need a plumber who&apos;ll tell you the price first?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/book/" className="btn btn-go">Book an arrival window</Link>
            <a href={site.phoneHref} className="btn btn-ink">{site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
