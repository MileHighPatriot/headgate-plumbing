import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import PageHead from "@/components/PageHead";
import PriceRows from "@/components/PriceRows";
import BackflowTool from "@/components/tools/BackflowTool";
import { site } from "@/data/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Commercial plumbing & backflow testing",
  description:
    "Commercial plumbing for Denver restaurants, property managers and multifamily buildings: scheduled line jetting, grease interceptors, backflow testing and filing, 24/7 response.",
};

const sectors = [
  {
    icon: "flame",
    title: "Restaurants & commercial kitchens",
    points: [
      "Kitchen lines jetted on a schedule, before they back up mid-service",
      "Grease interceptor service and inspection-ready records",
      "Work done after close so you never lose a seating",
    ],
  },
  {
    icon: "building",
    title: "Property managers & HOAs",
    points: [
      "Tenant scheduling handled by our dispatch, not your inbox",
      "Unit-by-unit service history and one invoice per property",
      "A person on the emergency line for your tenants, 24/7",
    ],
  },
  {
    icon: "gauge",
    title: "Multifamily & mixed-use",
    points: [
      "Commercial water heaters sized to recovery demand",
      "Riser, PRV and booster pump service",
      "Backflow testing for domestic, fire and irrigation assemblies",
    ],
  },
];

const account = [
  ["Scheduled maintenance", "Jetting, water heater service and backflow tests on a calendar we keep, not you."],
  ["Priority emergency response", "Account buildings go to the top of the board, day or night."],
  ["Filed for you", "Backflow reports submitted to your water provider, with copies in your account file."],
  ["One monthly invoice", "Per property or rolled up, however your accounting wants it."],
];

export default function CommercialPage() {
  const lead = team[3];
  return (
    <>
      <PageHead
        label="Commercial"
        title="Plumbing that keeps you open."
        lede="Restaurants, property managers and multifamily buildings across the Denver metro. We schedule the maintenance that prevents emergencies, file your backflow paperwork, and answer at 3am when something fails anyway."
        aside={
          <div className="fitting-photo aspect-[4/3] bg-ink/10">
            <Photo
              name="restaurant"
              alt="A chef working the line in a busy restaurant kitchen"
              sizes="(min-width: 1024px) 460px, 100vw"
              priority
            />
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/book/?need=backflow" className="btn btn-go">
            Schedule a backflow test
          </Link>
          <a href={site.phoneHref} className="btn btn-ink">
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </PageHead>

      <section className="py-16 md:py-20">
        <div className="wrap">
          <ul className="grid gap-5 lg:grid-cols-3">
            {sectors.map((s) => (
              <li key={s.title} className="panel p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-hivis">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h2 className="t-h3 mt-5">{s.title}</h2>
                <ul className="prose-hg mt-2 text-slate">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 md:py-20">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <span className="label">Backflow</span>
              <h2 className="t-h2 mt-4 max-w-[14ch]">Never miss an annual test again.</h2>
            </div>
            <p className="t-lede text-slate">
              Water providers require testable backflow assemblies to be tested every year by a certified tester. Enter
              your last test date and we&apos;ll show you when the next one is due and what it costs to have us test
              and file it.
            </p>
          </div>
          <div className="mt-10">
            <BackflowTool />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="label">Building Account</span>
            <h2 className="t-h2 mt-4 max-w-[16ch]">One account for every building you run.</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {account.map(([a, b]) => (
                <li key={a} className="border-l-2 border-patina pl-4">
                  <p className="font-bold">{a}</p>
                  <p className="mt-1 text-slate">{b}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h3 className="font-display text-xl font-bold">Commercial price ranges</h3>
              <div className="mt-2">
                <PriceRows ids={["backflow-test", "grease", "hydro-jet", "commercial-wh", "after-hours"]} />
              </div>
            </div>
          </div>
          <div className="on-ink panel-ink self-start p-6 sm:p-8">
            <p className="t-data text-mint">Your commercial lead (sample)</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint font-display text-2xl font-extrabold text-ink">
                TR
              </span>
              <div>
                <p className="font-display text-2xl font-bold">{lead.name}</p>
                <p className="text-fog">{lead.role}</p>
              </div>
            </div>
            <p className="mt-5 text-paper/85">
              {lead.note} Tomás walks every new account building, maps the shutoffs and assemblies, and sets the
              maintenance calendar with you.
            </p>
            <a href={site.phoneHref} className="btn btn-go mt-6 w-full">
              <Icon name="phone" className="h-4 w-4" /> Set up a walk-through
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
