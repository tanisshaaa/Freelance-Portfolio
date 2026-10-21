"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Asterisk } from "./Stickers";
import { EASE, LOAD_DELAY } from "@/lib/motion";

/**
 * Global motion shell:
 *  - respects prefers-reduced-motion
 *  - pink curtain preloader that lifts to reveal the page
 *  - page content fades up once the curtain leaves
 *  - pink scroll-progress ribbon at the very top
 */
export function SmoothProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [curtain, setCurtain] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 });

  useEffect(() => {
    const t = window.setTimeout(() => setCurtain(false), reduce ? 0 : 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {curtain && !reduce && (
          <motion.div
            className="curtain"
            initial={{ y: 0 }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.75, ease: EASE }}
            aria-hidden="true"
          >
            <motion.div
              className="curtain__word"
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Asterisk className="curtain__star" />
              <span>TANISHA</span>
            </motion.div>
            <span className="curtain__hint label">Loading something smart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : LOAD_DELAY - 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
