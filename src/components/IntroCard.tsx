"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OctagonMask } from "./OctagonMask";
import { Mascot, Sparkle } from "./Stickers";
import { LOAD_DELAY, POP } from "@/lib/motion";
import { SITE } from "@/lib/site";

export function IntroCard() {
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px) and (pointer: fine)");
    const sync = () => setCanDrag(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <motion.aside
      className="intro"
      aria-label={`About ${SITE.person}`}
      initial={{ opacity: 0, scale: 0.6, rotate: 12, y: 60 }}
      animate={{ opacity: 1, scale: 1, rotate: 3, y: 0 }}
      transition={{ ...POP, delay: LOAD_DELAY + 0.75 }}
      drag={canDrag}
      dragSnapToOrigin
      dragElastic={0.18}
      whileDrag={{ scale: 1.05, rotate: -2, cursor: "grabbing" }}
      whileHover={canDrag ? { rotate: 0 } : undefined}
    >
      <motion.div
        className="intro__bob"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="intro__tape" aria-hidden="true" />
        <div className="intro__top">
          <OctagonMask size="76px" stroke={2.5} background="var(--butter)">
            <motion.div
              className="intro__mascot"
              animate={{ rotate: [0, 8, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mascot />
            </motion.div>
          </OctagonMask>
          <div>
            <p className="label intro__aka">Aka…</p>
            <h2 className="display intro__name">Tanisha</h2>
          </div>
        </div>
        <p className="intro__bio">
          Hi, I&apos;m <strong>{SITE.person}</strong>. AI/ML engineer and team leader —
          I ship LLM apps, RAG systems, and AI agents that solve real business problems.
          Also open for web &amp; app builds.
        </p>
        <p className="intro__status label">
          <span className="intro__dot" aria-hidden="true" />
          {SITE.availability}
        </p>
        <Sparkle className="intro__sparkle" fill="var(--pink)" />
      </motion.div>
    </motion.aside>
  );
}
