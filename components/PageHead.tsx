import type { ReactNode } from "react";

/** Interior page header: label chip, big headline, lede, optional aside. */
export default function PageHead({
  label,
  title,
  lede,
  aside,
  children,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-head hero-ink on-ink relative isolate overflow-hidden text-paper">
      <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <span className="label rise">{label}</span>
          <h1 className="t-hero mt-5 max-w-[16ch]">
            <span className="line-mask">
              <span className="line-rise">{title}</span>
            </span>
          </h1>
          {lede ? <p className="t-lede mt-6 max-w-2xl text-fog">{lede}</p> : null}
          {children}
        </div>
        {aside ? <div className="rise-2">{aside}</div> : null}
      </div>
    </section>
  );
}
