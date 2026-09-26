import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import TriageAside from "@/components/TriageAside";
import ToolCards from "@/components/ToolCards";

export const metadata: Metadata = {
  title: "Homeowner plumbing tools",
  description:
    "Free Denver plumbing tools: see which pipes you own, decode your water heater's age from its serial number, and track freeze-risk nights.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHead
        label="Know your system"
        title="Tools we wish every homeowner had."
        lede="Free, no sign-up, and built on Denver Water's published rules and the manufacturers' own serial codes. Use them before you call anyone — including us."
        aside={<TriageAside />}
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <ToolCards />
        </div>
      </section>
    </>
  );
}
