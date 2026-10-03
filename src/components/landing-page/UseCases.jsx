import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "@mui/icons-material";

const CASES = [
  {
    title: "Underwriting",
    icon: "/images/use-cases/underwriting.svg",
    href: "/#",
    text: "Create differentiated value for underwriters, loan reviewers and optimize knowledge worker bandwidth with a Dociphi’s template-free Document Processing SaaS Platform",
  },
  {
    title: "Claims",
    icon: "/images/use-cases/claims.svg",
    href: "/#",
    text: "Automate claims processing, reduce cycle time and enhance customer satisfaction with template-free document processing",
  },
  {
    title: "Policy Review",
    icon: "/images/use-cases/policy.svg",
    href: "/#",
    text: "Transform end-to-end policy review process, pave the way for elevated productivity, significantly reduced operational cost with Dociphi",
  },
  {
    title: "Bordereaux Management",
    icon: "/images/use-cases/bordereaux.svg",
    href: "/#",
    text: "Enable faster onboarding of new MGAs, reduce data errors, operational expenses and get access to real-time insights with Dociphi’s Bordereaux Management Platform",
  },
  {
    title: "Lending",
    icon: "/images/use-cases/lending.svg",
    href: "/#",
    text: "Create differentiated value for underwriters, loan reviewers and optimize knowledge worker bandwidth with a Dociphi’s template-free Document Processing SaaS Platform",
  },
];

// Where the dot rests on the arc for each case (0 = top of the arc, 1 = bottom)
const STOPS = [0, 0.25, 0.53, 0.81, 1];
const STEP_MS = 3600; // how long each case stays active
const MOVE_MS = 900; // how long the dot takes to travel

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const UseCases = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(STOPS[0]); // current position of the dot on the arc
  const rafRef = useRef(0);

  // put the dot at progress t (0..1) along the arc
  const place = useCallback((t) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const p = path.getPointAtLength(path.getTotalLength() * t);
    dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
  }, []);

  // autoplay: move to the next case after STEP_MS
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(
      () => setActive((i) => (i + 1) % CASES.length),
      STEP_MS,
    );
    return () => clearTimeout(id);
  }, [active, paused]);

  // slide the dot to the active case's stop
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const from = progressRef.current;
    const to = STOPS[active];
    const start = performance.now();

    const tick = (now) => {
      const k = Math.min((now - start) / MOVE_MS, 1);
      const t = from + (to - from) * ease(k);
      progressRef.current = t;
      place(t);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, place]);

  const activate = (i) => {
    setPaused(true);
    setActive(i);
  };

  return (
    <section className="use-cases-container container">
      <div className="heading">
        <div className="chip">
          <img src="/icons/chip.svg" alt="chip" />
          <span>Use Cases</span>
        </div>

        <h2>Built Around Your Industry, Your Documents, Your Decisions</h2>
      </div>

      <div className="cases">
        <div className="cases-stage">
          {/* dotted arc + tracer dot (same 1320x872 space as the stage) */}
          <svg className="tracer" viewBox="0 0 1320 872" aria-hidden="true">
            <path
              ref={pathRef}
              className="tracer-line"
              d="M242 181 A256 256 0 0 1 297 681"
            />
            <g ref={dotRef}>
              <circle className="tracer-halo" r="18" />
              <circle className="tracer-dot" r="9" />
            </g>
          </svg>

          <div className="img-container">
            <img src="/images/use-cases/data.jpg" alt="" />
          </div>

          {CASES.map((c, i) => (
            <article
              key={c.title}
              className={`case case-${i + 1} ${active === i ? "is-active" : ""}`}
              onMouseEnter={() => activate(i)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => activate(i)}
              onBlur={() => setPaused(false)}
            >
              <div className="icon-container">
                <img src={c.icon} alt="" />
              </div>

              <div className="text-container">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>

              <Link href={c.href} className="case-cta">
                View More <ChevronRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
