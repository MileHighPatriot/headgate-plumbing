/**
 * Segments for the "Whose pipe is it?" cutaway. Ownership follows Denver
 * Water's published homeowner-responsibility rules and Denver's sewer lateral
 * rules; other utilities in the metro differ in the details.
 */
export type Owner = "you" | "utility" | "city";

export type PipeSegment = {
  id: string;
  name: string;
  owner: Owner;
  what: string;
  fails: string[];
  fix: string;
  prices: string[];
};

export const ownerCopy: Record<Owner, { label: string; short: string }> = {
  you: { label: "Property owner", short: "Yours" },
  utility: { label: "Denver Water", short: "Utility" },
  city: { label: "City of Denver", short: "City" },
};

export const pipeSegments: PipeSegment[] = [
  {
    id: "water-main",
    name: "Water main",
    owner: "utility",
    what: "The large pipe under the street that feeds every house on the block.",
    fails: ["Main breaks (you'll see water in the street)", "Low pressure for the whole block"],
    fix: "Call Denver Water. They maintain and replace mains across their service area.",
    prices: [],
  },
  {
    id: "curb-stop",
    name: "Curb stop (stop-and-waste valve)",
    owner: "you",
    what: "A valve near the property line, reached through a small stop box with a special key. It shuts water off to the whole property.",
    fails: ["Seized valve that won't close", "Buried or damaged stop box"],
    fix: "Denver Water may operate it for you, but maintaining the stop box and valve is the owner's job.",
    prices: ["service-line"],
  },
  {
    id: "meter-pit",
    name: "Meter & meter pit",
    owner: "you",
    what: "Outdoor meters sit in a pit with a lid near the sidewalk. The meter, the setting and the pit belong to the property; Denver Water repairs the meter itself when it wears out.",
    fails: ["Frozen meter or setting in a cold snap", "Cracked lid or pit", "Leaks at the meter couplings"],
    fix: "Keep the lid on and clear (never put anything on it) and protect it from freezing.",
    prices: ["thaw", "leak-find"],
  },
  {
    id: "service-line",
    name: "Water service line",
    owner: "you",
    what: "The pipe that carries water from the street to your house. Older homes may have lead or galvanized steel; newer ones copper or plastic.",
    fails: ["Leaks that surface as a soggy spot in the yard", "Low pressure from corroded galvanized pipe", "Lead pipe in pre-1951 homes"],
    fix: "Replacement from the curb stop to the house, trenchless where the soil allows. Lead lines may qualify for Denver Water's free replacement program.",
    prices: ["service-line"],
  },
  {
    id: "house",
    name: "House plumbing",
    owner: "you",
    what: "Everything past the main shutoff inside the house: supply lines, water heater, fixtures, drains and vents.",
    fails: ["Burst pipes on exterior walls", "Water heater failures", "Leaking fixtures and valves"],
    fix: "This is most of what we do day to day. See the services pages.",
    prices: ["burst", "wh-tank", "leak-find"],
  },
  {
    id: "sewer-lateral",
    name: "Sewer lateral",
    owner: "you",
    what: "The drain pipe from your house to the city sewer main, including the part under the sidewalk and street.",
    fails: ["Roots in clay pipe joints", "Sags or offsets from expansive soil", "Collapsed Orangeburg (fiber) pipe"],
    fix: "Camera it, clear it, then spot-repair or line it. In Denver the owner is responsible all the way to the main.",
    prices: ["camera", "main-cable", "spot-repair", "lining"],
  },
  {
    id: "sewer-main",
    name: "Sewer main",
    owner: "city",
    what: "The public sewer under the street that your lateral connects to.",
    fails: ["Backups that affect several neighbors at once"],
    fix: "Report it to Denver's 311. If neighbors are backing up too, it may be the main, not your line.",
    prices: [],
  },
];

export const pipeSources = [
  {
    label: "Denver Water: homeowner responsibility",
    url: "https://www.denverwater.org/residential/services-and-information/homeowner-responsibility",
  },
  {
    label: "Denver Water: Lead Reduction Program",
    url: "https://www.denverwater.org/your-water/water-quality/lead/what-is-lead-reduction-program",
  },
  {
    label: "Denver Water: lead service line address lookup",
    url: "https://experience.arcgis.com/experience/26531bf694514f75806ab04f2d236647/",
  },
];
