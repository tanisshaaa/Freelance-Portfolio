/** Shared easing + timing so every section moves with the same personality. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Seconds to wait before hero/nav animate in (the pink curtain lifts first). */
export const LOAD_DELAY = 0.95;

export const POP = { type: "spring", stiffness: 260, damping: 16, mass: 0.8 } as const;
export const SOFT = { type: "spring", stiffness: 120, damping: 18 } as const;
