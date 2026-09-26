/**
 * Arrival-window math for the dispatch board and booking page. Everything runs
 * in Denver time regardless of the visitor's clock. "Taken" windows are a
 * stable pseudo-random pattern per day so the demo looks lived-in.
 */
export const WINDOWS = [7, 9, 11, 13, 15, 17]; // start hours, 2-hour windows
const OPEN_DAYS = [1, 2, 3, 4, 5, 6]; // Mon–Sat
const LEAD_MINUTES = 90;

export type Slot = {
  key: string;
  date: { y: number; m: number; d: number; dow: number };
  start: number;
  taken: boolean;
  past: boolean;
};

export function denverNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    y: Number(get("year")),
    m: Number(get("month")),
    d: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    dow: dows.indexOf(get("weekday")),
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function addDays(y: number, m: number, d: number, n: number) {
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), dow: dt.getUTCDay() };
}

export function upcomingDays(count: number, now = new Date()) {
  const t = denverNow(now);
  const days: { y: number; m: number; d: number; dow: number; slots: Slot[] }[] = [];
  for (let i = 0; days.length < count && i < 14; i++) {
    const day = addDays(t.y, t.m, t.d, i);
    if (!OPEN_DAYS.includes(day.dow)) continue;
    const slots = WINDOWS.map((start) => {
      const key = `${day.y}-${day.m}-${day.d}-${start}`;
      const past = i === 0 && start * 60 < t.hour * 60 + t.minute + LEAD_MINUTES;
      // Earlier days are busier: ~45% taken today, ~15% four days out.
      const busy = Math.max(0.15, 0.45 - days.length * 0.08);
      const taken = !past && (hash(key) % 100) / 100 < busy;
      return { key, date: day, start, taken, past };
    });
    days.push({ ...day, slots });
  }
  return days;
}

export function nextOpenSlot(now = new Date()) {
  for (const day of upcomingDays(5, now)) {
    const slot = day.slots.find((s) => !s.taken && !s.past);
    if (slot) return slot;
  }
  return null;
}

export function hourLabel(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${suffix}`;
}

export function windowLabel(start: number) {
  return `${hourLabel(start)}–${hourLabel(start + 2)}`;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dayLabel(date: { y: number; m: number; d: number; dow: number }, now = new Date()) {
  const t = denverNow(now);
  const today = addDays(t.y, t.m, t.d, 0);
  const tomorrow = addDays(t.y, t.m, t.d, 1);
  if (date.y === today.y && date.m === today.m && date.d === today.d) return "Today";
  if (date.y === tomorrow.y && date.m === tomorrow.m && date.d === tomorrow.d) return "Tomorrow";
  return DAY_NAMES[date.dow];
}

export function shortDate(date: { m: number; d: number }) {
  return `${MONTHS[date.m - 1]} ${date.d}`;
}

export function isOfficeOpen(now = new Date()) {
  const t = denverNow(now);
  return OPEN_DAYS.includes(t.dow) && t.hour >= 7 && t.hour < 19;
}
