/**
 * Single edit point for business details. Headgate is a fictional company
 * built as a portfolio concept — the phone uses the 555-01xx fiction range and
 * license numbers are samples in the real Colorado format. The street is made up
 * too (no ZIP), so the site never points at a real building.
 */
export const site = {
  name: "Headgate Plumbing & Drain",
  shortName: "Headgate",
  url: "https://headgate.5280webs.com",
  description:
    "Denver-metro plumbing for homes and commercial buildings. Upfront price ranges, 2-hour arrival windows, and a live person on the emergency line 24/7.",
  locale: "en_US",
  founded: 2009,
  phone: "(303) 555-0142",
  phoneHref: "tel:+13035550142",
  text: "(303) 555-0187",
  textHref: "sms:+13035550187",
  email: "dispatch@headgate.example",
  address: {
    street: "400 Example Gulch Way",
    city: "Denver",
    region: "CO",
  },
  geo: { lat: 39.7392, lon: -104.9903 },
  hours: {
    office: "Mon–Sat, 7am–7pm",
    emergency: "24/7, answered by a person",
  },
  licenses: [
    { label: "Plumbing contractor", value: "#000000 (sample)" },
    { label: "Master plumber", value: "#000000 (sample)" },
    { label: "Certified backflow tester", value: "ASSE 5110 (sample)" },
  ],
  xcelGasEmergency: "1-800-895-2999",
  xcelGasEmergencyHref: "tel:+18008952999",
  dispatchFee: 89,
  afterHoursFee: 149,
  warrantyYears: 2,
};

export type Site = typeof site;
