"use client";

import { useEffect, useState } from "react";

/** Current time, updated every `ms`. Null until mounted so SSR output is stable. */
export function useNow(ms = 30000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client clock starts after hydration
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
