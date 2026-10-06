import Link from "next/link";
import Icon from "@/components/Icon";

export const tools = [
  {
    href: "/tools/whose-pipe/",
    title: "Whose pipe is it?",
    body: "Tap through a Denver lot and see which pipes the utility fixes and which ones are yours.",
    glyph: "pipe",
  },
  {
    href: "/tools/water-heater-age/",
    title: "How old is my water heater?",
    body: "Type the serial number off the label. We'll decode the build date and tell you how much life is left.",
    glyph: "heater",
  },
  {
    href: "/tools/freeze-watch/",
    title: "Freeze Watch",
    body: "Denver's 7-day lows, flagged when pipes are at risk, with a checklist to get ahead of it.",
    glyph: "freeze",
  },
] as const;

function Glyph({ kind }: { kind: string }) {
  if (kind === "pipe")
    return (
      <svg viewBox="0 0 120 64" className="h-16 w-auto" aria-hidden="true">
        <path d="M4 44h40" stroke="#9ed8c6" strokeWidth="8" strokeLinecap="round" />
        <path d="M44 44h32a12 12 0 0 0 12-12V14" stroke="#d9f24b" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M76 44h40" stroke="#9ed8c6" strokeWidth="8" strokeLinecap="round" opacity=".45" />
        <circle cx="44" cy="44" r="7" fill="#0b2a2a" stroke="#9ed8c6" strokeWidth="3" />
      </svg>
    );
  if (kind === "heater")
    return (
      <svg viewBox="0 0 120 64" className="h-16 w-auto" aria-hidden="true">
        <rect x="40" y="4" width="40" height="56" rx="10" fill="none" stroke="#9ed8c6" strokeWidth="4" />
        <rect x="48" y="14" width="24" height="10" rx="3" fill="#d9f24b" />
        <path d="M50 44h20M50 51h12" stroke="#9ed8c6" strokeWidth="3" strokeLinecap="round" />
        <path d="M86 20h26M86 32h18" stroke="#9ed8c6" strokeWidth="3" strokeLinecap="round" opacity=".45" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-auto" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={8 + i * 15}
          y={i === 2 || i === 3 ? 34 : 18 + (i % 3) * 4}
          width="9"
          height={i === 2 || i === 3 ? 26 : 42 - (i % 3) * 4}
          rx="4"
          fill={i === 2 || i === 3 ? "#d9f24b" : "#9ed8c6"}
          opacity={i === 2 || i === 3 ? 1 : 0.5}
        />
      ))}
      <path d="M4 30h112" stroke="#9ed8c6" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}

export default function ToolCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {tools.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href}
            className="on-ink group flex h-full flex-col rounded-[var(--radius-fit)] bg-ink p-6 text-paper transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-24 items-center rounded-2xl bg-ink-2 px-5">
              <Glyph kind={t.glyph} />
            </div>
            <h3 className="t-h3 mt-6">{t.title}</h3>
            <p className="mt-2 flex-1 text-fog">{t.body}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-bold text-hivis">
              Open the tool
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
