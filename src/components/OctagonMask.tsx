import { useId, type CSSProperties, type ReactNode } from "react";

const CLIP_POINTS = "0.29,0 0.71,0 1,0.29 1,0.71 0.71,1 0.29,1 0,0.71 0,0.29";
const STROKE_POINTS = "29,0 71,0 100,29 100,71 71,100 29,100 0,71 0,29";

type Props = {
  children: ReactNode;
  /** CSS size (width). Height follows via aspect-ratio. */
  size?: string;
  /** Stroke width in px. 0 hides the border. */
  stroke?: number;
  strokeColor?: string;
  background?: string;
  className?: string;
};

/**
 * Reusable octagon: an SVG clipPath (objectBoundingBox so it scales with any size)
 * plus a stroked SVG polygon overlay for the border.
 */
export function OctagonMask({
  children,
  size = "100%",
  stroke = 3,
  strokeColor = "var(--brown)",
  background = "var(--butter)",
  className = "",
}: Props) {
  const raw = useId();
  const id = `oct-${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
  const style: CSSProperties = { width: size };

  return (
    <div className={`octagon ${className}`} style={style}>
      <svg className="octagon__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <polygon points={CLIP_POINTS} />
          </clipPath>
        </defs>
      </svg>
      <div
        className="octagon__clip"
        style={{ clipPath: `url(#${id})`, WebkitClipPath: `url(#${id})`, background }}
      >
        {children}
      </div>
      {stroke > 0 && (
        <svg
          className="octagon__stroke"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points={STROKE_POINTS}
            fill="none"
            stroke={strokeColor}
            strokeWidth={stroke * 2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
