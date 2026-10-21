"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/motion";

type Tag = "div" | "section" | "article" | "li" | "header" | "p" | "h2";

type Props = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> & {
  as?: Tag;
  delay?: number;
  y?: number;
  rotate?: number;
  scale?: number;
};

/** Scroll-triggered fade + rise. Once per element. */
export function Reveal({
  as = "div",
  delay = 0,
  y = 44,
  rotate = 0,
  scale = 1,
  children,
  transition,
  ...rest
}: Props) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y, rotate, scale: scale === 1 ? 1 : scale }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition ?? { duration: 0.85, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}
