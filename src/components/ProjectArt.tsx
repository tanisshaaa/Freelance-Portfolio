/**
 * Hand-built doodle illustrations for the Work section.
 * They share the sticker language (pink / butter / brown, thick strokes, hard
 * shadows) and fill `.work__img` at 100% via a 640x440 viewBox (= 16/11).
 *
 * Colours come from CSS classes (f-* fills, s-* strokes) so hover states in
 * globals.css can re-colour and nudge individual parts.
 */

const W = 640;
const H = 440;

const rad = (d: number) => (d * Math.PI) / 180;
const f = (n: number) => Math.round(n * 100) / 100;

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${f(x0)},${f(y0)} A${r},${r} 0 ${large} 1 ${f(x1)},${f(y1)}`;
}

function star(rOut: number, rIn: number, n: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = rad(rot + (i * 180) / n);
    pts.push(`${f(r * Math.cos(a))},${f(r * Math.sin(a))}`);
  }
  return pts.join(" ");
}

function polygon(r: number, n: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = rad(rot + (i * 360) / n);
    pts.push(`${f(r * Math.cos(a))},${f(r * Math.sin(a))}`);
  }
  return pts.join(" ");
}

function gearPath(teeth: number, rOut: number, rIn: number) {
  const step = (Math.PI * 2) / teeth;
  const p = (r: number, a: number) => `${f(r * Math.cos(a))},${f(r * Math.sin(a))}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"}${p(rIn, a - step * 0.36)} `;
    d += `L${p(rOut, a - step * 0.2)} L${p(rOut, a + step * 0.2)} L${p(rIn, a + step * 0.36)} `;
  }
  return d + "Z";
}

const SPARKLE =
  "M0,-16 C2,-5 5,-2 16,0 C5,2 2,5 0,16 C-2,5 -5,2 -16,0 C-5,-2 -2,-5 0,-16Z";

function Sparkle({
  x,
  y,
  s = 1,
  fill = "f-butter",
  delay = 0,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
  delay?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="art__spark" style={{ animationDelay: `${delay}s` }}>
        <path d={SPARKLE} className={`${fill} s-brown`} strokeWidth={3.5} strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Squiggle({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path
        d="M0 0 q10 -16 20 0 t20 0 t20 0 t20 0"
        className="s-brown"
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
      />
    </g>
  );
}

function Asterisk({ x, y, r = 14, rot = 0 }: { x: number; y: number; r?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className="art__spark">
        {[0, 60, 120].map((a) => (
          <line
            key={a}
            x1={f(-r * Math.cos(rad(a)))}
            y1={f(-r * Math.sin(rad(a)))}
            x2={f(r * Math.cos(rad(a)))}
            y2={f(r * Math.sin(rad(a)))}
            className="s-brown"
            strokeWidth={5}
            strokeLinecap="round"
          />
        ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* RetailGPT: AI x BI                                                  */
/* ------------------------------------------------------------------ */

export function RetailGPTArt() {
  const bars = [
    { x: 138, h: 52, c: "f-pink" },
    { x: 182, h: 92, c: "f-butter" },
    { x: 226, h: 72, c: "f-pink" },
    { x: 270, h: 128, c: "f-brown" },
  ];
  const base = 296;

  return (
    <svg
      className="work__art art art--retail"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Doodle of a dashboard with bar chart, trend line and donut, plus a chat bubble asking why sales dipped"
    >
      <defs>
        <pattern id="art-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="2.6" className="f-pinkdeep" opacity="0.38" />
        </pattern>
      </defs>

      {/* background */}
      <rect width={W} height={H} className="art__bg" />
      <rect width={W} height={H} fill="url(#art-dots)" />
      <g className="art__blob">
        <path
          d="M118 210 C96 120 190 52 300 66 C420 80 540 108 548 226 C556 330 450 396 330 384 C210 372 138 318 118 210Z"
          className="f-pinksoft"
          opacity="0.9"
        />
      </g>

      <Squiggle x={34} y={52} rot={-6} />
      <Sparkle x={62} y={168} s={1.1} delay={0.4} />
      <Sparkle x={476} y={52} s={0.9} fill="f-bg" delay={1.1} />
      <Sparkle x={604} y={206} s={0.8} delay={0.8} />
      <Asterisk x={34} y={262} r={12} rot={12} />

      {/* dashboard card */}
      <g className="art__card">
        <rect x={118} y={92} width={330} height={240} rx={22} className="f-brown" />
        <rect
          x={110}
          y={82}
          width={330}
          height={240}
          rx={22}
          className="f-bg s-brown"
          strokeWidth={5}
        />
        <path
          d="M110 104 a22 22 0 0 1 22 -22 h286 a22 22 0 0 1 22 22 v18 h-330z"
          className="f-butter s-brown"
          strokeWidth={5}
          strokeLinejoin="round"
        />
        {[134, 156, 178].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={102}
            r={6}
            className={`${i === 0 ? "f-pink" : "f-bg"} s-brown`}
            strokeWidth={3}
          />
        ))}
        <rect x={296} y={94} width={116} height={16} rx={8} className="f-bg s-brown" strokeWidth={3} />
        <line x1={308} y1={102} x2={354} y2={102} className="s-brown" strokeWidth={3.5} strokeLinecap="round" />

        {/* bars */}
        <line x1={128} y1={base + 2} x2={314} y2={base + 2} className="s-brown" strokeWidth={4} strokeLinecap="round" />
        {bars.map((b, i) => (
          <rect
            key={b.x}
            x={b.x}
            y={base - b.h}
            width={30}
            height={b.h}
            rx={7}
            className={`art__bar ${b.c} s-brown`}
            strokeWidth={4}
            style={{ transitionDelay: `${i * 0.05}s` }}
          />
        ))}

        {/* trend line */}
        <g className="art__trend">
          <polyline
            points="150,226 197,178 241,200 285,128 322,112"
            fill="none"
            className="s-pinkdeep"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 11"
          />
          <circle cx={322} cy={112} r={9} className="f-pink s-brown" strokeWidth={4} />
        </g>

        {/* donut */}
        <g className="art__donut">
          <circle cx={376} cy={196} r={32} fill="none" className="s-butter" strokeWidth={18} />
          <circle
            cx={376}
            cy={196}
            r={32}
            fill="none"
            className="s-pink"
            strokeWidth={18}
            strokeDasharray="130 202"
            transform="rotate(-90 376 196)"
          />
          <circle cx={376} cy={196} r={41} fill="none" className="s-brown" strokeWidth={3.5} />
          <circle cx={376} cy={196} r={23} fill="none" className="s-brown" strokeWidth={3.5} />
        </g>
      </g>

      {/* reply chat bubble */}
      <g className="art__bubble art__bubble--b">
        <rect x={46} y={350} width={142} height={46} rx={23} className="f-brown" transform="translate(5 6)" />
        <rect x={46} y={350} width={142} height={46} rx={23} className="f-bg s-brown" strokeWidth={4.5} />
        <text
          x={117}
          y={379}
          textAnchor="middle"
          className="art__mono f-brown"
          fontSize={17}
          fontWeight={800}
        >
          SELECT *
        </text>
      </g>

      {/* main chat bubble */}
      <g className="art__bubble">
        <path
          d="M409,245 H566 A24,24 0 0 1 590,269 V317 A24,24 0 0 1 566,341 H436 L412,372 L414,341 H409 A24,24 0 0 1 385,317 V269 A24,24 0 0 1 409,245 Z"
          className="f-brown"
          transform="translate(6 7)"
        />
        <path
          d="M409,245 H566 A24,24 0 0 1 590,269 V317 A24,24 0 0 1 566,341 H436 L412,372 L414,341 H409 A24,24 0 0 1 385,317 V269 A24,24 0 0 1 409,245 Z"
          className="f-butter s-brown"
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <text x={400} y={282} className="art__mono f-brown" fontSize={15} fontWeight={800}>
          why did Q3 dip?
        </text>
        {[408, 428, 448].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={313}
            r={6}
            className="art__dot f-pinkdeep s-brown"
            strokeWidth={2.5}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
        <Sparkle x={558} y={308} s={0.9} fill="f-pink" delay={0.3} />
      </g>

      {/* insight burst */}
      <g transform="translate(548 118) rotate(-10)">
        <g className="art__burst">
          <polygon points={star(56, 42, 12)} className="f-brown" transform="translate(5 6)" />
          <polygon
            points={star(56, 42, 12)}
            className="f-butter s-brown"
            strokeWidth={4.5}
            strokeLinejoin="round"
          />
          <text
            x={0}
            y={7}
            textAnchor="middle"
            className="art__mono f-brown"
            fontSize={21}
            fontWeight={900}
          >
            +42%
          </text>
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Predictive Maintenance: gears, pulse, warning, gauge                */
/* ------------------------------------------------------------------ */

const GEAR_BIG = gearPath(12, 120, 98);
const GEAR_SMALL = gearPath(9, 62, 48);

export function MaintenanceArt() {
  const gx = 495;
  const gy = 336;
  const gr = 62;

  return (
    <svg
      className="work__art art art--maint"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Doodle of meshing gears with a heartbeat pulse, a warning sign, a sensor and a gauge needle in the red zone"
    >
      <defs>
        <pattern
          id="art-stripes"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-35)"
        >
          <rect width="26" height="10" className="f-pinkdeep" opacity="0.22" />
        </pattern>
      </defs>

      <rect width={W} height={H} className="art__bg" />
      <rect width={W} height={H} fill="url(#art-stripes)" />
      <g className="art__blob">
        <circle cx={250} cy={236} r={176} className="f-pinksoft" opacity="0.9" />
      </g>

      <Squiggle x={440} y={34} rot={4} />
      <Sparkle x={52} y={176} s={1} delay={0.5} />
      <Sparkle x={612} y={240} s={0.8} fill="f-bg" delay={1.2} />
      <Asterisk x={150} y={404} r={12} rot={8} />

      {/* big gear with heartbeat face */}
      <g transform="translate(232 238)">
        <g className="art__gear">
          <path d={GEAR_BIG} className="f-brown" transform="translate(7 9)" strokeLinejoin="round" />
          <path d={GEAR_BIG} className="f-butter s-brown" strokeWidth={5} strokeLinejoin="round" />
          <circle r={74} className="s-brown" fill="none" strokeWidth={3.5} strokeDasharray="2 12" strokeLinecap="round" />
        </g>
        <circle r={62} className="f-bg s-brown" strokeWidth={5} />
        <polyline
          className="art__pulse s-pinkdeep"
          points="-46,4 -26,4 -17,-22 -5,26 7,-30 17,12 25,4 46,4"
          fill="none"
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* small gear */}
      <g transform="translate(386 134)">
        <g className="art__gear art__gear--rev">
          <path d={GEAR_SMALL} className="f-brown" transform="translate(5 7)" strokeLinejoin="round" />
          <path d={GEAR_SMALL} className="f-bg s-brown" strokeWidth={5} strokeLinejoin="round" />
          <circle r={22} className="f-pink s-brown" strokeWidth={4.5} />
          <circle r={7} className="f-brown" />
        </g>
      </g>

      {/* nut / bolt sticker */}
      <g transform="translate(560 96) rotate(8)">
        <g className="art__burst">
          <polygon points={polygon(40, 6, 0)} className="f-brown" transform="translate(5 6)" />
          <polygon
            points={polygon(40, 6, 0)}
            className="f-butter s-brown"
            strokeWidth={4.5}
            strokeLinejoin="round"
          />
          <circle r={16} className="f-pink s-brown" strokeWidth={4.5} />
        </g>
      </g>

      {/* warning sign + pulse rings */}
      <g transform="translate(78 92)">
        <circle r={34} fill="none" className="art__ring s-pinkdeep" strokeWidth={4} />
        <circle
          r={34}
          fill="none"
          className="art__ring art__ring--2 s-pinkdeep"
          strokeWidth={4}
        />
        <g transform="rotate(-8)">
          <g className="art__warn">
            <polygon points="0,-40 40,28 -40,28" className="f-brown" transform="translate(5 6)" strokeLinejoin="round" />
            <polygon
              points="0,-40 40,28 -40,28"
              className="f-butter s-brown"
              strokeWidth={5}
              strokeLinejoin="round"
            />
            <line x1={0} y1={-16} x2={0} y2={6} className="s-brown" strokeWidth={6} strokeLinecap="round" />
            <circle cx={0} cy={17} r={3.6} className="f-brown" />
          </g>
        </g>
      </g>

      {/* sensor with radio waves */}
      <g className="art__sensor">
        {[24, 40, 56].map((r, i) => (
          <path
            key={r}
            d={arc(70, 330, r, -52, 52)}
            fill="none"
            className="art__wave s-brown"
            strokeWidth={4.5}
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
        <circle cx={70} cy={330} r={14} className="f-brown" transform="translate(3 4)" />
        <circle cx={70} cy={330} r={14} className="f-pinkdeep s-brown" strokeWidth={4.5} />
        <circle cx={70} cy={330} r={4.5} className="f-bg" />
      </g>

      {/* gauge card */}
      <g className="art__card">
        <rect x={404} y={246} width={196} height={146} rx={22} className="f-brown" />
        <rect
          x={396}
          y={236}
          width={196}
          height={146}
          rx={22}
          className="f-bg s-brown"
          strokeWidth={5}
        />
        <path d={arc(gx, gy, gr, 180, 240)} fill="none" className="s-butter" strokeWidth={17} strokeLinecap="butt" />
        <path d={arc(gx, gy, gr, 240, 300)} fill="none" className="s-pink" strokeWidth={17} />
        <path d={arc(gx, gy, gr, 300, 360)} fill="none" className="art__danger s-pinkdeep" strokeWidth={17} />
        <path d={arc(gx, gy, gr + 10, 180, 360)} fill="none" className="s-brown" strokeWidth={3.5} strokeLinecap="round" />
        <path d={arc(gx, gy, gr - 10, 180, 360)} fill="none" className="s-brown" strokeWidth={3.5} strokeLinecap="round" />

        <g className="art__needle">
          <line x1={gx} y1={gy} x2={gx} y2={gy - gr + 4} className="s-brown" strokeWidth={6} strokeLinecap="round" />
        </g>
        <circle cx={gx} cy={gy} r={10} className="f-pink s-brown" strokeWidth={4.5} />

        <rect x={450} y={352} width={90} height={22} rx={11} className="f-butter s-brown" strokeWidth={3.5} />
        <text
          x={495}
          y={368}
          textAnchor="middle"
          className="art__mono f-brown"
          fontSize={12}
          fontWeight={900}
          letterSpacing={1}
        >
          CHECK ME
        </text>
      </g>
    </svg>
  );
}
