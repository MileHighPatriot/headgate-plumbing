import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap max-w-2xl">
        <span className="label">404</span>
        <h1 className="t-hero mt-5">This line doesn&apos;t go anywhere.</h1>
        <p className="t-lede mt-6 text-slate">The page you were after has been moved or capped off.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ink">Back to the homepage</Link>
          <Link href="/help/" className="btn btn-line">What&apos;s going on? (triage)</Link>
        </div>
      </div>
    </section>
  );
}
