import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Booking from "@/components/tools/Booking";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a two-hour arrival window",
  description: "Book a Denver-metro plumber in a two-hour arrival window. We text when your plumber is 30 minutes out.",
};

export default function BookPage() {
  return (
    <>
      <PageHead
        label="Book"
        title="Pick a two-hour window."
        lede="Tell us what's going on and when works. You'll get a text confirming the window, then another when your plumber is 30 minutes out — with their name."
        aside={
          <a href={site.phoneHref} className="flex items-center gap-4 rounded-2xl bg-ink p-5 text-paper hover:bg-ink-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-alert">
              <Icon name="phone" />
            </span>
            <span>
              <span className="block font-bold">Water on the floor right now?</span>
              <span className="block text-fog">Skip the form. Call {site.phone} — 24/7.</span>
            </span>
          </a>
        }
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <Booking />
        </div>
      </section>
    </>
  );
}
