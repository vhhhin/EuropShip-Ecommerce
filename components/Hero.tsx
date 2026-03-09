import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ORANGE_MAIN = "255,77,0";
const ORANGE_DARK = "255,120,0";
const ORANGE_DEEP = "190,70,0";
const ORANGE_BROWN = "120,42,0";

const Hero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null); 
  const [chipPulse, setChipPulse] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const svg = svgRef.current;
    const chipEl = chipRef.current;

    const ledEl = () => document.getElementById("core-led-dot") as HTMLDivElement | null;
    if (!svg) return;

    const leftPaths = ["path-left-top", "path-left-mid", "path-left-bot"];
    const rightPaths = ["path-right-top", "path-right-mid", "path-right-bot"];
    let lastSide: "left" | "right" = "right";
    const recent: string[] = [];

    // Precompute node centers (SVG coordinate space) from the invisible motion paths end points
    const nodeCenters: Record<string, { x: number; y: number }> = {};
    [...leftPaths, ...rightPaths].forEach((pid) => {
      const el = svg.querySelector(`#${pid}`) as SVGPathElement | null;
      if (!el) return;
      try {
        const pLen = el.getTotalLength();
        const endPt = el.getPointAtLength(pLen);
        nodeCenters[pid.replace("path-", "node-")] = { x: endPt.x, y: endPt.y };
      } catch {
        /* noop */
      }
    });

    const NODE_RADIUS = 30; // slightly safer

    const pow2InOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function choosePath(side: "left" | "right") {
      const pool = side === "left" ? leftPaths.slice() : rightPaths.slice();
      for (let i = pool.length - 1; i >= 0; --i) {
        if (recent.includes(pool[i])) pool.splice(i, 1);
      }
      if (pool.length === 0) pool.push(side === "left" ? leftPaths[0] : rightPaths[0]);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      recent.push(pick);
      if (recent.length > 2) recent.shift();
      return pick;
    }

    // helper: hide LED if it's inside chip rect (CSS pixels), with padding
    function isInsideRectWithPad(x: number, y: number, rect: DOMRect, pad: number) {
      return (
        x >= rect.left - pad &&
        x <= rect.right + pad &&
        y >= rect.top - pad &&
        y <= rect.bottom + pad
      );
    }

    async function animateAlongPath(pathId: string) {
      const pathEl = svg.querySelector(`#${pathId}`) as SVGPathElement | null;
      const led = ledEl();
      if (!pathEl || !led) return;

      const total = pathEl.getTotalLength();
      const duration = (1.45 + (Math.random() - 0.5) * 0.12) * 1000;

      // chip departure micro glow
      setChipPulse(true);
      setTimeout(() => setChipPulse(false), 200);

      led.style.display = "block";

      const viewW = 1200;
      const viewH = 420;
      const startTime = performance.now();

      // Initialize rects (will be updated dynamically in frame loop)
      let svgRect = svg.getBoundingClientRect();
      let container = svg.parentElement as HTMLElement | null;
      let containerRect = container?.getBoundingClientRect() ?? null;
      let chipRect = chipEl?.getBoundingClientRect() ?? null;

      return new Promise<void>((resolve) => {
        let frameCount = 0;

        function frame(now: number) {
          if (!mounted) return resolve();

          const elapsed = now - startTime;
          const tRaw = Math.min(1, elapsed / duration);
          const t = pow2InOut(tRaw);
          const currentLen = total * t;

          const pt = pathEl.getPointAtLength(currentLen);

          // tangent / angle
          const sampleDelta = Math.max(1, total * 0.008);
          const aheadLen = Math.min(total, currentLen + sampleDelta);
          const behindLen = Math.max(0, currentLen - sampleDelta);
          const pAhead = pathEl.getPointAtLength(aheadLen);
          const pBehind = pathEl.getPointAtLength(behindLen);
          const dx = pAhead.x - pBehind.x;
          const dy = pAhead.y - pBehind.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          // Recalculate rects dynamically every 8 frames to handle scroll/resize
          frameCount++;
          if (frameCount % 8 === 0) {
            svgRect = svg.getBoundingClientRect();
            container = svg.parentElement as HTMLElement | null;
            containerRect = container?.getBoundingClientRect() ?? null;
            chipRect = chipEl?.getBoundingClientRect() ?? null;
          }

          // Convert SVG point to CSS pixels relative to viewport (using current svgRect)
          const cssX = svgRect.left + (pt.x / viewW) * svgRect.width;
          const cssY = svgRect.top + (pt.y / viewH) * svgRect.height;

          // hide LED while it would be over any node
          let insideNode = false;
          for (const nid in nodeCenters) {
            const nc = (nodeCenters as any)[nid];
            const d = Math.hypot(pt.x - nc.x, pt.y - nc.y);
            if (d <= NODE_RADIUS) {
              insideNode = true;
              break;
            }
          }

          // hide LED if it overlaps chip in CSS space
          const pad = 12; // safety margin
          const insideChip = chipRect ? isInsideRectWithPad(cssX, cssY, chipRect, pad) : false;

          if (insideNode || insideChip) {
            led.style.opacity = "0";
          } else {
            led.style.opacity = "1";
          }

          // Position LED in the container space: convert to container-local coordinates
          // This ensures the LED position is relative to the container, not the viewport
          const localX = containerRect ? cssX - containerRect.left : (pt.x / viewW) * svgRect.width;
          const localY = containerRect ? cssY - containerRect.top : (pt.y / viewH) * svgRect.height;

          led.style.left = `${localX}px`;
          led.style.top = `${localY}px`;
          led.style.transformOrigin = "0% 50%";
          led.style.transform = `translate(0%, -50%) rotate(${angle}deg)`;

          // subtle intensify of path while passing
          if (tRaw > 0.08 && tRaw < 0.92) {
            pathEl.style.opacity = "0.18";
            pathEl.style.transition = "opacity 120ms linear";
          }

          if (tRaw < 1) requestAnimationFrame(frame);
          else {
            pathEl.style.opacity = "";
            resolve();
          }
        }

        requestAnimationFrame(frame);
      });
    }

    (async function loop() {
      while (mounted) {
        const side: "left" | "right" = lastSide === "left" ? "right" : "left";
        lastSide = side;

        const pick = choosePath(side);
        const nodeId = pick.replace("path-", "node-");

        await animateAlongPath(pick);

        setActiveNodeId(nodeId);
        setTimeout(() => setActiveNodeId(null), 300);

        await new Promise((r) => setTimeout(r, 300 + Math.floor(Math.random() * 300)));
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20 text-white bg-[#070606] overflow-hidden"
    >
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Sweep lumineux diagonal, conique, orange, flou, premium, en haut à droite */}
        <div
          className="absolute"
          style={{
            top: '-4vw',
            right: '-10vw',
            width: '54vw',
            height: '18vw',
            zIndex: 1,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse 80% 40% at 80% 20%,
              rgba(255,180,80,0.12) 0%,
              rgba(255,120,0,0.22) 32%,
              rgba(255,77,0,0.82) 52%,
              rgba(255,77,0,0.38) 68%,
              rgba(255,77,0,0.0) 100%)`,
            filter: 'blur(22px)',
            opacity: 0.92,
            borderRadius: '44vw 22vw 44vw 22vw/22vw 44vw 22vw 44vw',
            transform: 'rotate(-28deg) skewX(-8deg)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Grille et autres backgrounds conservés */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "radial-gradient(circle at 60% 8%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 76%)",
            maskImage:
              "radial-gradient(circle at 60% 8%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 76%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 42% 55%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 34%, rgba(0,0,0,0) 78%)",
            opacity: 0.65,
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Text section - centered container */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-orange-400/10 backdrop-blur-xl border border-orange-500/40 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-orange-400 shadow-xl hover:border-orange-500/60 hover:shadow-2xl transition-all"
            style={{ position: 'relative', zIndex: 99999, boxShadow: '0 8px 32px rgba(255,77,0,0.2)' }}
          >
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              <Sparkles size={13} className="fill-orange-400 text-orange-400" />
            </motion.span>
            European Logistics
          </motion.div>
          
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            <span className="relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-orange-500/40 to-transparent blur-3xl" />
              <span className="relative">Scale E-Commerce Across <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Europe</span></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            With our 3 strategically located warehouses,
            <br className="hidden md:block" />
            we help e-commerce businesses scale with efficient logistics solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, translateY: -4, boxShadow: "0 24px 60px rgba(255, 77, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-xl font-black text-sm text-white hover:shadow-2xl transition-all shadow-lg shadow-orange-600/40 border border-orange-400/20 relative group overflow-hidden"
              onClick={() => navigate('/contact')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Get Started
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, translateY: -4, boxShadow: "0 24px 60px rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-black text-sm text-white hover:bg-white/20 hover:border-white/40 transition-all group overflow-hidden"
              onClick={() => navigate('/book-demo')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Book a Demo</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Circuit animation area - separated with proper spacing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 1.2, ease: "circOut" }}
          className="mt-24 relative w-full max-w-6xl mx-auto px-6 h-[320px] sm:h-[360px] md:h-[420px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 1200 420"
              fill="none"
            >
              <defs>
                <filter id="led-glow-intense" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="3.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="led-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4d00" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ff4d00" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ffd1a6" stopOpacity="1" />
                  <stop offset="60%" stopColor="#ff4d00" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* single complete grey lines */}
              <CircuitLine d="M560 170 H340 V110 H120" />
              <CircuitLine d="M560 220 H120" />
              <CircuitLine d="M560 270 H340 V330 H120" />

              <CircuitLine d="M640 170 H860 V110 H1080" />
              <CircuitLine d="M640 220 H1080" />
              <CircuitLine d="M640 270 H860 V330 H1080" />

              {/* Invisible motion paths */}
              <path id="path-left-top" d="M560 170 H340 V110 H120" fill="none" stroke="transparent" />
              <path id="path-left-mid" d="M560 220 H120" fill="none" stroke="transparent" />
              <path id="path-left-bot" d="M560 270 H340 V330 H120" fill="none" stroke="transparent" />

              <path id="path-right-top" d="M640 170 H860 V110 H1080" fill="none" stroke="transparent" />
              <path id="path-right-mid" d="M640 220 H1080" fill="none" stroke="transparent" />
              <path id="path-right-bot" d="M640 270 H860 V330 H1080" fill="none" stroke="transparent" />
            </svg>

            {/* LED element */}
            <div
              id="core-led-dot"
              className="led-dot absolute pointer-events-none"
              style={{ display: "none" }}
            />

            {/* Central Chip with floating animation and glow */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div ref={chipRef}>
                <div className="relative">
                  {/* Orange glow background */}
                  <div className="absolute inset-0 bg-orange-600/20 blur-2xl rounded-2xl -z-10 scale-150" />
                  
                  <motion.div
                    className={`chip w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden ${
                      chipPulse ? "chip-pulse" : ""
                    }`}
                  >
                    <div className="chip-glow-bg" />
                    <div className="chip-inner-gradient" />

                    <ChipPins side="left" />
                    <ChipPins side="right" />
                    <ChipPins side="bottom" />

                    <img
                      src="/gcore-mark.gif"
                      alt="EuropShip mark"
                      className="w-full h-full object-cover block select-none shadow-2xl ring-1 ring-white/10"
                    />
                    <div className="absolute inset-0 bg-orange-600/5 blur-3xl rounded-full pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Nodes - positioned around the chip */}
            <Node id="node-left-top" posClass="absolute left-[8%] top-[20%]" content={<img src="/icone1.png" alt="EATA" className="w-[86%] h-[86%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-left-top"} />
            <Node id="node-left-mid" posClass="absolute left-[5%] top-1/2 -translate-y-1/2" content={<img src="/icone2.png" alt="Service" className="w-[92%] h-[92%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-left-mid"} />
            <Node id="node-left-bot" posClass="absolute left-[8%] bottom-[20%]" content={<img src="/icone3.png" alt="Module" className="w-[92%] h-[92%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-left-bot"} />

            <Node id="node-right-top" posClass="absolute right-[8%] top-[20%]" content={<img src="/icone4.png" alt="Service" className="w-[92%] h-[92%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-right-top"} />
            <Node id="node-right-mid" posClass="absolute right-[5%] top-1/2 -translate-y-1/2" content={<img src="/icone5.png" alt="Grid" className="w-[92%] h-[92%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-right-mid"} />
            <Node id="node-right-bot" posClass="absolute right-[8%] bottom-[20%]" content={<img src="/icone6.png" alt="Sparkle" className="w-[92%] h-[92%] object-contain rounded-[0.9rem]" />} isActive={activeNodeId === "node-right-bot"} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function BeamExaggerated({
  top,
  right,
  width,
  yGap,
  angle,
  opacity,
  coreOpacity,
}: {
  top: string;
  right: string;
  width: string;
  yGap: string;
  angle: number;
  opacity: number;
  coreOpacity: number;
}) {
  const feather = `linear-gradient(90deg,
    rgba(${ORANGE_BROWN},0) 0%,
    rgba(${ORANGE_BROWN},0.10) 30%,
    rgba(${ORANGE_DEEP},0.28) 40%,
    rgba(${ORANGE_MAIN},0.90) 49%,
    rgba(${ORANGE_DARK},0.98) 50%,
    rgba(${ORANGE_MAIN},0.90) 51%,
    rgba(${ORANGE_DEEP},0.28) 60%,
    rgba(${ORANGE_BROWN},0.10) 74%,
    rgba(${ORANGE_BROWN},0) 100%)`;

  const core = `linear-gradient(90deg,
    rgba(${ORANGE_BROWN},0) 0%,
    rgba(${ORANGE_DARK},0.12) 44%,
    rgba(255,165,85,0.98) 50%,
    rgba(${ORANGE_DARK},0.12) 56%,
    rgba(${ORANGE_BROWN},0) 100%)`;

  const mask = `radial-gradient(ellipse at 64% 50%,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 34%,
    rgba(0,0,0,0.26) 62%,
    rgba(0,0,0,0) 92%)`;

  return (
    <>
      <div
        className="absolute rounded-[999px]"
        style={{
          top: `calc(${top} + ${yGap})`,
          right,
          width,
          height: "6.6vh",
          transform: `rotate(${angle}deg)`,
          background: feather,
          filter: "blur(8px)",
          opacity,
          mixBlendMode: "screen",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <div
        className="absolute rounded-[999px]"
        style={{
          top: `calc(${top} + ${yGap} + 2.15vh)`,
          right: `calc(${right} + 10vw)`,
          width: `calc(${width} - 56vw)`,
          height: "2.1vh",
          transform: `rotate(${angle}deg)`,
          background: core,
          filter: "blur(4.4px)",
          opacity: coreOpacity,
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}

const ChipPins = ({ side }: { side: "bottom" | "left" | "right" }) => (
  <div
    className={`absolute flex ${
      side === "bottom"
        ? "flex-row left-1/4 right-1/4 justify-between"
        : "flex-col top-1/4 bottom-1/4 justify-between"
    } ${side === "bottom" ? "bottom-[-12px]" : side === "left" ? "left-[-12px]" : "right-[-12px]"}`}
  >
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`${side === "bottom" ? "w-2 h-3" : "w-3 h-2"} bg-white/20 rounded-sm`} />
    ))}
  </div>
);

const CircuitLine = ({ d }: { d: string }) => (
  <path
    d={d}
    stroke="rgba(255,255,255,0.08)"
    strokeWidth="1.2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const Node = ({ id, posClass, content, isItalic, isGrid, isSparkle, isActive }: any) => (
  <motion.div
    id={id}
    className={`${posClass} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center opacity-90 hover:scale-110 transition-all duration-300 shadow-2xl overflow-hidden group`}
    style={{ filter: "drop-shadow(0 0 8px rgba(255,90,0,0.6))" }}
  >
    <div className="node-glow" />
    <div className={`absolute inset-0 bg-white/[0.01] ${isActive ? "bg-white/[0.03]" : "group-hover:bg-white/[0.04]"} transition-colors`} />

    {content && (
      <span
        className={`node-logo text-white/70 font-black text-base select-none transition-colors ${
          isItalic ? "italic text-lg" : ""
        } ${isActive ? "text-white" : "group-hover:text-white"}`}
      >
        {content}
      </span>
    )}

    {isGrid && (
      <div className="node-logo grid grid-cols-2 gap-1.5 opacity-40 select-none group-hover:opacity-80 transition-opacity">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-sm" />
        ))}
      </div>
    )}

    {isSparkle && (
      <div className="node-logo">
        <Sparkles size={24} className={`text-white ${isActive ? "opacity-100" : "opacity-40"} group-hover:opacity-80 transition-opacity`} />
      </div>
    )}
  </motion.div>
);

export default Hero;