"use client";

import { useState, useEffect, useCallback } from "react";

export function useHeroSlider(total: number, autoPlayMs = 5000) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const goTo = useCallback((i: number) => setCurrent(i), []);

  useEffect(() => {
    if (total === 0) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [next, total, autoPlayMs]);

  return { current, next, prev, goTo };
}
