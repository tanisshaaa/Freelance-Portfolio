"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { EASE } from "@/lib/motion";

const SERVICES = [
  {
    num: "01",
    title: "AI Powered Applications",
    items: [
      "Integrating LLMs and OpenAI APIs",
      "Building AI chatbots and document based question answering systems",
      "Adding AI features to existing applications",
    ],
  },
  {
    num: "02",
    title: "AI Agents & Workflow Automation",
    items: [
      "Automating repetitive business workflows",
      "Building AI powered assistants for specific tasks",
      "Connecting APIs and applications to reduce manual work",
    ],
  },
  {
    num: "03",
    title: "Custom Software Development",
    items: [
      "Developing web applications",
      "Building MVPs for startups",
      "Adding features to existing products",
    ],
  },
  {
    num: "04",
    title: "Data Analytics & Business Intelligence",
    items: [
      "Building interactive dashboards",
      "Creating data analysis applications",
      "Implementing forecasting and anomaly detection features",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <header className="services__head">
          <Reveal>
            <p className="label eyebrow">What I deliver</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display section-title">
              Services I can <em>genuinely</em> ship
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="services__lede">
              Focused freelance work in AI products, automation, custom software, and
              practical analytics. No overpromising.
            </p>
          </Reveal>
        </header>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <p className="label service-card__num">{service.num}</p>
              <h3 className="display service-card__title">{service.title}</h3>
              <ul className="service-card__list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
