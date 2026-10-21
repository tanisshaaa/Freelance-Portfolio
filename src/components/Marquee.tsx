"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  items: ReactNode[];
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
};

/**
 * Infinite horizontal marquee driven by GSAP.
 * - slows down on hover
 * - surges with scroll velocity (and flips with scroll direction)
 * - falls back to a static scroller for reduced-motion users
 */
export function Marquee({
  items,
  duration = 38,
  reverse = false,
  className = "",
  label = "Marquee",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || !root.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.fromTo(
        el,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
      );

      let hovering = false;
      const base = () => (hovering ? 0.25 : 1);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = gsap.utils.clamp(-2500, 2500, self.getVelocity());
          const boost = 1 + Math.abs(v) / 450;
          tween.timeScale(boost * base());
          gsap.to(tween, {
            timeScale: base(),
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });

      const onEnter = () => {
        hovering = true;
        gsap.to(tween, { timeScale: base(), duration: 0.5, overwrite: true });
      };
      const onLeave = () => {
        hovering = false;
        gsap.to(tween, { timeScale: base(), duration: 0.5, overwrite: true });
      };
      root.current.addEventListener("mouseenter", onEnter);
      root.current.addEventListener("mouseleave", onLeave);

      return () => {
        root.current?.removeEventListener("mouseenter", onEnter);
        root.current?.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root, dependencies: [duration, reverse] },
  );

  // Each group repeats the items so a single group always out-measures the viewport.
  const group = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {[0, 1].flatMap((rep) =>
        items.map((item, i) => (
          <li className="marquee__item" key={`${rep}-${i}`}>
            {item}
          </li>
        )),
      )}
    </ul>
  );

  return (
    <div
      ref={root}
      className={`marquee ${className}`}
      role="region"
      aria-label={label}
    >
      <div ref={track} className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
