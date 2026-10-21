"use client";

import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";
import { AsterFlower, Asterisk } from "./Stickers";
import { SITE, mailto } from "@/lib/site";

const WORD = SITE.brand.split("");

const SAYINGS = [
  "Open to freelance AI projects",
  "LLMs · RAG · Agents",
  "Also web & app builds",
  "Say hi — I reply fast",
];

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <Marquee
        className="footer__marquee"
        reverse
        duration={44}
        label="Open to freelance AI projects"
        items={SAYINGS.map((s) => (
          <span key={s} className="footer__saying display">
            {s}
            <Asterisk className="footer__star" />
          </span>
        ))}
      />

      <div className="wrap footer__inner">
        <Reveal className="footer__cta">
          <p className="label eyebrow eyebrow--cream">Got an AI project in mind?</p>
          <a className="footer__mail display" href={mailto("Hello Tanisha")}>
            <span>{SITE.email}</span>
            <span className="footer__mail-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </Reveal>

        <div className="footer__row">
          <Reveal delay={0.1} className="footer__insta">
            <a className="btn btn--cream" href={SITE.github} target="_blank" rel="noreferrer">
              <AsterFlower className="footer__insta-icon" petals={8} />
              GitHub · @tanisshaaa
            </a>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="footer__socials">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a className="footer__social label" href={s.href} target="_blank" rel="noreferrer">
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="footer__big" aria-hidden="true">
          {WORD.map((l, i) => (
            <motion.span
              key={l + i}
              className="footer__letter display"
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: i * 0.07 }}
              whileHover={{ y: "-6%", rotate: i % 2 ? 5 : -5 }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <p className="footer__rights label">
          <span>
            © 2026 {SITE.person} · {SITE.location}
          </span>
          <span>Built with Next.js ✦ Open to freelance</span>
        </p>
      </div>
    </footer>
  );
}
