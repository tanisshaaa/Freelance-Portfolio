"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { Burst, Sparkle } from "./Stickers";
import { EASE } from "@/lib/motion";
import { mailto, unsplash } from "@/lib/site";

type Project = {
  slug: string;
  kind: string;
  title: string;
  blurb: string;
  year: string;
  tags: string[];
  img: string;
  alt: string;
  stamp: string;
  place: "a" | "b" | "c";
  href: string;
};

const PROJECTS: Project[] = [
  {
    slug: "retail-gpt",
    kind: "Featured",
    title: "RetailGPT",
    blurb:
      "Full-stack BI platform: Text-to-SQL over 50K retail rows, XGBoost demand forecasting, Isolation Forest anomalies, and a ChromaDB RAG layer for policy-aware chat.",
    year: "2026",
    tags: ["LLMs", "RAG", "React", "Python"],
    img: "photo-1460925895917-afdab827c52f",
    alt: "Laptop showing analytics charts and business intelligence dashboards",
    stamp: "AI + BI",
    place: "a",
    href: "https://github.com/tanisshaaa/RetailGPT",
  },
  {
    slug: "orbithyre",
    kind: "Product",
    title: "OrbitHyre",
    blurb:
      "AI recruitment platform built from scratch — job posting, hybrid resume–JD matching, AI evaluation, and proctoring-enabled assessments for faster screening.",
    year: "2025–26",
    tags: ["AI Agents", "Matching", "Hiring"],
    img: "photo-1521737711867-e3b97375f902",
    alt: "Team collaborating around laptops in a bright office",
    stamp: "Hire",
    place: "b",
    href: mailto("Tell me about OrbitHyre"),
  },
  {
    slug: "predictive-maintenance",
    kind: "ML App",
    title: "Predictive Maintenance",
    blurb:
      "Streamlit app that predicts industrial machinery failures from sensor data so teams can act before downtime hits.",
    year: "2025",
    tags: ["Scikit-learn", "Streamlit", "ML"],
    img: "photo-1581091226825-a6a2a5aee158",
    alt: "Industrial machinery and engineering equipment in a factory setting",
    stamp: "ML",
    place: "c",
    href: "https://github.com/tanisshaaa/Predictive-Maintenance-for-Industrial-Machinery",
  },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const external = p.href.startsWith("http");

  return (
    <motion.article
      className={`work__item work__item--${p.place}`}
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.95, delay: index === 1 ? 0.12 : 0, ease: EASE }}
    >
      <a
        className="work__link"
        href={p.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-label={`${p.title} — ${p.kind}`}
      >
        <div ref={frame} className="work__frame">
          <motion.div
            className="work__media"
            initial={{ clipPath: "inset(14% 14% 14% 14% round 60px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            <motion.div className="work__img" style={{ y: imgY }}>
              <Image
                src={unsplash(p.img)}
                alt={p.alt}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                priority={index === 0}
              />
            </motion.div>
          </motion.div>
          <span className="work__tag label">{p.kind}</span>
          <span className="work__stamp" aria-hidden="true">
            <Burst fill="var(--butter)" points={12} />
            <span className="label">{p.stamp}</span>
          </span>
        </div>

        <div className="work__meta">
          <p className="label work__index">
            0{index + 1} <span>/ {p.year}</span>
          </p>
          <h3 className="work__title display">
            <span className="work__title-text">{p.title}</span>
            <span className="work__arrow" aria-hidden="true">
              ↗
            </span>
          </h3>
          <p className="work__blurb">{p.blurb}</p>
          <ul className="work__tags">
            {p.tags.map((t) => (
              <li key={t} className="label">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.article>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="section work">
      <div className="wrap">
        <header className="work__head">
          <Reveal>
            <p className="label eyebrow">Selected work (03)</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display section-title">
              AI products I&apos;ve <em>shipped</em> — and the ones still cooking.
            </h2>
          </Reveal>
        </header>

        <div className="grid-12 work__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}

          <Reveal className="work__note" delay={0.1} rotate={-6}>
            <Sparkle className="work__note-spark" fill="var(--butter)" />
            <p className="display work__note-title">Also: Gaplytiq</p>
            <p>
              AI interview practice, LLM resume maker, and an agent that reads test-series
              results to surface learning gaps — plus frontend to stitch it together.
            </p>
            <a className="btn btn--sm" href={mailto("Ask about Gaplytiq & OrbitHyre")}>
              Ask about client work
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
