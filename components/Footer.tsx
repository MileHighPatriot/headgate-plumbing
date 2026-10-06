import Link from "next/link";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { areas } from "@/data/areas";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="on-ink bg-ink pb-24 text-paper lg:pb-0">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo tone="paper" />
          <p className="mt-5 max-w-sm text-fog">
            Plumbing and drain service for Denver-metro homes and commercial buildings. Locally
            owned. Not private equity.
          </p>
          <div className="mt-6 grid gap-2">
            <a href={site.phoneHref} className="flex items-center gap-2 font-bold hover:text-hivis">
              <Icon name="phone" className="h-4 w-4 text-mint" /> {site.phone}
              <span className="font-normal text-fog">· 24/7</span>
            </a>
            <a href={site.textHref} className="flex items-center gap-2 hover:text-hivis">
              <Icon name="text" className="h-4 w-4 text-mint" /> Text {site.text}
            </a>
            <p className="flex items-center gap-2 text-fog">
              <Icon name="pin" className="h-4 w-4 text-mint" />
              {site.address.street}, {site.address.city}, {site.address.region}
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="t-data text-mint">{col.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-paper/85 hover:text-hivis">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap grid gap-6 py-8 text-sm text-fog lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="t-data text-mint">Licensed in Colorado</p>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {site.licenses.map((l) => (
                <li key={l.label}>
                  {l.label}: <span className="text-paper/85">{l.value}</span>
                </li>
              ))}
              <li>Insured · Background-checked, non-commissioned plumbers</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Serving {areas.map((a) => a.city).join(", ")}.
            </p>
          </div>
          <div className="lg:text-right">
            <p>
              <strong className="text-paper">Concept project.</strong> Headgate Plumbing &amp; Drain is a fictional
              company designed as a portfolio piece by{" "}
              <a href="https://5280webs.com" className="link">
                5280 Web Solutions
              </a>
              . People, reviews, license numbers and prices are illustrative.
            </p>
            <p className="mt-2">Photos: public domain (CC0) via StockSnap, Rawpixel and the USDA.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
