import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import AreaChecker from "@/components/tools/AreaChecker";
import { areas, zoneCopy } from "@/data/areas";

export const metadata: Metadata = {
  title: "Service area: Denver metro",
  description:
    "Headgate serves Denver, Aurora, Lakewood, Arvada, Englewood, Littleton, Centennial, Westminster, Thornton and more. Check your ZIP code.",
};

export default function ServiceAreaPage() {
  const core = areas.filter((a) => a.zone === "core");
  const edge = areas.filter((a) => a.zone === "edge");
  return (
    <>
      <PageHead
        label="Service area"
        title="Denver and the inner suburbs."
        lede="We keep our area tight so arrival windows mean something. Check your ZIP code or city."
        aside={
          <div className="panel p-6">
            <AreaChecker />
          </div>
        }
      />
      <section className="py-16 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          {[
            { title: "Core area", list: core, copy: zoneCopy.core },
            { title: "Extended area", list: edge, copy: zoneCopy.edge },
          ].map((g) => (
            <div key={g.title}>
              <span className="tab">{g.title}</span>
              <div className="panel tabbed p-6 sm:p-8">
                <p className="text-slate">{g.copy}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {g.list.map((a) => (
                    <li key={a.city} className="border-t border-line pt-3">
                      <p className="font-bold">{a.city}</p>
                      <p className="t-data text-slate">{a.zips.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
