import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text or email Headgate Plumbing & Drain. The emergency line is answered by a person 24/7.",
};

const ways = [
  { icon: "phone", k: "Call — 24/7", v: site.phone, href: site.phoneHref, note: "A person answers, day or night." },
  { icon: "text", k: "Text dispatch", v: site.text, href: site.textHref, note: "Send a photo of the problem or a water heater label." },
  { icon: "calendar", k: "Book online", v: "Pick a two-hour window", href: "/book/", note: "Confirmation and arrival texts." },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        label="Contact"
        title="Three ways to reach dispatch."
        lede={`Office hours are ${site.hours.office}. The emergency line is ${site.hours.emergency}.`}
      />
      <section className="py-12 md:py-16">
        <div className="wrap grid gap-5 md:grid-cols-3">
          {ways.map((w) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-hivis">
                  <Icon name={w.icon} />
                </span>
                <p className="t-data mt-6 text-slate">{w.k}</p>
                <p className="mt-1 font-display text-2xl font-bold">{w.v}</p>
                <p className="mt-2 text-slate">{w.note}</p>
              </>
            );
            return w.href.startsWith("/") ? (
              <Link key={w.k} href={w.href} className="panel block p-6 hover:border-patina sm:p-8">{inner}</Link>
            ) : (
              <a key={w.k} href={w.href} className="panel block p-6 hover:border-patina sm:p-8">{inner}</a>
            );
          })}
        </div>
        <div className="wrap mt-5 grid gap-5 md:grid-cols-2">
          <div className="panel p-6 sm:p-8">
            <p className="t-data text-slate">Shop</p>
            <p className="mt-1 font-bold">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}
            </p>
            <p className="mt-3 text-slate">Parts counter open to account customers, weekdays 7–9am.</p>
          </div>
          <div className="panel p-6 sm:p-8">
            <p className="t-data text-slate">Email</p>
            <a href={`mailto:${site.email}`} className="link mt-1 inline-block">{site.email}</a>
            <p className="mt-3 text-slate">For invoices, insurance paperwork and commercial account setup. Not for emergencies.</p>
          </div>
        </div>
      </section>
    </>
  );
}
