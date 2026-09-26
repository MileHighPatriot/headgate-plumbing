"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="relative z-40">
      <div className="on-ink bg-ink text-paper">
        <div className="wrap flex min-h-10 items-center justify-between gap-4 py-1.5 text-sm">
          <a href={site.phoneHref} className="flex items-center gap-2 font-bold hover:text-hivis">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-hivis animate-tick" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-hivis" />
            </span>
            <span>
              Emergency line answered by a person, 24/7
              <span className="hidden sm:inline"> · {site.phone}</span>
            </span>
          </a>
          <div className="hidden items-center gap-5 text-fog md:flex">
            <span>Office {site.hours.office}</span>
            <a href={site.textHref} className="flex items-center gap-1.5 text-mint hover:text-hivis">
              <Icon name="text" className="h-4 w-4" /> Text us
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-chalk/95 backdrop-blur supports-[backdrop-filter]:bg-chalk/85">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="rounded-lg px-3 py-2 font-bold text-ink/80 transition-colors hover:bg-mint-soft hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-line hidden min-h-11 px-4 xl:inline-flex">
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>
            <Link href="/book/" className="btn btn-go hidden min-h-11 px-4 sm:inline-flex">
              Book a visit
            </Link>
            <button
              type="button"
              className="btn btn-ink min-h-11 px-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} />
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-ink fixed inset-x-0 bottom-0 top-[6.9rem] overflow-y-auto bg-ink text-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap py-6">
          <ul className="grid gap-1">
            {[{ href: "/help/", label: "What's going on? (triage)" }, ...nav, { href: "/service-area/", label: "Service area" }, { href: "/contact/", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-2xl font-bold hover:bg-ink-3"
                >
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 text-mint" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={site.phoneHref} className="btn btn-go">
              <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
            </a>
            <Link href="/book/" className="btn btn-line">
              Book an arrival window
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
