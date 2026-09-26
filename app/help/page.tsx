import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Triage from "@/components/tools/Triage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "What's going on? Plumbing triage",
  description:
    "Pick the plumbing symptom you're seeing. Get an urgency level, what to do in the next five minutes, and typical Denver price ranges.",
};

export default function HelpPage() {
  return (
    <>
      <PageHead
        label="Triage"
        title="What's going on?"
        lede="Answer a question or two. We'll tell you how urgent it is, what to do in the next five minutes, and what it usually costs — the same questions our dispatcher asks on the phone."
        aside={
          <div className="rounded-2xl bg-alert p-6 text-white">
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <Icon name="alert" className="h-5 w-5" /> Water pouring out right now?
            </p>
            <p className="mt-2 text-white">
              Shut off the main valve first — usually where the water line enters the basement wall on the street side.
              Then call.
            </p>
            <a href={site.phoneHref} className="btn mt-4 bg-white text-alert hover:bg-alert-soft">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        }
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <Triage />
        </div>
      </section>
    </>
  );
}
