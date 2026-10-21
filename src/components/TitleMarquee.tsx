"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const BASE = "Tanisha | Freelance Portfolio";

/** Scrolls the browser tab title right → left. */
export function TitleMarquee() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      document.title = BASE;
      return;
    }

    const spacer = "   ✦   ";
    const loop = `${BASE}${spacer}`;
    let i = 0;

    document.title = loop;

    const id = window.setInterval(() => {
      i = (i + 1) % loop.length;
      document.title = loop.slice(i) + loop.slice(0, i);
    }, 220);

    return () => {
      window.clearInterval(id);
      document.title = BASE;
    };
  }, [reduce]);

  return null;
}
