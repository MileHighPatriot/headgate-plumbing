/**
 * Water heater serial number date decoding.
 *
 * - Rheem / Ruud / Richmond: after any letter prefix, digits 1–2 are the month
 *   and 3–4 the year (MMYY), per Rheem's own serial number guide. Some newer
 *   units use week-year (WWYY); a first pair above 12 is read as a week.
 * - A.O. Smith / State / American: since 2008 the first four digits are
 *   year then week (YYWW). Older units used MMYY.
 * - Bradford White: letter 1 is the year on a rotating 20-year cycle (I, O,
 *   Q, R, U, V skipped), letter 2 is the month (A–M, I skipped).
 */
export type Brand = "rheem" | "aosmith" | "bradford";

export const brands: { id: Brand; label: string; example: string; where: string }[] = [
  {
    id: "rheem",
    label: "Rheem / Ruud / Richmond",
    example: "RHLN 0819D12345",
    where: "The four digits after the letters: 08 = August, 19 = 2019.",
  },
  {
    id: "aosmith",
    label: "A.O. Smith / State / American",
    example: "1742A012345",
    where: "The first four digits: 17 = 2017, 42 = week 42.",
  },
  {
    id: "bradford",
    label: "Bradford White",
    example: "SG12345678",
    where: "The first two letters: S = 2018, G = July.",
  },
];

export type Decoded =
  | { ok: true; year: number; month: number; basis: string }
  | { ok: false; reason: string };

const BW_YEARS = "ABCDEFGHJKLMNPSTWXYZ"; // A = 2004 (and 1984, 2024)
const BW_MONTHS = "ABCDEFGHJKLM";

function weekToMonth(year: number, week: number) {
  const d = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  return d.getUTCMonth() + 1;
}

function resolveTwoDigitYear(yy: number, now: Date) {
  const cur = now.getFullYear() % 100;
  return yy <= cur ? 2000 + yy : 1900 + yy;
}

export function decodeSerial(brand: Brand, raw: string, now = new Date()): Decoded {
  const serial = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (serial.length < 6) return { ok: false, reason: "That looks too short. Serial numbers are usually 9–13 characters." };

  if (brand === "bradford") {
    const y = BW_YEARS.indexOf(serial[0]);
    const m = BW_MONTHS.indexOf(serial[1]);
    if (y < 0 || m < 0) {
      return {
        ok: false,
        reason: "Bradford White serials start with two letters (year, then month). Check the first two characters.",
      };
    }
    // Pick the most recent 20-year cycle that isn't in the future.
    let year = 2004 + y;
    while (year + 20 <= now.getFullYear()) year += 20;
    if (year > now.getFullYear() || (year === now.getFullYear() && m + 1 > now.getMonth() + 1)) year -= 20;
    return { ok: true, year, month: m + 1, basis: `“${serial[0]}” = ${year}, “${serial[1]}” = month ${m + 1}` };
  }

  const digits = serial.replace(/^[A-Z]+/, "");
  if (!/^\d{4}/.test(digits)) {
    return { ok: false, reason: "We couldn't find four digits in a row at the start. Double-check the serial on the tank label." };
  }
  const a = Number(digits.slice(0, 2));
  const b = Number(digits.slice(2, 4));

  if (brand === "rheem") {
    if (a >= 1 && a <= 12) {
      const year = resolveTwoDigitYear(b, now);
      return { ok: true, year, month: a, basis: `“${digits.slice(0, 2)}” = month, “${digits.slice(2, 4)}” = year` };
    }
    if (a >= 13 && a <= 53) {
      const year = resolveTwoDigitYear(b, now);
      return {
        ok: true,
        year,
        month: weekToMonth(year, a),
        basis: `“${digits.slice(0, 2)}” = week, “${digits.slice(2, 4)}” = year`,
      };
    }
    return { ok: false, reason: "The first two digits after the letters should be a month (01–12) or week (13–53)." };
  }

  // A.O. Smith family
  const yy = a;
  const cur = now.getFullYear() % 100;
  if (yy >= 8 && yy <= cur && b >= 1 && b <= 53) {
    const year = 2000 + yy;
    return { ok: true, year, month: weekToMonth(year, b), basis: `“${digits.slice(0, 2)}” = year, “${digits.slice(2, 4)}” = week` };
  }
  if (a >= 1 && a <= 12) {
    const year = resolveTwoDigitYear(b, now);
    return { ok: true, year, month: a, basis: `Older format: “${digits.slice(0, 2)}” = month, “${digits.slice(2, 4)}” = year` };
  }
  return { ok: false, reason: "That doesn't match A.O. Smith's year-week format. Check the first four digits." };
}

export function ageInYears(year: number, month: number, now = new Date()) {
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(0, months / 12);
}

/** Typical service life for a tank heater, in years. */
export const TANK_LIFE = { low: 8, high: 12 };
