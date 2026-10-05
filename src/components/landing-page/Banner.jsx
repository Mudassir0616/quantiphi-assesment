import { ChevronRight } from "@mui/icons-material";
import { useLayoutEffect, useRef, useState } from "react";
// keep your existing ChevronRight import
// import { ChevronRight } from "...";

const title = "Own your enterprise intelligence. Compound your edge.";

/* ---------- Timeline (seconds) ---------- */
const START = 1.4; // when the first cube begins (title words run ~0.2s -> 3s)
const STEP = 0.5; // time between each service

/* ---------- Stage geometry (design px, scaled to fit) ---------- */
const STAGE_W = 1400;
const STAGE_H = 500;
const CUBE = 120; // layout slot width (keeps cube spacing/curve/node math unchanged)
const CUBE_VISUAL = 98; // actual rendered cube size, centered in its slot
const PITCH = 196;
const X0 = 84; // space between the opening bracket and the first cube
const LABEL_TOP = 160; // gap between cube and its label
const LINE_TOP = 234;
const CURVE_DX = X0 - 48; // curve paths below were drawn with X0 = 48
const CURVE_DY = 40;

/* ---------- Icons (inline SVG, no assets needed) ---------- */
const ip = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ChipIcon = () => (
  <svg {...ip}>
    <rect x="18" y="18" width="28" height="28" rx="3" />
    <text
      x="32"
      y="36.5"
      fontSize="11"
      fontWeight="700"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
    >
      AI
    </text>
    {[24, 32, 40].map((p) => (
      <g key={p}>
        <path d={`M${p} 18v-7`} />
        <path d={`M${p} 46v7`} />
        <path d={`M18 ${p}h-7`} />
        <path d={`M46 ${p}h7`} />
      </g>
    ))}
  </svg>
);

const DataIcon = () => (
  <svg {...ip}>
    <ellipse cx="24" cy="15" rx="13" ry="5" />
    <path d="M11 15v26c0 3 6 5 13 5" />
    <path d="M11 28c0 3 6 5 13 5" />
    <path d="M37 15v9" />
    <circle cx="42" cy="35" r="9" />
    <path d="M48.5 41.5L56 49" />
    <circle cx="52" cy="14" r="2.5" />
    <path d="M37 19h12" />
  </svg>
);

const AgentIcon = () => (
  <svg {...ip}>
    <path d="M18 54h28l-4-9H22z" />
    <text
      x="32"
      y="51.5"
      fontSize="6.5"
      fontWeight="700"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
    >
      {"</>"}
    </text>
    <path d="M32 45V33l12-13" />
    <circle cx="32" cy="33" r="3" />
    <circle cx="44" cy="20" r="3.5" />
    <path d="M47 23l6 5M45 24l-3 7" />
    <circle cx="16" cy="18" r="5.5" />
    <path d="M16 9v3M16 24v3M7 18h3M22 18h3" />
  </svg>
);

const HumanIcon = () => (
  <svg {...ip}>
    <path d="M21 36c-4-11 2-24 15-24 9 0 15 7 15 15 0 5-2 8-4 10v10H31v-7h-7c-2 0-3-2-3-4z" />
    <path d="M36 35c-5-3-7-6-5-9 1.5-2.5 4.5-2 5 0.5 0.5-2.5 3.5-3 5-0.5 2 3 0 6-5 9z" />
    <path d="M36 4v4M25 8l2 3M47 8l-2 3" />
  </svg>
);

const BankIcon = () => (
  <svg {...ip}>
    <path d="M10 24L32 10l22 14z" />
    <path d="M18 28v18M27 28v18M37 28v18M46 28v18" />
    <path d="M14 46h36M11 53h42" />
  </svg>
);

/* ---------- Data ---------- */
const STEPS = [
  { label: ["Sovereign AI", "Foundation"], Icon: ChipIcon, nodeY: 431 },
  { label: ["Enterprise", "Context & Data"], Icon: DataIcon, nodeY: 383 },
  { label: ["Lean Agent", "Assembly Line"], Icon: AgentIcon, nodeY: 370 },
  { label: ["Human Centered", "Design"], Icon: HumanIcon, nodeY: 345 },
  { label: ["Value Realization", "Layer"], Icon: BankIcon, nodeY: 296 },
];

// one segment per node (+ final segment that ends in the arrow)
const SEGMENTS = [
  "M62 424 C82 402 94 394 108 391",
  "M108 391 C170 378 240 349 304 343",
  "M304 343 C366 337 440 334 500 330",
  "M500 330 C560 326 636 316 696 305",
  "M696 305 C756 294 834 283 892 256",
  "M892 256 C950 229 1050 175 1110 135",
];

const cx = (i) => X0 + i * PITCH + CUBE / 2;

/* ---------- Pieces ---------- */
const Cube = ({
  size = CUBE,
  variant = "glass",
  icon,
  className = "",
  style,
  children,
}) => (
  <div
    className={`cube cube--${variant} ${className}`}
    style={{ "--s": `${size}px`, ...style }}
  >
    {["front", "back", "left", "right", "top", "bottom"].map((f) => (
      <span key={f} className={`face face--${f}`}>
        {f === "front" ? icon : null}
      </span>
    ))}
    {children}
  </div>
);

const useStageScale = (ref) => {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / STAGE_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
};

const Formula = () => {
  const wrapRef = useRef(null);
  const scale = useStageScale(wrapRef);
  const tEnd = START + STEPS.length * STEP; // time of the "result" beat

  return (
    <div
      ref={wrapRef}
      className="formula"
      style={{ height: STAGE_H * scale }}
      aria-label="Sovereign AI Foundation plus Enterprise Context and Data plus Lean Agent Assembly Line plus Human Centered Design plus Value Realization Layer equals Compounded Edge"
      role="img"
    >
      <div
        className="stage"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
        }}
        aria-hidden="true"
      >
        {/* curve, parentheses */}
        <svg
          className="overlay"
          width={STAGE_W}
          height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        >
          <path
            className="draw paren"
            pathLength="1"
            d="M44 4 C14 34 14 90 44 118"
            style={{ "--t": START - 0.2, "--d": 0.8 }}
          />
          <path
            className="draw paren"
            pathLength="1"
            d="M1036 4 C1066 34 1066 90 1036 118"
            style={{ "--t": tEnd, "--d": 0.8 }}
          />

          <g transform={`translate(${CURVE_DX} ${CURVE_DY})`}>
            {SEGMENTS.map((d, i) => {
              const isLast = i === SEGMENTS.length - 1;
              const t = isLast ? tEnd + 0.1 : START + i * STEP + 0.2;
              return (
                <path
                  key={i}
                  className="draw trail"
                  pathLength="1"
                  d={d}
                  style={{ "--t": t, "--d": isLast ? 1 : 0.65 }}
                />
              );
            })}

            <g transform="translate(1110 135) rotate(-34)">
              <polygon
                className="arrowhead"
                points="28,0 -8,-18 1,0 -8,18"
                style={{ "--t": tEnd + 0.95 }}
              />
            </g>
          </g>
        </svg>

        {/* services */}
        {STEPS.map(({ label, Icon, nodeY }, i) => {
          const t = START + i * STEP;
          const left = X0 + i * PITCH;
          return (
            <div key={i}>
              <div
                className="cube-wrap"
                style={{
                  left: left + (CUBE - CUBE_VISUAL) / 2,
                  top: (CUBE - CUBE_VISUAL) / 2,
                  "--t": t,
                }}
              >
                <Cube size={CUBE_VISUAL} icon={<Icon />} />
              </div>

              {i < STEPS.length - 1 && (
                <span
                  className="op plus"
                  style={{ left: left + CUBE + 25, top: 47, "--t": t + 0.45 }}
                />
              )}

              <p
                className="label"
                style={{ left: left - 25, top: LABEL_TOP, "--t": t + 0.3 }}
              >
                {label[0]}
                <br />
                {label[1]}
              </p>

              <span
                className="dots"
                style={{
                  left: cx(i) - 2,
                  top: LINE_TOP,
                  height: nodeY - 17 - LINE_TOP,
                  "--t": t + 0.35,
                }}
              />
              <span
                className="node"
                style={{ left: cx(i) - 15, top: nodeY - 15, "--t": t + 0.8 }}
              />
            </div>
          );
        })}

        {/* result */}
        <span
          className="op equals"
          style={{ right: 250, top: 47, "--t": tEnd + 0.2 }}
        />
        <div
          className="cube-wrap cube-wrap--result"
          style={{ right: 20, top: -35, "--t": tEnd + 0.7 }}
        >
          <Cube size={150} variant="wire">
            <Cube size={94} variant="solid" className="cube--core" />
          </Cube>
        </div>
        <p
          className="label label--result"
          style={{ right: 0, top: 180, "--t": tEnd + 1 }}
        >
          Compounded
          <br />
          Edge
        </p>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="container">
        <div className="banner-title">
          <h1 aria-label={title}>
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className="word"
                aria-hidden="true"
                style={{ "--i": i }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        <Formula />

        <button className="cta-btn">
          Unlock AI-Powered Growth <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
