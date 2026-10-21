"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Reveal } from "./Reveal";
import { Squiggle } from "./Stickers";
import { EASE } from "@/lib/motion";
import { unsplash } from "@/lib/site";

const ENTRIES = [
  {
    date: "Jul 2026 – Present",
    title: "Team Leader · 4th Orbit",
    tag: "Leadership",
    read: "Remote",
    detail:
      "Managing team tasks, client communication, and delivery across multiple AI product projects.",
    img: "photo-1522071820081-009f0129c71c",
    alt: "Team collaborating in a modern workspace",
  },
  {
    date: "Jul 2025 – Jul 2026",
    title: "AI/ML Engineer · 4th Orbit",
    tag: "AI Products",
    read: "1 yr",
    detail:
      "Gaplytiq & OrbitHyre — LLM features, AI agents, hybrid matching, proctoring, and frontend delivery.",
    img: "photo-1677442136019-21780ecad995",
    alt: "Abstract visualization suggesting artificial intelligence",
  },
  {
    date: "Mar – Jun 2024",
    title: "Research Intern · IIIT-Naya Raipur",
    tag: "Research",
    read: "Spark",
    detail:
      "Performance analysis of Apache Spark job schedulers (FIFO, FAIR, DAG) under varied workloads.",
    img: "photo-1558494949-ef010cbdcc31",
    alt: "Server racks representing big data infrastructure",
  },
  {
    date: "2021 – 2025",
    title: "B.Tech (Hons.) Data Science · CSVTU",
    tag: "Education",
    read: "8.14 CGPA",
    detail:
      "AI, ML, NLP, big data, cloud, and software engineering — foundation for building AI products.",
    img: "photo-1456513080080-67b6c8b1c8f6",
    alt: "Open books and study materials on a desk",
  },
];

export function Experience() {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.5 });

  return (
    <section id="experience" className="section journal">
      <div className="wrap">
        <header className="journal__head">
          <div>
            <Reveal>
              <p className="label eyebrow">Path so far</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display section-title">
                Experience &amp; <em>education</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="journal__intro">
            <p>From Spark research to leading AI product teams — and shipping freelance-ready work.</p>
            <Squiggle className="journal__squig" />
          </Reveal>
        </header>

        <ul
          ref={list}
          className="journal__list"
          onMouseMove={(e) => {
            const r = list.current?.getBoundingClientRect();
            if (!r) return;
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onMouseLeave={() => setActive(null)}
        >
          {ENTRIES.map((en, i) => (
            <motion.li
              key={en.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <div
                className="journal__row"
                role="article"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                <span className="journal__fill" aria-hidden="true" />
                <span className="journal__num label">0{i + 1}</span>
                <span className="journal__title display">
                  {en.title}
                  <span className="experience__detail">{en.detail}</span>
                </span>
                <span className="journal__meta label">
                  <span className="journal__tag">{en.tag}</span>
                  <span>{en.read}</span>
                  <span className="journal__date">{en.date}</span>
                </span>
                <span className="journal__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </motion.li>
          ))}

          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                className="journal__preview"
                style={{ x, y }}
                aria-hidden="true"
              >
                <motion.div
                  className="journal__preview-card"
                  initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: active % 2 ? 5 : -5 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    key={ENTRIES[active].img}
                    src={unsplash(ENTRIES[active].img, 600)}
                    alt=""
                    fill
                    sizes="240px"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
