import type { CSSProperties } from "react";

type SvgProps = {
  className?: string;
  style?: CSSProperties;
  title?: string;
};

const STROKE = "var(--brown)";

/** The aster flower: the brand mark. */
export function AsterFlower({
  className,
  style,
  petals = 12,
  petal = "var(--pink)",
  center = "var(--butter)",
}: SvgProps & { petals?: number; petal?: string; center?: string }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="21"
          rx="7"
          ry="19"
          fill={petal}
          stroke={STROKE}
          strokeWidth="2.5"
          transform={`rotate(${(i * 360) / petals} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill={center} stroke={STROKE} strokeWidth="2.5" />
    </svg>
  );
}

/** The mascot: aster flower with a face. Used as the avatar. */
export function Mascot({ className, style }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="17"
          rx="7.5"
          ry="17"
          fill={i % 2 ? "var(--pink)" : "var(--pink-soft)"}
          stroke={STROKE}
          strokeWidth="2.2"
          transform={`rotate(${(i * 360) / 14} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="25" fill="var(--butter)" stroke={STROKE} strokeWidth="2.5" />
      <circle cx="42" cy="46" r="3" fill={STROKE} />
      <circle cx="58" cy="46" r="3" fill={STROKE} />
      <ellipse cx="36" cy="55" rx="4.5" ry="3" fill="var(--pink)" opacity="0.65" />
      <ellipse cx="64" cy="55" rx="4.5" ry="3" fill="var(--pink)" opacity="0.65" />
      <path
        d="M42 55 Q50 65 58 55"
        stroke={STROKE}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Spiky starburst sticker. */
export function Burst({
  className,
  style,
  fill = "var(--butter)",
  points = 14,
}: SvgProps & { fill?: string; points?: number }) {
  const pts = Array.from({ length: points * 2 }).map((_, i) => {
    const r = i % 2 === 0 ? 48 : 38;
    const a = (Math.PI * i) / points - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  });
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        points={pts.join(" ")}
        fill={fill}
        stroke={STROKE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({
  className,
  style,
  fill = "var(--pink)",
}: SvgProps & { fill?: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 3 C54 34 66 46 97 50 C66 54 54 66 50 97 C46 66 34 54 3 50 C34 46 46 34 50 3Z"
        fill={fill}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wavy underline squiggle. */
export function Squiggle({ className, style }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 160 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 15 Q 24 -3 44 15 T 84 15 T 124 15 T 156 15"
        stroke={STROKE}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Chunky asterisk used as a bullet / spinner. */
export function Asterisk({ className, style }: SvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="14" strokeLinecap="round">
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="15" y1="30" x2="85" y2="70" />
        <line x1="15" y1="70" x2="85" y2="30" />
      </g>
    </svg>
  );
}
