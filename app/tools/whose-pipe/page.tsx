import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import WhosePipe from "@/components/tools/WhosePipe";
import { pipeSources } from "@/data/pipes";

export const metadata: Metadata = {
  title: "Whose pipe is it? Denver water & sewer ownership",
  description:
    "An interactive cutaway of a Denver lot showing which water and sewer pipes the property owner is responsible for, and which belong to the utility.",
};

export default function WhosePipePage() {
  return (
    <>
      <PageHead
        label="Tool · Whose pipe is it?"
        title="Most of the pipe is yours."
        lede="In Denver the property owner is responsible for the water service line, the curb stop, the meter pit, and the sewer line all the way to the city main. Tap through the lot to see what each part does and what it costs when it fails."
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <WhosePipe />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-[var(--radius-fit)] bg-hivis p-6 sm:p-8">
              <p className="t-data">Before you pay to replace a service line</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold">Check for lead first. It may be free.</h2>
              <p className="mt-3 max-w-xl">
                Denver Water estimates tens of thousands of older homes — mostly built before 1951 — may still have lead
                service lines. Its Lead Reduction Program replaces them with copper at no direct cost to the homeowner,
                and hands out free water filters in the meantime.
              </p>
              <a href={pipeSources[2].url} className="btn btn-ink mt-5" target="_blank" rel="noreferrer">
                Look up your address on Denver Water&apos;s map
              </a>
            </div>
            <div className="panel p-6 sm:p-8">
              <p className="font-bold">Sources</p>
              <ul className="mt-3 grid gap-2 text-sm">
                {pipeSources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} className="link" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate">
                Aurora Water, Westminster and other metro utilities draw the lines a little differently. We&apos;ll tell
                you what applies at your address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
