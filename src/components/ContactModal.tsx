"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { SITE, mailto } from "@/lib/site";

type ContactContextValue = {
  openContact: (subject?: string) => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return ctx;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("Freelance project enquiry");
  const [copied, setCopied] = useState(false);
  const titleId = useId();

  const openContact = useCallback((nextSubject = "Freelance project enquiry") => {
    setSubject(nextSubject);
    setCopied(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = SITE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}

      <AnimatePresence>
        {open ? (
          <motion.div
            className="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="contact-modal__backdrop"
              aria-label="Close contact popup"
              onClick={close}
            />
            <motion.div
              className="contact-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                type="button"
                className="contact-modal__close"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>

              <p className="label eyebrow eyebrow--ink">Let&apos;s talk</p>
              <h2 id={titleId} className="display contact-modal__title">
                Email me to start a project
              </h2>
              <p className="contact-modal__copy">
                Prefer mail apps? Hit open email. Or copy the address and paste it anywhere.
              </p>

              <div className="contact-modal__email-row">
                <span className="contact-modal__email">{SITE.email}</span>
                <button type="button" className="btn btn--sm" onClick={copyEmail}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="contact-modal__actions">
                <a className="btn" href={mailto(subject)} onClick={close}>
                  Open email
                </a>
                <button type="button" className="btn btn--ghost" onClick={close}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}
