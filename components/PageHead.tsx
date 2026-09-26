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
    <section className="border-b border-line bg-paper">
      <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="rise">
          <span className="label">{label}</span>
          <h1 className="t-hero mt-5 max-w-[16ch]">{title}</h1>
          {lede ? <p className="t-lede mt-6 max-w-2xl text-slate">{lede}</p> : null}
          {children}
        </div>
        {aside ? <div className="rise-2">{aside}</div> : null}
      </div>
    </section>
  );
}
