"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import PriceRows from "@/components/PriceRows";
import { ownerCopy, pipeSegments, type Owner } from "@/data/pipes";

const OWNER_STROKE: Record<Owner, string> = {
  you: "#d9f24b",
  utility: "#8fb3ac",
  city: "#8fb3ac",
};

type SegProps = {
  id: string;
  active: string;
  hover: string | null;
  setActive: (id: string) => void;
  setHover: (id: string | null) => void;
  label: string;
  children: ReactNode;
  hit: ReactNode;
};

/** One clickable segment: visible artwork plus a wide invisible hit area. */
function Seg({ id, active, hover, setActive, setHover, label, children, hit }: SegProps) {
  const on = active === id;
  const hot = hover === id;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={on}
      onClick={() => setActive(id)}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive(id);
        }
      }}
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(null)}
      className="cursor-pointer outline-none [&:focus-visible_.focus-ring]:opacity-100"
      style={{ opacity: on || hot ? 1 : 0.78, transition: "opacity .2s" }}
    >
      <g className="focus-ring opacity-0" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" fill="none">
        {hit}
      </g>
      {children}
      <g stroke="transparent" strokeWidth="26" fill="none" strokeLinecap="round">
        {hit}
      </g>
      {on ? (
        <g stroke={OWNER_STROKE[pipeSegments.find((s) => s.id === id)!.owner]} strokeWidth="18" fill="none" opacity=".18" strokeLinecap="round">
          {hit}
        </g>
      ) : null}
    </g>
  );
}

export default function WhosePipe() {
  const [active, setActive] = useState("service-line");
  const [hover, setHover] = useState<string | null>(null);
  const seg = pipeSegments.find((s) => s.id === active)!;
  const common = { active, hover, setActive, setHover };
  const w = (id: string) => (active === id ? 9 : 7);
  const color = (id: string) => OWNER_STROKE[pipeSegments.find((s) => s.id === id)!.owner];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr] xl:items-start">
      <div className="on-ink panel-ink overflow-hidden p-3 sm:p-5">
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
        <svg viewBox="0 0 1000 470" className="h-auto w-full min-w-[40rem]" role="group" aria-label="Cutaway of a Denver lot showing water and sewer pipes">
          {/* soil + surfaces */}
          <rect x="0" y="190" width="1000" height="280" fill="#113534" />
          <g stroke="#19423f" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={i} d={`M${i * 90 - 40} 470 L${i * 90 + 60} 190`} />
            ))}
          </g>
          <rect x="0" y="176" width="244" height="14" fill="#19423f" />
          <path d="M20 183h40M100 183h40M180 183h40" stroke="#d9f24b" strokeWidth="2" opacity=".5" />
          <rect x="244" y="170" width="10" height="20" fill="#8fb3ac" opacity=".6" />
          <rect x="254" y="184" width="82" height="6" fill="#8fb3ac" opacity=".4" />
          <path d="M336 186H620" stroke="#9ed8c6" strokeWidth="3" opacity=".5" />
          <path d="M336 110V460" stroke="#9ed8c6" strokeWidth="1.5" strokeDasharray="6 6" opacity=".6" />

          {/* house */}
          <path d="M600 80 780 12 960 80" fill="none" stroke="#9ed8c6" strokeWidth="3" strokeLinejoin="round" />
          <rect x="620" y="78" width="320" height="112" fill="none" stroke="#9ed8c6" strokeWidth="3" />
          <rect x="630" y="192" width="300" height="134" fill="#0b2a2a" stroke="#9ed8c6" strokeWidth="3" />
          <path d="M620 190h320" stroke="#9ed8c6" strokeWidth="3" />

          {/* labels */}
          <g className="font-mono" fontSize="14" fill="#9ed8c6">
            <text x="16" y="160">Street</text>
            <text x="252" y="160">Sidewalk</text>
            <text x="344" y="126" opacity=".8">Property line</text>
            <text x="470" y="170">Your yard</text>
            <text x="738" y="142">Your house</text>
          </g>

          {/* water main */}
          <Seg id="water-main" label="Water main — Denver Water" {...common} hit={<circle cx="90" cy="290" r="24" />}>
            <circle cx="90" cy="290" r="24" fill="#0b2a2a" stroke={color("water-main")} strokeWidth={w("water-main")} />
            <text x="58" y="340" fontSize="14" fill="#9ed8c6" className="font-mono">Water main</text>
          </Seg>

          {/* sewer main */}
          <Seg id="sewer-main" label="Sewer main — City of Denver" {...common} hit={<circle cx="150" cy="410" r="30" />}>
            <circle cx="150" cy="410" r="30" fill="#0b2a2a" stroke={color("sewer-main")} strokeWidth={w("sewer-main")} strokeDasharray="10 6" />
            <text x="196" y="448" fontSize="14" fill="#9ed8c6" className="font-mono">Sewer main</text>
          </Seg>

          {/* service line */}
          <Seg
            id="service-line"
            label="Water service line — property owner"
            {...common}
            hit={<path d="M116 290H292M308 290H388M412 290H630" />}
          >
            <path d="M116 290H292M308 290H388M412 290H634" stroke={color("service-line")} strokeWidth={w("service-line")} fill="none" />
            <text x="450" y="278" fontSize="14" fill="#d9f24b" className="font-mono">Service line</text>
          </Seg>

          {/* curb stop */}
          <Seg id="curb-stop" label="Curb stop — property owner" {...common} hit={<path d="M300 196V290" />}>
            <rect x="295" y="192" width="10" height="84" rx="3" fill="none" stroke={color("curb-stop")} strokeWidth="3" />
            <rect x="288" y="186" width="24" height="7" rx="2" fill={color("curb-stop")} />
            <path d="M290 280l20 20M310 280l-20 20" stroke={color("curb-stop")} strokeWidth="5" />
            <text x="262" y="326" fontSize="14" fill="#d9f24b" className="font-mono">Curb stop</text>
          </Seg>

          {/* meter pit */}
          <Seg id="meter-pit" label="Meter and meter pit — property owner" {...common} hit={<path d="M372 196V306H428V196" />}>
            <path d="M372 192V308H428V192" fill="none" stroke={color("meter-pit")} strokeWidth="3" />
            <rect x="364" y="184" width="72" height="8" rx="2" fill={color("meter-pit")} />
            <circle cx="400" cy="290" r="13" fill="#0b2a2a" stroke={color("meter-pit")} strokeWidth="4" />
            <text x="366" y="330" fontSize="14" fill="#d9f24b" className="font-mono">Meter pit</text>
          </Seg>

          {/* house plumbing */}
          <Seg
            id="house"
            label="House plumbing — property owner"
            {...common}
            hit={<path d="M634 290H700V222H880V112M770 236V316" />}
          >
            <path d="M634 290H700V222H880V116" stroke={color("house")} strokeWidth={w("house") - 2} fill="none" strokeLinejoin="round" />
            <path d="M688 262h24" stroke={color("house")} strokeWidth="8" />
            <rect x="752" y="236" width="40" height="80" rx="8" fill="#0b2a2a" stroke={color("house")} strokeWidth="3" />
            <path d="M772 222v14" stroke={color("house")} strokeWidth="4" />
            <path d="M856 112h48v10a14 14 0 0 1-14 14h-20a14 14 0 0 1-14-14Z" fill="none" stroke={color("house")} strokeWidth="3" />
            <text x="712" y="258" fontSize="12" fill="#9ed8c6" className="font-mono">shutoff</text>
            <text x="798" y="300" fontSize="12" fill="#9ed8c6" className="font-mono">heater</text>
          </Seg>

          {/* sewer lateral */}
          <Seg
            id="sewer-lateral"
            label="Sewer lateral — property owner, all the way to the main"
            {...common}
            hit={<path d="M900 300V350L640 368L182 404" />}
          >
            <path d="M900 300V350L640 368L182 404" stroke={color("sewer-lateral")} strokeWidth={w("sewer-lateral") + 2} fill="none" strokeLinejoin="round" strokeDasharray="1 0" />
            <path d="M900 300V350L640 368L182 404" stroke="#0b2a2a" strokeWidth="2" fill="none" strokeDasharray="2 14" strokeLinejoin="round" />
            <text x="460" y="408" fontSize="14" fill="#d9f24b" className="font-mono">Sewer lateral</text>
          </Seg>
        </svg>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-2 pb-1 pt-3 text-sm">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-7 rounded bg-hivis" /> Yours to maintain
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-7 rounded bg-fog" /> Utility or city
          </span>
          <span className="text-fog">Tap any pipe, valve or pit.<span className="sm:hidden"> Swipe to see the whole lot.</span></span>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 xl:hidden" role="group" aria-label="Choose a segment">
          {pipeSegments.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={active === s.id}
              onClick={() => setActive(s.id)}
              className="chip min-h-10 text-sm"
            >
              {s.name}
            </button>
          ))}
        </div>

        <div key={seg.id} className="panel rise mt-4 p-6 xl:mt-0" aria-live="polite">
          <span
            className={`urgency ${seg.owner === "you" ? "bg-hivis text-ink" : "bg-ink text-mint"}`}
          >
            {seg.owner === "you" ? "Yours" : ownerCopy[seg.owner].label}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold">{seg.name}</h2>
          <p className="mt-3 text-slate">{seg.what}</p>
          <h3 className="mt-6 font-bold">What goes wrong</h3>
          <ul className="prose-hg">
            {seg.fails.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h3 className="mt-6 font-bold">Who fixes it</h3>
          <p className="mt-1 text-slate">{seg.fix}</p>
          {seg.prices.length ? (
            <div className="mt-6">
              <PriceRows ids={seg.prices} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
