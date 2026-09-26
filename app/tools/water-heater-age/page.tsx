import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import HeaterAge from "@/components/tools/HeaterAge";

export const metadata: Metadata = {
  title: "How old is my water heater? Serial number decoder",
  description:
    "Decode the manufacture date of a Rheem, Ruud, A.O. Smith, State or Bradford White water heater from its serial number, and see how much life it has left.",
};

export default function HeaterAgePage() {
  return (
    <>
      <PageHead
        label="Tool · Water heater age"
        title="How old is your water heater?"
        lede="The build date is hidden in the serial number. Pick the brand, type the serial off the label, and we'll decode it using each manufacturer's own date code."
      />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <HeaterAge />
        </div>
      </section>
    </>
  );
}
