import Link from "next/link";
import type { CSSProperties } from "react";
import Icon from "@/components/Icon";

/**
 * "Follow the water": a scroll-pinned walk through a house's plumbing. Where scroll-driven
 * animations are supported the section is tall and its stage sticks while water is drawn from
 * the street main, through the shutoff and heater, up to the fixtures, and back out the sewer.
 * Everywhere else (and under reduced motion) it's a plain section: the finished drawing and
 * the five stops as a list. All motion is CSS: see "Follow the water" in globals.css.
 */
const stops = [
  {
    title: "It starts under the street",
    body: "One buried service line carries water from the main to your house. When it leaks, the first sign is often a wet patch in the yard or a bill that jumps.",
    link: ["Water lines & repiping", "/services/water-lines/"],
  },
  {
    title: "The valve that stops everything",
    body: "The main shutoff sits where the line comes through the wall. Knowing where yours is turns a burst pipe from a flood into a puddle.",
    link: ["Whose pipe is it?", "/tools/whose-pipe/"],
  },
  {
    title: "Then it gets heated",
    body: "A tank heater works every hour of every day. Most give some warning before they quit: rusty water, rumbling, or a slow drip at the base.",
    link: ["Water heaters", "/services/water-heaters/"],
  },
  {
    title: "Up to every tap",
    body: "Hot and cold lines branch to each sink, toilet and tub. A running toilet or a dripping faucet is small, steady money down the drain.",
    link: ["Leaks & fixtures", "/services/leaks-fixtures/"],
  },
  {
    title: "And out through one drain",
    body: "Every drain in the house joins a single line back to the street. If they all gurgle at once, that line is where the trouble is.",
    link: ["Drains & sewer", "/services/drains-sewer/"],
  },
] as const;

// Where each numbered stop sits on the drawing, and when (in % of the scroll) it lights up.
const marks: [number, number, string][] = [
  [172, 410, "8%"],
  [300, 410, "24%"],
  [370, 392, "40%"],
  [500, 262, "60%"],
  [400, 470, "80%"],
];

export default function WaterStory() {
  return (
    <section aria-labelledby="water-story" className="ws on-ink hero-ink relative isolate text-paper">
      <div className="ws-stage">
        <div className="wrap grid w-full gap-6 py-12 lg:grid-cols-[0.85fr_1.5fr] lg:items-center lg:gap-14 lg:py-16">
          <div className="min-w-0">
            <span className="label">How your plumbing works</span>
            <h2 id="water-story" className="t-h2 mt-4 max-w-[13ch]">
              Follow the water <span className="text-mint">through the house.</span>
            </h2>
            <div aria-hidden="true" className="ws-rail mt-6 h-1 max-w-sm overflow-hidden rounded-full bg-white/10">
              <i className="block h-full origin-left rounded-full bg-hivis" />
            </div>
            <ol className="ws-steps mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8">
              {stops.map((s, i) => (
                <li
                  key={s.title}
                  className="ws-step"
                  style={{ "--a": `${i * 20 - 2}%`, "--b": `${i * 20 + 22}%` } as CSSProperties}
                >
                  <span className="t-data text-mint">
                    Stop {i + 1} of {stops.length}
                  </span>
                  <span className="t-h3 mt-1 block font-display font-bold">{s.title}</span>
                  <span className="mt-2 block max-w-md text-fog">{s.body}</span>
                  <Link href={s.link[1]} className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-hivis">
                    {s.link[0]} <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden="true" className="ws-art order-first p-3 sm:p-5 lg:order-none">
            <svg viewBox="0 22 770 492" className="block h-auto w-full">
              {/* ground and street */}
              <rect x="0" y="330" width="800" height="180" fill="#0b2a2a" opacity=".55" />
              <path d="M0 330h800" stroke="#9ed8c6" strokeOpacity=".4" strokeWidth="2" />
              <path d="M0 330h150" stroke="#9ed8c6" strokeOpacity=".7" strokeWidth="6" />
                            {/* house: roof, walls, floors, basement */}
              <g fill="none" stroke="#9ed8c6" strokeOpacity=".55" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M236 126 490 40l254 86" />
                <path d="M260 118v332h460V118" />
                <path d="M260 226h460M260 330h460" strokeOpacity=".3" />
              </g>
              {/* rooms: window, door, kitchen counter, tub */}
              <g fill="none" stroke="#9ed8c6" strokeOpacity=".28" strokeWidth="2">
                <rect x="300" y="150" width="56" height="46" rx="3" />
                <path d="M328 150v46M300 173h56" />
                <rect x="296" y="252" width="44" height="78" rx="3" />
                <path d="M462 292h90v38h-90z" />
                <path d="M566 196h84a0 0 0 0 1 0 0v12a18 18 0 0 1-18 18h-48a18 18 0 0 1-18-18v-12z" />
              </g>
              {/* water heater */}
              <rect x="345" y="350" width="50" height="90" rx="12" fill="#113534" stroke="#9ed8c6" strokeOpacity=".7" strokeWidth="2.5" />
              <rect x="357" y="372" width="26" height="12" rx="3" fill="#d9f24b" opacity=".85" />
              {/* mains in the street, seen end-on */}
              <circle cx="70" cy="410" r="15" fill="#113534" stroke="#9ed8c6" strokeWidth="3" />
              <circle cx="70" cy="470" r="18" fill="#113534" stroke="#d9f24b" strokeOpacity=".8" strokeWidth="3" />
              <g fontFamily="var(--font-mono)" fontSize="17" fill="#8fb3ac">
                <text x="12" y="382">Water main</text>
                <text x="12" y="508">Sewer</text>
                <text x="12" y="312">Street</text>
              </g>
              {/* pipes: ghost runs first, then the water drawn over them */}
              <g fill="none" stroke="#19423f" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                <path d="M85 410H345" />
                <path d="M370 350V262H500V284M430 262V150H610V186" />
                <path d="M620 208V226H660V470H88M510 300V316H660" />
              </g>
              <path className="ws-line ws-supply" pathLength={100} d="M85 410H345" stroke="#9ed8c6" strokeWidth="6" />
              <path
                className="ws-line ws-branch"
                pathLength={100}
                d="M370 350V262H500V284M430 262V150H610V186"
                stroke="#9ed8c6"
                strokeWidth="6"
              />
              <path
                className="ws-line ws-drain"
                pathLength={100}
                d="M620 208V226H660V470H88M510 300V316H660"
                stroke="#d9f24b"
                strokeWidth="6"
              />
              {/* shutoff valve handle */}
              <path d="M300 410v-16M290 394h20" stroke="#cf2b2f" strokeWidth="4" strokeLinecap="round" />
              {marks.map(([x, y, at], i) => (
                <g key={i} className="ws-stop" style={{ "--at": at } as CSSProperties}>
                  <circle cx={x} cy={y} r="17" />
                  <text x={x} y={y + 6}>
                    {i + 1}
                  </text>
                </g>
              ))}
              <g fontFamily="var(--font-mono)" fontSize="17">
                <text x="745" y="496" textAnchor="end" fill="#9ed8c6">
                  ━ Fresh water
                </text>
                <text x="590" y="496" textAnchor="end" fill="#d9f24b">
                  ━ Drain
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
