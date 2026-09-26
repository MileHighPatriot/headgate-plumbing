/**
 * Service area by city with the ZIP codes we cover. "core" cities get
 * same-day windows; "edge" cities get next-day windows plus emergencies.
 */
export type Area = {
  city: string;
  zips: string[];
  zone: "core" | "edge";
};

export const areas: Area[] = [
  {
    city: "Denver",
    zone: "core",
    zips: [
      "80202", "80203", "80204", "80205", "80206", "80207", "80209", "80210",
      "80211", "80212", "80216", "80218", "80219", "80220", "80222", "80223",
      "80224", "80230", "80231", "80236", "80237", "80238", "80239", "80246",
      "80247", "80249",
    ],
  },
  { city: "Aurora", zone: "core", zips: ["80010", "80011", "80012", "80013", "80014", "80017", "80018", "80019", "80045"] },
  { city: "Lakewood", zone: "core", zips: ["80214", "80215", "80226", "80227", "80228", "80232", "80235"] },
  { city: "Englewood", zone: "core", zips: ["80110", "80113"] },
  { city: "Wheat Ridge", zone: "core", zips: ["80033"] },
  { city: "Edgewater", zone: "core", zips: ["80214"] },
  { city: "Glendale", zone: "core", zips: ["80246"] },
  { city: "Arvada", zone: "core", zips: ["80002", "80003", "80004", "80005", "80007"] },
  { city: "Commerce City", zone: "core", zips: ["80022", "80640"] },
  { city: "Littleton", zone: "core", zips: ["80120", "80121", "80122", "80123", "80127", "80128"] },
  { city: "Centennial", zone: "core", zips: ["80015", "80016", "80112"] },
  { city: "Greenwood Village", zone: "core", zips: ["80111"] },
  { city: "Westminster", zone: "core", zips: ["80030", "80031", "80234"] },
  { city: "Thornton", zone: "core", zips: ["80229", "80233", "80241", "80260", "80602"] },
  { city: "Northglenn", zone: "core", zips: ["80233", "80260"] },
  { city: "Golden", zone: "edge", zips: ["80401", "80403"] },
  { city: "Broomfield", zone: "edge", zips: ["80020", "80021", "80023"] },
  { city: "Highlands Ranch", zone: "edge", zips: ["80126", "80129", "80130"] },
  { city: "Lone Tree", zone: "edge", zips: ["80124"] },
  { city: "Parker", zone: "edge", zips: ["80134", "80138"] },
];

export const zoneCopy = {
  core: "Same-day arrival windows when booked before noon, and emergencies around the clock.",
  edge: "Next-day arrival windows, and emergencies around the clock.",
};
