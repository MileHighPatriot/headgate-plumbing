/**
 * Sample price ranges for the concept. Ranges were set against published
 * Denver-area averages (e.g. ~$1.9k average tank water heater install, ~$300
 * cable drain clearing) and are illustrative, not quotes.
 */
export type PriceCategory =
  | "Drains & sewer"
  | "Water heaters"
  | "Water lines"
  | "Leaks & fixtures"
  | "Gas"
  | "Emergency & winter"
  | "Commercial";

export type PriceItem = {
  id: string;
  name: string;
  category: PriceCategory;
  low: number;
  high?: number;
  unit?: string;
  commercial?: boolean;
  note: string;
};

export const priceItems: PriceItem[] = [
  // Drains & sewer
  {
    id: "clog-fixture",
    name: "Clear one sink, tub or toilet clog",
    category: "Drains & sewer",
    low: 179,
    high: 299,
    note: "Hand cable from the fixture. Higher if we have to pull the toilet.",
  },
  {
    id: "main-cable",
    name: "Clear the main sewer line (cable)",
    category: "Drains & sewer",
    low: 249,
    high: 449,
    note: "From an accessible cleanout. No cleanout means going through a toilet or roof vent.",
  },
  {
    id: "hydro-jet",
    name: "Hydro-jet the main line",
    category: "Drains & sewer",
    low: 495,
    high: 895,
    note: "For grease and root regrowth. We scope first to make sure the pipe can take it.",
  },
  {
    id: "camera",
    name: "Sewer camera inspection, with video",
    category: "Drains & sewer",
    low: 199,
    high: 349,
    note: "You get the recording and a marked-up footage map. $0 if we're already clearing the line.",
  },
  {
    id: "spot-repair",
    name: "Sewer spot repair (excavate one section)",
    category: "Drains & sewer",
    low: 2800,
    high: 6500,
    note: "Depth, concrete, and street-cut permits move this the most.",
  },
  {
    id: "lining",
    name: "Trenchless sewer lining (CIPP), full lateral",
    category: "Drains & sewer",
    low: 7500,
    high: 18000,
    note: "Priced by length and diameter. Avoids tearing up the yard and driveway.",
  },
  // Water heaters
  {
    id: "wh-flush",
    name: "Water heater flush & safety check",
    category: "Water heaters",
    low: 149,
    high: 199,
    note: "Flush, anode check, T&P valve test, venting and draft check.",
  },
  {
    id: "wh-repair",
    name: "Water heater repair (thermocouple, valve, element)",
    category: "Water heaters",
    low: 189,
    high: 450,
    note: "Most repairs are done on the first visit from parts on the truck.",
  },
  {
    id: "wh-tank",
    name: "Replace 40–50 gal gas tank water heater",
    category: "Water heaters",
    low: 1850,
    high: 3200,
    note: "Includes permit, haul-away, expansion tank and code updates. Altitude-rated unit.",
  },
  {
    id: "wh-tankless",
    name: "Install a tankless water heater",
    category: "Water heaters",
    low: 3800,
    high: 6500,
    note: "Gas line size and venting route decide where in this range you land.",
  },
  // Water lines
  {
    id: "prv",
    name: "Replace pressure-reducing valve (PRV)",
    category: "Water lines",
    low: 450,
    high: 850,
    note: "Fixes banging pipes and running toilets caused by high street pressure.",
  },
  {
    id: "main-shutoff",
    name: "Replace main shutoff valve",
    category: "Water lines",
    low: 395,
    high: 850,
    note: "Swap an old gate valve for a quarter-turn ball valve you can actually close.",
  },
  {
    id: "service-line",
    name: "Replace water service line (curb stop to house)",
    category: "Water lines",
    low: 4500,
    high: 9500,
    note: "Trenchless pull where soil allows. Lead lines may qualify for Denver Water's free program.",
  },
  {
    id: "repipe",
    name: "Whole-house repipe (PEX)",
    category: "Water lines",
    low: 6500,
    high: 14000,
    note: "For galvanized or polybutylene. Price depends on bathrooms and drywall access.",
  },
  // Leaks & fixtures
  {
    id: "leak-find",
    name: "Leak detection",
    category: "Leaks & fixtures",
    low: 249,
    high: 495,
    note: "Pressure test, thermal camera and acoustic listening before we open a wall.",
  },
  {
    id: "faucet",
    name: "Replace a faucet",
    category: "Leaks & fixtures",
    low: 225,
    high: 450,
    note: "Labor with your fixture or ours. Includes new supply lines.",
  },
  {
    id: "toilet",
    name: "Rebuild or replace a toilet",
    category: "Leaks & fixtures",
    low: 189,
    high: 795,
    note: "Rebuild low end, new install high end.",
  },
  {
    id: "disposal",
    name: "Replace garbage disposal",
    category: "Leaks & fixtures",
    low: 325,
    high: 595,
    note: "Unit included at the high end.",
  },
  {
    id: "sump",
    name: "Replace sump pump",
    category: "Leaks & fixtures",
    low: 495,
    high: 1100,
    note: "Add a battery backup for about $450 more.",
  },
  // Gas
  {
    id: "gas-test",
    name: "Gas leak test",
    category: "Gas",
    low: 149,
    note: "After Xcel has made the house safe. Pressure test and fitting-by-fitting check.",
  },
  {
    id: "gas-run",
    name: "New gas line to an appliance",
    category: "Gas",
    low: 395,
    high: 1200,
    note: "Range, dryer, grill or fire pit. Permit and inspection included.",
  },
  // Emergency & winter
  {
    id: "thaw",
    name: "Thaw a frozen pipe",
    category: "Emergency & winter",
    low: 199,
    high: 450,
    note: "Safe heat only. We check for splits before the water comes back on.",
  },
  {
    id: "burst",
    name: "Repair a burst pipe",
    category: "Emergency & winter",
    low: 295,
    high: 950,
    note: "Accessible pipe at the low end. Walls and ceilings add time.",
  },
  {
    id: "after-hours",
    name: "After-hours dispatch",
    category: "Emergency & winter",
    low: 149,
    note: "Added to nights, Sundays and holidays. Waived for Care Plan members. Quoted before we roll.",
  },
  // Commercial
  {
    id: "backflow-test",
    name: "Backflow test, per assembly",
    category: "Commercial",
    low: 95,
    high: 150,
    commercial: true,
    note: "We file the report with your water provider for you. Each additional device on site costs less.",
  },
  {
    id: "backflow-res",
    name: "Sprinkler backflow test (homes)",
    category: "Commercial",
    low: 85,
    high: 125,
    note: "Annual test for irrigation assemblies. Filed with the utility.",
  },
  {
    id: "grease",
    name: "Grease interceptor / line jetting",
    category: "Commercial",
    low: 395,
    high: 950,
    commercial: true,
    note: "Kitchen lines jetted on a schedule so they don't back up at service.",
  },
  {
    id: "commercial-wh",
    name: "Commercial water heater replacement",
    category: "Commercial",
    low: 4500,
    high: 12000,
    commercial: true,
    note: "Sized to recovery demand. Scheduled after hours to keep you open.",
  },
];

export const priceById = Object.fromEntries(priceItems.map((p) => [p.id, p])) as Record<
  string,
  PriceItem
>;

export function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export function priceRange(p: PriceItem) {
  const base = p.high ? `${money(p.low)}–${money(p.high)}` : money(p.low);
  return p.unit ? `${base} ${p.unit}` : base;
}

export const priceCategories: PriceCategory[] = [
  "Drains & sewer",
  "Water heaters",
  "Water lines",
  "Leaks & fixtures",
  "Gas",
  "Emergency & winter",
  "Commercial",
];
