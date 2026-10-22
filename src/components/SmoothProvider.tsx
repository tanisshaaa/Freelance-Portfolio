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
import { ContactProvider } from "./ContactModal";
import { Asterisk } from "./Stickers";
import { TitleMarquee } from "./TitleMarquee";
import { EASE, LOAD_DELAY } from "@/lib/motion";

const LETTERS = "TANISHA".split("");

/**
 * Global motion shell:
 *  - respects prefers-reduced-motion
 *  - pink curtain preloader with loading animation
 *  - page content fades up once the curtain leaves
 *  - pink scroll-progress ribbon at the very top
 */
export function SmoothProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [curtain, setCurtain] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 });

  useEffect(() => {
    const t = window.setTimeout(() => setCurtain(false), reduce ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <ContactProvider>
      <TitleMarquee />
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
            transition={{ duration: 0.8, ease: EASE }}
            aria-hidden="true"
            role="status"
            aria-live="polite"
            aria-label="Loading"
          >
            <motion.div
              className="curtain__orb"
              animate={{ scale: [1, 1.12, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Asterisk className="curtain__orb-star" />
            </motion.div>

            <h1 className="curtain__word">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  className="curtain__letter"
                  initial={{ opacity: 0, y: 36, rotate: i % 2 ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <div className="curtain__loader">
              <div className="curtain__track" aria-hidden="true">
                <motion.div
                  className="curtain__fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.35, ease: EASE }}
                />
              </div>
              <p className="curtain__hint label">
                <span>Loading</span>
                <span className="curtain__dots" aria-hidden="true">
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                  >
                    .
                  </motion.span>
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : LOAD_DELAY - 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      </ContactProvider>
    </MotionConfig>
  );
}
