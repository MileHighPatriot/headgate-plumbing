"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export type ForecastDay = { date: string; low: number; high: number };
export type ForecastState =
  | { status: "loading" }
  | { status: "ok"; days: ForecastDay[] }
  | { status: "error" };

const KEY = "hg-forecast-v1";
const TTL = 30 * 60 * 1000;

/** 7-day Denver lows/highs from Open-Meteo (free, no key). Cached 30 min. */
export function useForecast(): ForecastState {
  const [state, setState] = useState<ForecastState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
      if (cached && Date.now() - cached.at < TTL) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from session cache
        setState({ status: "ok", days: cached.days });
        return;
      }
    } catch {}

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${site.geo.lat}&longitude=${site.geo.lon}` +
      "&daily=temperature_2m_min,temperature_2m_max&temperature_unit=fahrenheit&timezone=America%2FDenver&forecast_days=7";
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const d = json.daily;
        const days: ForecastDay[] = d.time.map((date: string, i: number) => ({
          date,
          low: Math.round(d.temperature_2m_min[i]),
          high: Math.round(d.temperature_2m_max[i]),
        }));
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), days }));
        } catch {}
        if (!cancelled) setState({ status: "ok", days });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  return state;
}

export const FREEZE_F = 20;
