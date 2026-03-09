import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Preloader cinematic: 3 phases (0–1.2s, 1.2–2.8s, 2.8–3.5s). No skip.
const Loader: React.FC = () => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [visible, setVisible] = useState(true);

  const sweepRef = useRef<HTMLDivElement | null>(null);
  const finishedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const finish = () => {
    if (finishedRef.current) return; // ✅ avoid double finish
    finishedRef.current = true;

    // trigger sweep (phase 3) visually then hide
    if (sweepRef.current) sweepRef.current.classList.add("active");

    // small delay to let sweep finish before unmounting (exit anim still plays)
    const t = window.setTimeout(() => setVisible(false), 700);
    timersRef.current.push(t);
  };

  useEffect(() => {
    // Phase schedule
    const t1 = window.setTimeout(() => setPhase(2), 1200); // Phase 1 → 2
    const t2 = window.setTimeout(() => setPhase(3), 2800); // Phase 2 → 3
    const tEnd = window.setTimeout(() => finish(), 3500); // End

    timersRef.current.push(t1, t2, tEnd);

    return () => {
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--bg-dark)] overflow-hidden no-interaction"
          style={{ willChange: "opacity" }}
        >
          {/* subtle grid + radial */}
          <div
            className="absolute inset-0 preloader-grid"
            style={{ mixBlendMode: "screen" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(255,106,0,0.08), transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* micro terminal texts (Phase 1) */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
            <div
              className="loader-terminal"
              style={{
                opacity: phase === 1 ? 1 : 0,
                transition: "opacity 350ms ease",
              }}
            >
              <div
                style={{
                  opacity: phase === 1 ? 0.9 : 0.18,
                  transition: "opacity 350ms ease",
                }}
              >
                Initializing EuropShip Infrastructure ...
              </div>
              <div style={{ opacity: phase === 1 ? 0.9 : 0.18 }}>
                Connecting European Logistics Nodes ...
              </div>
              <div style={{ opacity: phase === 1 ? 0.9 : 0.18 }}>
                Synchronizing Network Intelligence ...
              </div>
            </div>
          </div>

          {/* Phase-based visuals */}
          <div className="relative z-30 flex items-center gap-6">
            {/* Phase 1 — core pulse */}
            {phase === 1 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.94, 1, 0.985], opacity: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="relative flex items-center justify-center"
              >
                {/* outer animated ring (subtle) */}
                <div className="absolute logo-ring" style={{ width: 280, height: 280 }} />

                {/* soft halo / glow behind logo */}
                <div className="absolute logo-glow" style={{ width: 220, height: 220 }} />

                {/* animated logo core (uses public/gcore-mark.gif) */}
                <div className="logo-core" aria-hidden>
                  <img src="/gcore-mark.gif" alt="EuropShip mark" />
                </div>

                {/* micro stroke ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 140,
                    height: 140,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
              </motion.div>
            )}

            {/* Phase 2 — logo build */}
            {phase === 2 && (
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: [1.02, 1], opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex items-center gap-6"
              >
                {/* SVG mark + animated letters */}
                <div className="w-20 h-20 rounded-full overflow-visible flex items-center justify-center">
                  <svg viewBox="0 0 120 120" width="80" height="80" className="block">
                    <path
                      className="loader-logo-stroke"
                      d="M12 70 L36 22 L60 46 L88 28 L104 44 L76 86 L52 62 L24 98 Z"
                      strokeDasharray={500}
                      strokeDashoffset={0} // ✅ animate to visible in phase 2
                      style={{
                        // start hidden then reveal (we keep it CSS-compatible)
                        strokeDasharray: 500,
                        strokeDashoffset: 0,
                        animation: "none",
                      }}
                    />
                    {/* IMPORTANT: if your .loader-logo-stroke relies on CSS,
                        ensure it starts with dashoffset: 500 and transitions to 0.
                        Here we do it inline via a second overlay path below. */}
                    <path
                      d="M12 70 L36 22 L60 46 L88 28 L104 44 L76 86 L52 62 L24 98 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={500}
                      strokeDashoffset={500}
                      style={{
                        transition: "stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1)",
                        strokeDashoffset: 0, // ✅ triggers transition on mount
                        filter: "drop-shadow(0 0 18px rgba(255,106,0,0.18))",
                      }}
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1 select-none">
                  {Array.from("EUROPSHIP").map((ch, i) => (
                    <motion.span
                      key={`${ch}-${i}`}
                      initial={{ opacity: 0, y: 6, scale: 1.02 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.06 + i * 0.015,
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: 48,
                        letterSpacing: "0.18em",
                        color: "var(--text-primary)",
                        textShadow: "0 0 30px rgba(255,106,0,0.12)",
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Phase 3 — reveal text subtle */}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-6"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-white/30 shadow-2xl bg-white/6">
                  <img
                    src="/gcore-mark.gif"
                    alt="EuropShip mark"
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: 48,
                    letterSpacing: "0.18em",
                  }}
                >
                  EUROPSHIP
                </div>
              </motion.div>
            )}
          </div>

          {/* micro progress only (no skip) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div
              style={{
                width: 220,
                height: 6,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 999,
              }}
            >
              <div
                style={{
                  width: `${phase === 1 ? 30 : phase === 2 ? 70 : 100}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg,var(--orange-main),var(--orange-deep))",
                  borderRadius: 999,
                  transition: "width 420ms ease",
                }}
              />
            </div>
          </div>

          {/* sweep overlay that will animate across during finish */}
          <div ref={sweepRef} className="sweep-orange" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;