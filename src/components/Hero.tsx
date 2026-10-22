"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { IntroCard } from "./IntroCard";
import { useContact } from "./ContactModal";
import { AsterFlower, Asterisk, Burst, Squiggle } from "./Stickers";
import { EASE, LOAD_DELAY, POP } from "@/lib/motion";
import { SITE } from "@/lib/site";

const LETTERS = SITE.brand.split("");

function Parallax({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }} aria-hidden="true">
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { openContact } = useContact();
  const ref = useRef<HTMLElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 });
  const my = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const wordRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <section
      ref={ref}
      className="hero halftone halftone--hero"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* floating parallax stickers */}
      <Parallax mx={mx} my={my} depth={-60} className="hero__sticker hero__sticker--flower">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          <AsterFlower />
        </motion.div>
      </Parallax>
      <Parallax mx={mx} my={my} depth={-30} className="hero__sticker hero__sticker--squig">
        <Squiggle />
      </Parallax>

      {/* Fills the empty pocket under the flower */}
      <motion.div
        className="hero__cluster"
        aria-hidden="true"
        initial={{ opacity: 0, y: 24, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ ...POP, delay: LOAD_DELAY + 0.9 }}
      >
        <Squiggle className="hero__cluster-squig" />
        <motion.div
          className="hero__cluster-stack"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="hero__chip label">LLMs</span>
          <span className="hero__chip hero__chip--butter label">RAG</span>
          <span className="hero__chip hero__chip--cream label">Agents</span>
        </motion.div>
      </motion.div>

      {/* Badge lives in the hero, not on the word, so it never covers letters or CTAs */}
      <motion.div
        className="hero__burst"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={{ ...POP, delay: LOAD_DELAY + 0.85 }}
      >
        <motion.div
          animate={{ rotate: [-10, 2, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Burst />
          <span className="hero__burst-text label">
            Open for
            <br />
            projects
          </span>
        </motion.div>
      </motion.div>

      <div className="wrap hero__inner">
        <motion.p
          className="label hero__kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: LOAD_DELAY + 0.1, ease: EASE }}
        >
          <Asterisk className="hero__kicker-star" />
          AI/ML Engineer | LLMs, RAG &amp; Agents
        </motion.p>

        <motion.div className="hero__wordwrap" style={{ y: wordY, rotate: wordRotate }}>
          <h1 className="hero__word display" aria-label={SITE.brand}>
            {LETTERS.map((l, i) => (
              <motion.span
                key={l + i}
                className="hero__letter"
                aria-hidden="true"
                initial={{ opacity: 0, y: "0.7em", rotate: i % 2 ? 14 : -14, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{ ...POP, delay: LOAD_DELAY + 0.15 + i * 0.08 }}
                whileHover={{
                  y: "-0.06em",
                  rotate: i % 2 ? 6 : -6,
                  scale: 1.06,
                  transition: { type: "spring", stiffness: 400, damping: 12 },
                }}
              >
                {l}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <div className="hero__foot">
          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: LOAD_DELAY + 0.6, ease: EASE }}
          >
            I build AI powered products and take on custom web and app development,
            open to freelance projects from idea through delivery.
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: LOAD_DELAY + 0.75, ease: EASE }}
          >
            <a className="btn" href="#work">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => openContact("Start a project, freelance enquiry")}
            >
              Start a project
            </button>
          </motion.div>
        </div>
      </div>

      <IntroCard />
    </section>
  );
}
