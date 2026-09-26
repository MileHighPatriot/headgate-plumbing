import Link from "next/link";
import Icon from "@/components/Icon";

/** Header aside that points people who don't know the name of their problem to triage. */
export default function TriageAside() {
  return (
    <Link href="/help/" className="on-ink group block rounded-[var(--radius-fit)] bg-ink p-6 text-paper sm:p-8">
      <span className="label">Not sure what it&apos;s called?</span>
      <span className="mt-4 block font-display text-2xl font-bold">Start with the symptom.</span>
      <span className="mt-2 block text-fog">
        Answer a question or two and get an urgency level, the next five minutes, and a price range.
      </span>
      <span className="mt-5 inline-flex items-center gap-2 font-bold text-hivis">
        Open triage <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
