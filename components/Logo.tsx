import { site } from "@/data/site";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="#0b2a2a" />
      <path d="M8 29V9M28 29V9M6 9h24" stroke="#9ed8c6" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="11.5" y="12" width="13" height="8.5" rx="1.6" fill="#d9f24b" />
      <path d="M11.5 16.25h13" stroke="#0b2a2a" strokeWidth="1.4" />
      <path
        d="M9.5 26.2c1.6-1.4 3.1-1.4 4.7 0s3.1 1.4 4.7 0 3.1-1.4 4.7 0 3 1.3 3.6.6"
        stroke="#9ed8c6"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] font-extrabold tracking-tight [font-variation-settings:'wdth'_80] ${tone === "paper" ? "text-paper" : "text-ink"}`}
        >
          {site.shortName}
        </span>
        <span className={`block t-data mt-0.5 ${tone === "paper" ? "text-fog" : "text-slate"}`}>
          Plumbing &amp; Drain
        </span>
      </span>
    </span>
  );
}
