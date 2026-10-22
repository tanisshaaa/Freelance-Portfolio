"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useContact } from "./ContactModal";
import { EASE } from "@/lib/motion";
import { MaintenanceArt, RetailGPTArt } from "./ProjectArt";

type Project = {
  slug: string;
  kind: string;
  title: string;
  blurb: string;
  year: string;
  tags: string[];
  art: ReactNode;
  place: "a" | "b";
  href: string;
};

const PROJECTS: Project[] = [
  {
    slug: "retail-gpt",
    kind: "AI × BI",
    title: "RetailGPT",
    blurb:
      "Autonomous AI business analyst for D2C and retail — reads Shopify and Stripe data to catch anomalies, forecast demand, auto-pilot stock reordering, and flag payment-gateway exploits.",
    year: "2026",
    tags: ["OpenAI", "XGBoost", "React", "Python"],
    art: <RetailGPTArt />,
    place: "a",
    href: "https://retail-gpt.vercel.app/",
  },
  {
    slug: "predictive-maintenance",
    kind: "ML App",
    title: "Predictive Maintenance",
    blurb:
      "Streamlit app that predicts industrial machinery failures from sensor data so teams can act before downtime hits.",
    year: "2025",
    tags: ["Scikit-learn", "Streamlit", "ML"],
    art: <MaintenanceArt />,
    place: "b",
    href: "https://github.com/tanisshaaa/Predictive-Maintenance-for-Industrial-Machinery",
  },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
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
        aria-label={`${p.title}, ${p.kind}`}
      >
        <div className="work__frame">
          <motion.div
            className="work__media"
            initial={{ clipPath: "inset(14% 14% 14% 14% round 60px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            <div className="work__img">{p.art}</div>
          </motion.div>
          <span className="work__tag label">{p.kind}</span>
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
  const { openContact } = useContact();

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <header className="work__head">
          <Reveal>
            <p className="label eyebrow">Selected work (02)</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display section-title">
              AI products I&apos;ve <em>shipped</em>, and the ones still cooking.
            </h2>
          </Reveal>
        </header>

        <div className="work__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}

          <Reveal className="work__note" delay={0.1} rotate={-0.4}>
            <div className="work__note-copy">
              <p className="display work__note-title">Want something custom?</p>
              <p>
                Freelance AI builds (LLMs, RAG, agents) plus custom web and app development.
                Tell me what you need and I&apos;ll shape the delivery.
              </p>
            </div>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => openContact("Start a project, freelance enquiry")}
            >
              Start a project
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
