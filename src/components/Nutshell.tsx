"use client";

import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { OctagonMask } from "./OctagonMask";
import { Reveal } from "./Reveal";
import { AsterFlower, Burst, Mascot, Sparkle } from "./Stickers";
import { SITE, mailto } from "@/lib/site";

const MARKS = [
  <span key="1" className="mark mark--caps">
    LLMs
  </span>,
  <span key="2" className="mark mark--serif">
    <Sparkle className="mark__glyph" fill="var(--butter)" />
    RAG
  </span>,
  <span key="3" className="mark mark--caps">
    AI AGENTS
  </span>,
  <span key="4" className="mark mark--italic">
    Python
  </span>,
  <span key="5" className="mark mark--wide">
    REACT
  </span>,
  <span key="6" className="mark mark--caps">
    <Burst className="mark__glyph" fill="var(--pink)" points={8} />
    OPENAI
  </span>,
  <span key="7" className="mark mark--serif">
    ChromaDB
  </span>,
  <span key="8" className="mark mark--caps mark--tight">
    SPARK
  </span>,
  <span key="9" className="mark mark--italic">
    TypeScript
  </span>,
  <span key="10" className="mark mark--wide">
    NODE.JS
  </span>,
];

const SERVICES = [
  "LLM apps & RAG",
  "AI agents & automation",
  "ML products",
  "Web & app development",
];

export function Nutshell() {
  return (
    <section id="nutshell" className="section nutshell">
      <div className="wrap">
        <Reveal className="nutshell__banner halftone" y={70}>
          <div className="nutshell__portrait">
            <motion.div
              className="nutshell__octa"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <OctagonMask size="100%" stroke={3} background="var(--butter)">
                <div className="nutshell__mascot">
                  <Mascot />
                </div>
              </OctagonMask>
            </motion.div>

            <motion.div
              className="nutshell__sticker nutshell__sticker--a"
              animate={{ y: [0, -14, 0], rotate: [-10, -4, -10] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <Burst fill="var(--bg)" />
              <span className="label">AI</span>
            </motion.div>
            <motion.div
              className="nutshell__sticker nutshell__sticker--b"
              animate={{ y: [0, 12, 0], rotate: [0, 25, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <Sparkle fill="var(--butter)" />
            </motion.div>
            <motion.div
              className="nutshell__sticker nutshell__sticker--c"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <AsterFlower petals={9} petal="var(--bg)" />
            </motion.div>
          </div>

          <div className="nutshell__copy">
            <p className="label eyebrow eyebrow--ink">In a nutshell</p>
            <h2 className="display nutshell__title">
              Part engineer, part team lead, <em>full-time</em> builder of useful AI.
            </h2>
            <p>
              I&apos;m {SITE.person.split(" ")[0]}, Team Leader at 4th Orbit (Bengaluru /
              remote). I previously shipped AI for education and recruitment — interview
              practice, resume tools, candidate matching, and evaluation workflows.
            </p>
            <p>
              B.Tech (Hons.) in Data Science · research internship at IIIT-Naya Raipur on
              Apache Spark schedulers. Happy to take freelance AI projects, plus web and
              app development.
            </p>
            <ul className="chips">
              {SERVICES.map((s, i) => (
                <motion.li
                  key={s}
                  className="chip label"
                  whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
            <div className="nutshell__cta">
              <a className="btn btn--cream" href={mailto("Let's build with AI")}>
                Let&apos;s build with AI <span aria-hidden="true">✦</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="nutshell__ribbon" y={30}>
        <p className="label ribbon__caption">Stack &amp; skills in rotation</p>
        <Marquee items={MARKS} duration={34} label="Technical skills" />
      </Reveal>
    </section>
  );
}
