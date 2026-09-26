import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import FreezeWatch from "@/components/tools/FreezeWatch";

export const metadata: Metadata = {
  title: "Freeze Watch: Denver frozen pipe forecast",
  description:
    "Denver's 7-day overnight lows with freeze-risk nights flagged, plus a frozen-pipe checklist based on Denver Water's advice.",
};

export default function FreezeWatchPage() {
  return (
    <>
      <PageHead
        label="Tool · Freeze Watch"
        title="Get ahead of the first hard freeze."
        lede="Most burst pipes happen on the first bitter night of the season, in pipes along exterior walls. Here's Denver's week ahead, with the nights that put pipes at risk flagged."
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <FreezeWatch />
        </div>
      </section>
    </>
  );
}
