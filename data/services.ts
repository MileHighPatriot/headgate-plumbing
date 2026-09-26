export type Service = {
  slug: string;
  name: string;
  short: string;
  photo: string;
  photoAlt: string;
  lede: string;
  signs: string[];
  work: { title: string; body: string }[];
  colorado: { title: string; body: string };
  prices: string[];
  questions: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "drains-sewer",
    name: "Drains & sewer",
    short: "Clogs, main line backups, camera inspections, and trenchless sewer repair.",
    photo: "pvc",
    photoAlt: "Stacked green PVC drainage pipe, seen end-on",
    lede: "One slow sink is a clog. Every drain gurgling at once is your main line — and in older Denver neighborhoods, that usually means roots in clay pipe.",
    signs: [
      "Water comes up in the basement floor drain when the washer drains",
      "Toilets gurgle or bubble when a sink runs",
      "More than one fixture is slow at the same time",
      "A sewer smell outside near the cleanout",
    ],
    work: [
      {
        title: "Clear it",
        body: "Cable from the fixture or cleanout for everyday clogs. Hydro-jetting when grease or roots keep coming back.",
      },
      {
        title: "See it",
        body: "Every main line clearing ends with a camera pass. You get the video and a footage map showing where the problem is and how deep.",
      },
      {
        title: "Fix it",
        body: "Spot repairs where one joint has failed. Trenchless lining when the whole lateral is tired and the yard, driveway or tree is worth saving.",
      },
    ],
    colorado: {
      title: "In Denver, the sewer line is yours to the street",
      body: "The property owner is responsible for the sewer lateral all the way to the city main — including the part under the sidewalk and street. Homes built before the 1970s usually have clay, cast iron or Orangeburg pipe, and our expansive clay soils shift joints enough to let roots in.",
    },
    prices: ["clog-fixture", "main-cable", "hydro-jet", "camera", "spot-repair", "lining"],
    questions: [
      {
        q: "Should I pour chemical drain cleaner in first?",
        a: "Please don't. It rarely clears a main line, it can damage older pipe, and it's dangerous for whoever opens the line next — including you.",
      },
      {
        q: "Do I need a camera inspection before buying a house?",
        a: "In any Denver home built before about 1980, yes. It's a few hundred dollars against a repair that can run five figures, and it's leverage in the negotiation.",
      },
      {
        q: "Will you dig up my whole yard?",
        a: "Usually not. Most laterals can be lined or burst from one or two small access pits.",
      },
    ],
  },
  {
    slug: "water-heaters",
    name: "Water heaters",
    short: "Repair, replacement and tankless installs — altitude-rated and permitted.",
    photo: "tank-valves",
    photoAlt: "Steel tank with two valves and copper supply lines",
    lede: "Most tank water heaters give you 8 to 12 years. If yours is past that and making noise or weeping at the base, we'd rather replace it on a Tuesday than after it floods the basement on a Saturday.",
    signs: [
      "Water around the base of the tank",
      "Rumbling or popping when it heats",
      "Rusty or smelly hot water",
      "Hot water runs out faster than it used to",
    ],
    work: [
      {
        title: "Repair",
        body: "Thermocouples, gas valves, elements, T&P valves and dip tubes. We carry the common parts for the brands sold in Colorado.",
      },
      {
        title: "Replace",
        body: "Same-day tank swaps in most cases. Permit, haul-away, expansion tank and code updates are in the price, not added after.",
      },
      {
        title: "Go tankless",
        body: "We size the gas line and venting first. If your house can't support a tankless without a big gas upgrade, we'll tell you before you buy one.",
      },
    ],
    colorado: {
      title: "Altitude changes the gas math",
      body: "At 5,280 feet there's less oxygen for combustion, so fuel gas codes require gas appliances to be derated for elevation — or the utility supplies gas that already accounts for it. We install units rated for our altitude and set them up to match.",
    },
    prices: ["wh-flush", "wh-repair", "wh-tank", "wh-tankless"],
    questions: [
      {
        q: "How do I know how old my water heater is?",
        a: "The date is hidden in the serial number on the label. Our water heater age tool decodes Rheem, A.O. Smith and Bradford White serials for you.",
      },
      {
        q: "Is tankless worth it?",
        a: "For a family that runs out of hot water, often yes. For two people in a house with a 3/4\" gas line, maybe not. We'll show you the gas load math before recommending it.",
      },
      {
        q: "Should I flush my tank every year?",
        a: "Yes — sediment is what makes tanks rumble and fail early. It's included in the Care Plan visit.",
      },
    ],
  },
  {
    slug: "water-lines",
    name: "Water lines & repiping",
    short: "Service lines, main shutoffs, PRVs, and repiping galvanized or polybutylene homes.",
    photo: "white-pipes",
    photoAlt: "White-painted supply pipes and fittings running along a ceiling",
    lede: "The pipe that brings water into your house is yours, not the utility's. So is the valve that shuts it off — and in a lot of older homes, nobody has turned it in twenty years.",
    signs: [
      "Low pressure throughout the house",
      "Banging pipes or a toilet that refills on its own",
      "Rusty water from the cold tap",
      "Gray plastic pipe stamped “PB” (polybutylene)",
    ],
    work: [
      {
        title: "Shutoffs & PRVs",
        body: "Quarter-turn main shutoffs you can close in an emergency, and pressure-reducing valves that keep street pressure from wearing out everything downstream.",
      },
      {
        title: "Service lines",
        body: "Replacement from the curb stop to the house, trenchless where the soil allows. We'll check whether yours is lead first — it may qualify for free replacement.",
      },
      {
        title: "Repiping",
        body: "Galvanized steel (common before 1960) and polybutylene (1978–1995) replaced with PEX, room by room, with drywall patched before we leave.",
      },
    ],
    colorado: {
      title: "Denver Water replaces lead service lines at no direct cost",
      body: "Denver Water estimates tens of thousands of older homes — mostly built before 1951 — may still have lead service lines. Its Lead Reduction Program replaces them with copper at no direct cost to the homeowner. Check your address on Denver Water's map before paying anyone, us included, to replace a lead line.",
    },
    prices: ["prv", "main-shutoff", "service-line", "repipe"],
    questions: [
      {
        q: "Where's my main shutoff?",
        a: "Usually where the water line comes through the basement or crawlspace wall on the street side of the house. Some homes also have a curb stop in the meter pit near the sidewalk — that one needs a key.",
      },
      {
        q: "What pressure should my house be at?",
        a: "Most fixtures are happiest between 50 and 70 psi. Above 80 psi, code calls for a pressure-reducing valve.",
      },
    ],
  },
  {
    slug: "leaks-fixtures",
    name: "Leaks & fixtures",
    short: "Leak detection, faucets, toilets, disposals and sump pumps.",
    photo: "bath-sink",
    photoAlt: "A modern bathroom sink and faucet against dark tile",
    lede: "A stain on the ceiling is a question, not an answer. We find the leak with pressure tests, thermal imaging and listening gear before anyone cuts a hole.",
    signs: [
      "A water bill that jumped with no change in use",
      "A ceiling stain under a bathroom",
      "A toilet that runs or refills on its own",
      "A sump pump that cycles constantly or not at all",
    ],
    work: [
      {
        title: "Find the leak",
        body: "Pressure-test the system, isolate the zone, then pinpoint with a thermal camera and acoustic listening. One small, exact opening.",
      },
      {
        title: "Fixtures",
        body: "Faucets, toilets, disposals, shower valves and hose bibs. Your fixture or ours — we'll install either and warranty our labor.",
      },
      {
        title: "Sump pumps",
        body: "Replacements, check valves and battery backups for basements that take on water during spring melt and summer storms.",
      },
    ],
    colorado: {
      title: "Hose bibs are the #1 spring leak we find",
      body: "A frost-free hose bib only works if the hose comes off before the first freeze. Leave it on and the pipe splits inside the wall — and you won't know until you turn it on in April.",
    },
    prices: ["leak-find", "faucet", "toilet", "disposal", "sump"],
    questions: [
      {
        q: "Can I use my own fixtures?",
        a: "Yes. We'll warranty our labor; the manufacturer warranties the part.",
      },
      {
        q: "How do I check for a hidden leak?",
        a: "Turn off every fixture and look at the small triangle or dial on your water meter. If it's moving, water is going somewhere.",
      },
    ],
  },
  {
    slug: "gas-lines",
    name: "Gas lines",
    short: "Leak testing and new lines for ranges, dryers, grills and fire pits.",
    photo: "handwheel",
    photoAlt: "A red valve handwheel on dark piping",
    lede: "If you smell gas right now, leave the house and call Xcel Energy first. Once the utility has made it safe, we find and fix the leak and pressure-test the system before anything relights.",
    signs: [
      "A rotten-egg smell near an appliance or meter",
      "A hissing sound near a gas line",
      "A new range, dryer or grill that needs a line",
      "A failed gas test during a home sale",
    ],
    work: [
      {
        title: "Leak repair",
        body: "Fitting-by-fitting leak checks, repairs and a full pressure test, with the results written up for your records or the buyer's inspector.",
      },
      {
        title: "New lines",
        body: "Black iron or CSST sized to the full load of the house, not just the new appliance. Permitted and inspected.",
      },
      {
        title: "Outdoor",
        body: "Grills, fire pits and patio heaters — trenched, bonded and pressure-tested.",
      },
    ],
    colorado: {
      title: "Xcel first, then us",
      body: "Xcel Energy's gas emergency line is the right first call for any gas smell — they respond around the clock at no charge. Call them from outside, away from the house. We handle everything on your side of the meter after that.",
    },
    prices: ["gas-test", "gas-run"],
    questions: [
      {
        q: "Can I add a gas range where I have an electric one?",
        a: "Usually. The question is whether your existing line can carry the extra load. We'll do the math on the whole house before running anything.",
      },
    ],
  },
  {
    slug: "emergency",
    name: "Emergency & frozen pipes",
    short: "24/7 burst pipes, backups, and no-water calls — answered by a person.",
    photo: "burst",
    photoAlt: "Hands in a red jacket working on a pipe fitting in spraying water",
    lede: "Call any time, day or night. A person answers — not a menu — and talks you through shutting the water off while a plumber heads your way.",
    signs: [
      "Water spraying, pouring or coming through a ceiling",
      "No water anywhere in the house on a cold morning",
      "Sewage coming up through a floor drain",
      "Water heater leaking steadily",
    ],
    work: [
      {
        title: "Stop the water",
        body: "Our dispatcher walks you through finding the main shutoff and turning off the water heater while the truck is on the way.",
      },
      {
        title: "Make it safe",
        body: "Burst pipes repaired, backups cleared, and frozen lines thawed with safe heat — then checked for splits before the water comes back on.",
      },
      {
        title: "Paper trail",
        body: "Photos, a written cause, and an itemized invoice you can send straight to your insurance adjuster.",
      },
    ],
    colorado: {
      title: "Most frozen pipes happen on the first hard night",
      body: "Denver Water's advice: know where your shutoff is, insulate pipes on exterior walls, open sink cabinets on cold nights, drip the faucet farthest from where water enters, and keep the heat at 65°F or higher when you're away.",
    },
    prices: ["thaw", "burst", "after-hours"],
    questions: [
      {
        q: "Do you charge more at night?",
        a: "Yes — a flat after-hours dispatch fee, quoted on the phone before we roll. Care Plan members don't pay it.",
      },
      {
        q: "Should I use a torch on a frozen pipe?",
        a: "Never. Use a hair dryer or space heater at a safe distance, open the faucet, and work from the faucet back toward the frozen spot.",
      },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<
  string,
  Service
>;
