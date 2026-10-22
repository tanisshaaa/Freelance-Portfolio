"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { AsterFlower } from "./Stickers";
import { EASE, LOAD_DELAY } from "@/lib/motion";
import { useContact } from "./ContactModal";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#nutshell", label: "About" },
  { href: "#experience", label: "Experience" },
];

export function Nav() {
  const { openContact } = useContact();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(latest > 40);
    if (latest > prev && latest > 240) {
      setHidden(true);
      setOpen(false);
    } else if (latest < prev) {
      setHidden(false);
    }
  });

  return (
    <motion.div
      className="nav-shell"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: LOAD_DELAY + 0.1, ease: EASE }}
    >
      <motion.header
        className={`nav ${solid ? "nav--solid" : ""}`}
        animate={{ y: hidden ? -130 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <a className="nav__brand" href="#top" aria-label={`${SITE.person}, back to top`}>
          <AsterFlower className="nav__flower" petals={10} />
          <span className="nav__word">{SITE.brand}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} className="nav__link label" href={l.href}>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => openContact("Hire me, freelance enquiry")}
          >
            Hire me
          </button>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? "is-open" : ""} />
            <span className={open ? "is-open" : ""} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="nav__sheet"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="nav__sheet-link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </motion.div>
  );
}
