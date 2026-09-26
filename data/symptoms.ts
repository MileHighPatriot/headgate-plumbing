/**
 * Triage tree for /help. Each symptom asks one or two plain questions and
 * lands on an outcome with an urgency level, "next five minutes" steps, the
 * relevant price ranges and the service page.
 */
export type Urgency = "now" | "today" | "wait";

export type Outcome = {
  urgency: Urgency;
  title: string;
  steps: string[];
  why: string;
  prices: string[];
  service: string;
  callFirst?: "xcel";
};

export type Question = {
  q: string;
  options: { label: string; to: string }[];
};

export type Symptom = {
  id: string;
  label: string;
  hint: string;
  start: string;
  questions: Record<string, Question>;
  outcomes: Record<string, Outcome>;
};

export const urgencyCopy: Record<Urgency, { label: string; line: string }> = {
  now: { label: "Now", line: "Call us now — we answer 24/7." },
  today: { label: "Today", line: "Get on today's schedule." },
  wait: { label: "Can wait", line: "Book a window that suits you." },
};

export const symptoms: Symptom[] = [
  {
    id: "gas",
    label: "Gas smell",
    hint: "Rotten eggs, hissing",
    start: "out:leave",
    questions: {},
    outcomes: {
      leave: {
        urgency: "now",
        title: "Leave the house, then call Xcel Energy",
        callFirst: "xcel",
        steps: [
          "Get everyone (and pets) outside. Leave the door open behind you.",
          "Don't flip light switches, unplug anything, or use the garage door opener.",
          "From outside, call Xcel Energy's gas emergency line. They respond 24/7 at no charge.",
          "Once Xcel says the house is safe, call us to find and repair the leak.",
        ],
        why: "The utility has to make a gas leak safe first. We repair everything on your side of the meter after that.",
        prices: ["gas-test"],
        service: "gas-lines",
      },
    },
  },
  {
    id: "water-out",
    label: "Water where it shouldn't be",
    hint: "Spraying, dripping, ceiling stain",
    start: "flow",
    questions: {
      flow: {
        q: "Is water actively spraying or running right now?",
        options: [
          { label: "Yes — it's spraying or pouring", to: "out:shut" },
          { label: "It's dripping or a slow leak", to: "out:drip" },
          { label: "Just a stain or a damp spot", to: "out:stain" },
        ],
      },
    },
    outcomes: {
      shut: {
        urgency: "now",
        title: "Shut off the main, then call",
        steps: [
          "Find the main shutoff — usually where the water line enters the basement or crawlspace wall on the street side.",
          "Turn it clockwise until it stops (a lever handle goes a quarter turn, crossways to the pipe).",
          "Open the lowest faucet in the house to drain pressure off the line.",
          "If water is near outlets or the panel, stay out of standing water and switch that circuit off at the breaker if you can do it dry.",
        ],
        why: "Every minute of running water is more drywall, flooring and insurance paperwork. The shutoff buys you time.",
        prices: ["burst", "after-hours"],
        service: "emergency",
      },
      drip: {
        urgency: "today",
        title: "Contain it and get on today's schedule",
        steps: [
          "Put a bucket or towels under it and move anything valuable.",
          "If there's a shutoff valve under the fixture, close it.",
          "Take a photo of the leak and any staining — it helps us and your insurer.",
        ],
        why: "A steady drip becomes a rotten subfloor or mold behind the wall. It's rarely an emergency, but it shouldn't wait for the weekend.",
        prices: ["leak-find", "faucet", "toilet"],
        service: "leaks-fixtures",
      },
      stain: {
        urgency: "wait",
        title: "Book a leak detection visit",
        steps: [
          "Check your water meter with every fixture off. If the dial moves, water is going somewhere.",
          "Note whether the stain grows after a shower upstairs — that narrows it down.",
        ],
        why: "Stains are usually slow leaks at a drain, valve or wax ring. We find the exact spot before cutting anything.",
        prices: ["leak-find"],
        service: "leaks-fixtures",
      },
    },
  },
  {
    id: "no-hot",
    label: "No hot water",
    hint: "Or it runs out fast",
    start: "leak",
    questions: {
      leak: {
        q: "Is there water around the base of the water heater?",
        options: [
          { label: "Yes, it's leaking", to: "out:tankleak" },
          { label: "No, it's dry", to: "fuel" },
        ],
      },
      fuel: {
        q: "Is it gas or electric?",
        options: [
          { label: "Gas", to: "out:gas" },
          { label: "Electric", to: "out:electric" },
          { label: "Tankless", to: "out:tankless" },
        ],
      },
    },
    outcomes: {
      tankleak: {
        urgency: "today",
        title: "Turn it off and keep the water contained",
        steps: [
          "Close the cold-water valve on the pipe going into the top of the tank.",
          "Gas: turn the knob on the gas control to “Pilot” or “Vacation.” Electric: switch it off at the breaker.",
          "Don't try to drain it yourself — the water is scalding and old drain valves often won't reseal.",
        ],
        why: "A leaking tank almost always means the tank itself has failed. It won't fix itself, and they can let go all at once.",
        prices: ["wh-tank", "wh-tankless"],
        service: "water-heaters",
      },
      gas: {
        urgency: "today",
        title: "Check the pilot, then call if it won't stay lit",
        steps: [
          "Look through the small window at the bottom of the tank for a flame.",
          "If it's out, follow the relighting steps on the tank's label — once. If it won't stay lit, stop.",
          "If you smell gas at any point, leave and call Xcel Energy.",
        ],
        why: "A pilot that won't stay lit is usually a thermocouple or gas valve — often a same-visit repair.",
        prices: ["wh-repair", "wh-tank"],
        service: "water-heaters",
      },
      electric: {
        urgency: "today",
        title: "Check the breaker, then call",
        steps: [
          "Check whether the water heater's breaker has tripped. Reset it once.",
          "If it trips again, leave it off and call — that's a failed element or wiring.",
        ],
        why: "Electric tanks have two elements. When one fails you get lukewarm water; when both fail, none.",
        prices: ["wh-repair", "wh-tank"],
        service: "water-heaters",
      },
      tankless: {
        urgency: "today",
        title: "Read the error code before you call",
        steps: [
          "Look for a code on the unit's display and write it down.",
          "Check that the gas and water valves under the unit are open.",
          "Try a hot tap at full flow — tankless units need a minimum flow to fire.",
        ],
        why: "Most tankless no-heat calls are scale buildup or venting. The code tells us which parts to bring.",
        prices: ["wh-repair"],
        service: "water-heaters",
      },
    },
  },
  {
    id: "backup",
    label: "Backed-up drain",
    hint: "Slow, gurgling, overflowing",
    start: "where",
    questions: {
      where: {
        q: "How many drains are affected?",
        options: [
          { label: "Just one sink, tub or toilet", to: "out:one" },
          { label: "Several, or the lowest drain in the house", to: "floor" },
        ],
      },
      floor: {
        q: "Is water coming up through a basement floor drain or shower?",
        options: [
          { label: "Yes", to: "out:main" },
          { label: "No, everything is just slow", to: "out:slow" },
        ],
      },
    },
    outcomes: {
      one: {
        urgency: "wait",
        title: "It's a local clog — book a window",
        steps: [
          "Stop using that fixture and use a plunger (a flange plunger for toilets).",
          "Skip chemical drain cleaners — they rarely work and make the job dangerous for whoever opens the line next.",
        ],
        why: "A single slow fixture is almost always a clog in its own branch line.",
        prices: ["clog-fixture"],
        service: "drains-sewer",
      },
      main: {
        urgency: "now",
        title: "Stop all water use — it's the main line",
        steps: [
          "Don't run the washer, dishwasher, showers or flush toilets. Every gallon ends up on your basement floor.",
          "Tell everyone in the house, including tenants in a basement unit.",
          "If you know where your outdoor cleanout is, don't open it — it may be under pressure.",
        ],
        why: "Sewage coming up through the lowest drain means the main line is blocked. In older Denver homes that's often roots in clay pipe.",
        prices: ["main-cable", "camera", "hydro-jet"],
        service: "drains-sewer",
      },
      slow: {
        urgency: "today",
        title: "Main line is struggling — get it cleared today",
        steps: [
          "Hold off on laundry and long showers until it's cleared.",
          "Listen for gurgling in toilets when a sink drains — that confirms it's the main.",
        ],
        why: "Multiple slow drains means a partial main line blockage. It will get worse, usually at the worst time.",
        prices: ["main-cable", "camera"],
        service: "drains-sewer",
      },
    },
  },
  {
    id: "frozen",
    label: "Frozen pipe",
    hint: "No water on a cold morning",
    start: "split",
    questions: {
      split: {
        q: "Can you see a split, bulge, or water leaking anywhere?",
        options: [
          { label: "Yes", to: "out:burst" },
          { label: "No — just little or no water", to: "out:thaw" },
        ],
      },
    },
    outcomes: {
      burst: {
        urgency: "now",
        title: "Shut off the main before it thaws",
        steps: [
          "Close the main shutoff now — a split pipe floods the moment the ice melts.",
          "Open the faucets to relieve pressure.",
          "Turn the water heater to “Pilot” or “Vacation,” or switch it off at the breaker.",
        ],
        why: "Ice holds a burst pipe closed. The flooding starts when it thaws.",
        prices: ["burst", "thaw", "after-hours"],
        service: "emergency",
      },
      thaw: {
        urgency: "today",
        title: "Thaw it gently, and never with a flame",
        steps: [
          "Open the faucet the frozen pipe feeds so melting water can move.",
          "Warm the pipe with a hair dryer or a space heater at a safe distance, working from the faucet back.",
          "Open cabinet doors on exterior walls. Never use a torch or open flame.",
          "If you can't find the frozen spot, or it's inside a wall, call us.",
        ],
        why: "Most frozen lines thaw without damage if they're warmed slowly. Frozen lines inside exterior walls need us.",
        prices: ["thaw"],
        service: "emergency",
      },
    },
  },
  {
    id: "running",
    label: "Toilet keeps running",
    hint: "Or refills on its own",
    start: "out:running",
    questions: {},
    outcomes: {
      running: {
        urgency: "wait",
        title: "A cheap fix — but it's costing you water",
        steps: [
          "Lift the tank lid. If the flapper is warped or the chain is tangled, that's the likely culprit.",
          "If several toilets refill on their own and your pipes bang, your house pressure may be too high.",
        ],
        why: "A running toilet can waste hundreds of gallons a day. High street pressure (over 80 psi) wears out fill valves across the house.",
        prices: ["toilet", "prv"],
        service: "leaks-fixtures",
      },
    },
  },
  {
    id: "pressure",
    label: "Low water pressure",
    hint: "Whole house or one tap",
    start: "scope",
    questions: {
      scope: {
        q: "Is it the whole house or one fixture?",
        options: [
          { label: "One fixture", to: "out:aerator" },
          { label: "The whole house", to: "out:house" },
        ],
      },
    },
    outcomes: {
      aerator: {
        urgency: "wait",
        title: "Probably a clogged aerator or cartridge",
        steps: [
          "Unscrew the aerator at the tip of the faucet and rinse out the grit.",
          "If it's a shower, soak the head in vinegar overnight.",
        ],
        why: "Sediment collects in the screen at the end of the faucet, especially after street work nearby.",
        prices: ["faucet"],
        service: "leaks-fixtures",
      },
      house: {
        urgency: "wait",
        title: "Book a pressure and supply check",
        steps: [
          "Ask a neighbor if they're seeing the same thing — if so, it may be a utility issue.",
          "Make sure the main shutoff is fully open.",
        ],
        why: "Whole-house low pressure is usually a failing PRV, a partly closed main valve, or corroded galvanized pipe.",
        prices: ["prv", "main-shutoff", "repipe"],
        service: "water-lines",
      },
    },
  },
  {
    id: "sewer-smell",
    label: "Sewer smell",
    hint: "Inside or in the yard",
    start: "where",
    questions: {
      where: {
        q: "Where do you notice it most?",
        options: [
          { label: "Near a floor drain or unused bathroom", to: "out:trap" },
          { label: "Everywhere, or outside in the yard", to: "out:line" },
        ],
      },
    },
    outcomes: {
      trap: {
        urgency: "wait",
        title: "Try refilling the trap first",
        steps: [
          "Pour a gallon of water into the floor drain or run the unused shower for a minute.",
          "If the smell is gone in an hour, the trap had just dried out.",
        ],
        why: "Every drain has a water seal that blocks sewer gas. Unused drains dry out, especially in winter heating season.",
        prices: ["camera"],
        service: "drains-sewer",
      },
      line: {
        urgency: "today",
        title: "Have the line and vents checked",
        steps: [
          "Note whether it's stronger after laundry or showers.",
          "Keep kids and pets away from any soggy spots in the yard.",
        ],
        why: "A constant smell or a soggy patch in the yard can mean a cracked lateral or a broken vent. A camera inspection answers it.",
        prices: ["camera", "spot-repair"],
        service: "drains-sewer",
      },
    },
  },
];

export const symptomById = Object.fromEntries(symptoms.map((s) => [s.id, s])) as Record<
  string,
  Symptom
>;

/** Symptoms shown as chips in the homepage dispatch board. */
export const heroSymptoms = ["no-hot", "backup", "water-out", "frozen", "gas"];
