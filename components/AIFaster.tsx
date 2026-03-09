import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ImageIcon, Mic, Search, Zap } from "lucide-react";

const AIFaster: React.FC = () => {
  return (
    <section className="py-40 overflow-hidden relative bg-transparent" data-theme-trigger="light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Nebula Card - Always Dark per video */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full lg:flex-none lg:w-[460px] max-w-[460px] aspect-square rounded-[4rem] bg-black relative overflow-hidden flex flex-col justify-end p-10 md:p-12 lg:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.2)]"
          >
            {/* ✅ REDESIGNED: ONLY the animated square background */}
            <div className="absolute inset-0">
              {/* Orange light beam (fuseau lumineux) top-left */}
              <div className="orange-beam" aria-hidden />
              <div className="circuit-square" aria-hidden>
                <div className="circuit-base">
                  <div className="circuit-stars" />

                  {/* Grid + LED paths drawn in SVG so LEDs follow the exact lines */}
                  <svg
                    className="circuit-grid"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Base square grid only, like reference card */}
                    {Array.from({ length: 9 }).map((_, i) => {
                      const p = 10 + i * 10;
                      return (
                        <g key={p}>
                          <line x1={p} y1="0" x2={p} y2="100" className="grid-line" />
                          <line x1="0" y1={p} x2="100" y2={p} className="grid-line" />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Orange LEDs: thin segments racing along existing square grid lines */}
                  <div className="led-layer">
                    <span className="led led-h led-h-1" />
                    <span className="led led-h led-h-2" />
                    <span className="led led-h led-h-3" />
                    <span className="led led-h led-h-4" />
                    <span className="led led-h led-h-5" />

                    <span className="led led-v led-v-1" />
                    <span className="led led-v led-v-2" />
                    <span className="led led-v led-v-3" />
                    <span className="led led-v led-v-4" />
                  </div>

                  {/* White moving points (signal pulses) */}
                  <div className="dot-layer">
                    <span className="signal-dot dot-x-1" />
                    <span className="signal-dot dot-x-2" />
                    <span className="signal-dot dot-x-3" />
                    <span className="signal-dot dot-y-1" />
                    <span className="signal-dot dot-y-2" />
                    <span className="signal-dot dot-y-3" />
                  </div>
                </div>

                {/* Keep focus on content area */}
                <div className="circuit-vignette" />
              </div>
            </div>

            {/* ✅ TEXT OVERLAY WITH PREMIUM GLOW */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col gap-3 items-start"
              style={{
                textShadow: '0 0 32px rgba(0,0,0,0.92), 0 0 12px #ff6a00, 0 2px 8px rgba(0,0,0,0.7)'
              }}
            >
              <div className="w-12 h-12 bg-black/70 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                <Zap size={28} className="text-orange-400 drop-shadow-[0_0_16px_#ff6a00]" />
              </div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-500 text-3xl md:text-4xl leading-tight tracking-tight mb-1"
                style={{ WebkitTextStroke: '1px #fff' }}
              >
                Explore Our Latest Upgrades
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-white/90 font-medium text-lg md:text-2xl tracking-wide mt-1"
                style={{ WebkitTextStroke: '0.5px #fff' }}
              >
                and See How We're Revolutionizing Logistics
              </motion.p>
            </motion.div>

            {/* CSS (lightweight, no external libs) */}
            <style>{`
              /* ====== Orange Light Beam (Fuseau lumineux) ====== */
              .orange-beam {
                position: absolute;
                left: -18%;
                top: -18%;
                width: 80%;
                height: 80%;
                pointer-events: none;
                z-index: 1;
                background: none;
              }
              .orange-beam::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(120deg, rgba(255, 106, 0, 0.82) 0%, rgba(255, 106, 0, 0.38) 30%, rgba(255, 106, 0, 0.10) 60%, transparent 100%);
                filter: blur(24px) brightness(1.1);
                opacity: 0.92;
                border-radius: 40% 60% 60% 40%/60% 40% 60% 40%;
                animation: orangeBeamMove 3.8s linear infinite alternate;
                pointer-events: none;
              }
              @keyframes orangeBeamMove {
                0% { transform: scale(1.04) rotate(-8deg) translateY(0); opacity: 0.92; }
                40% { opacity: 1; }
                60% { opacity: 0.92; }
                100% { transform: scale(1.12) rotate(-12deg) translateY(8px); opacity: 0.92; }
              }
              /* ====== Square container ====== */
              .circuit-square{
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                overflow: hidden;
                isolation: isolate;
                transform: translateZ(0);
              }

              .circuit-base{
                position:absolute; inset:0;
                background: #050507;              /* pure deep black */
              }

              /* ====== Subtle orange glow layer (no background gradient, just ambient glow) ====== */
              .circuit-base::before{
                content:"";
                position:absolute; inset:0;
                background: 
                  radial-gradient(circle at 50% 50%, rgba(255,106,0,0.06), transparent 45%);
                filter: blur(40px);
                opacity: 0.8;
                mix-blend-mode: screen;
                transform: translateZ(0);
                pointer-events:none;
              }

              .circuit-stars{
                position:absolute; inset:0;
                background-image:
                  radial-gradient(circle at 18% 22%, rgba(255,255,255,0.16) 0 1px, transparent 2px),
                  radial-gradient(circle at 74% 28%, rgba(255,255,255,0.16) 0 1px, transparent 2px),
                  radial-gradient(circle at 62% 52%, rgba(255,255,255,0.12) 0 1px, transparent 2px),
                  radial-gradient(circle at 38% 62%, rgba(255,255,255,0.12) 0 1px, transparent 2px),
                  radial-gradient(circle at 82% 68%, rgba(255,255,255,0.10) 0 1px, transparent 2px),
                  radial-gradient(circle at 52% 80%, rgba(255,255,255,0.10) 0 1px, transparent 2px),
                  radial-gradient(circle at 24% 74%, rgba(255,255,255,0.08) 0 1px, transparent 2px),
                  radial-gradient(circle at 10% 48%, rgba(255,255,255,0.08) 0 1px, transparent 2px);
                opacity: 0.85;
                animation: starsDrift 12s linear infinite;
                will-change: transform, opacity;
                pointer-events:none;
              }

              @keyframes starsDrift{
                0% { transform: translate3d(0,0,0); opacity: 0.70; }
                50% { transform: translate3d(1%, -0.8%, 0); opacity: 0.90; }
                100% { transform: translate3d(0,0,0); opacity: 0.70; }
              }

              /* ====== SVG grid (square lines only) ====== */
              .circuit-grid{
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
              }

              .grid-line{
                stroke: rgba(255,106,0,0.12);
                stroke-width: 0.22;
                shape-rendering: crispEdges;
                filter: drop-shadow(0 0 4px rgba(255,106,0,0.10));
              }

              /* ====== Ultra-thin LEDs on grid lines (fast + never synced) ====== */
              .led-layer{
                position:absolute;
                inset:0;
                pointer-events:none;
                z-index: 2;
                transform: translateZ(0);
                will-change: contents;
              }

              .led{
                position:absolute;
                border-radius: 999px;
                opacity: 0;
                will-change: transform;
                backface-visibility: hidden;
                transform: translateZ(0);
                box-shadow:
                  0 0 8px rgba(255,130,50,0.60),
                  0 0 16px rgba(255,106,0,0.32),
                  0 0 24px rgba(255,90,0,0.12);
                background: linear-gradient(90deg,
                  rgba(255,140,60,0) 0%,
                  rgba(255,140,60,0) 28%,
                  rgba(255,170,110,0.98) 50%,
                  rgba(255,140,60,0) 72%,
                  rgba(255,140,60,0) 100%);
              }

              .led-h{ height: 1px; width: 88px; }

              .led-v{
                width: 1px;
                height: 58px;
                background: linear-gradient(180deg,
                  rgba(255,140,60,0) 0%,
                  rgba(255,140,60,0) 28%,
                  rgba(255,170,110,0.98) 50%,
                  rgba(255,140,60,0) 72%,
                  rgba(255,140,60,0) 100%);
              }

              @keyframes ledRunX{
                0%   { transform: translate3d(-120px, 0, 0); opacity: 0; }
                4%   { opacity: 0.92; }
                80%  { opacity: 0.82; }
                100% { transform: translate3d(600px, 0, 0); opacity: 0; }
              }

              @keyframes ledRunY{
                0%   { transform: translate3d(0, -90px, 0); opacity: 0; }
                4%   { opacity: 0.92; }
                80%  { opacity: 0.82; }
                100% { transform: translate3d(0, 600px, 0); opacity: 0; }
              }

              /* snapped to 10% grid lines: varied speeds/directions/delays (no coincidence) */
              .led-h-1{ top: 20%; left: 6%;  animation: ledRunX 0.70s linear infinite; animation-delay: -0.10s; }
              .led-h-2{ top: 30%; left: 34%; animation: ledRunX 0.93s linear infinite; animation-delay: -0.61s; animation-direction: reverse; }
              .led-h-3{ top: 40%; left: 54%; animation: ledRunX 0.81s linear infinite; animation-delay: -0.35s; }
              .led-h-4{ top: 60%; left: 16%; animation: ledRunX 1.06s linear infinite; animation-delay: -0.89s; animation-direction: reverse; }
              .led-h-5{ top: 70%; left: 62%; animation: ledRunX 0.86s linear infinite; animation-delay: -0.25s; }

              .led-v-1{ left: 30%; top: 14%; animation: ledRunY 0.96s linear infinite; animation-delay: -0.60s; }
              .led-v-2{ left: 50%; top: 34%; animation: ledRunY 0.74s linear infinite; animation-delay: -0.16s; animation-direction: reverse; }
              .led-v-3{ left: 70%; top: 12%; animation: ledRunY 1.12s linear infinite; animation-delay: -0.81s; }
              .led-v-4{ left: 80%; top: 46%; animation: ledRunY 0.84s linear infinite; animation-delay: -0.31s; animation-direction: reverse; }

              /* ====== Animated white points (small + subtle) ====== */
              .dot-layer{
                position:absolute;
                inset:0;
                pointer-events:none;
                z-index: 2;
                transform: translateZ(0);
                will-change: contents;
              }

              .signal-dot{
                position:absolute;
                width: 3px;
                height: 3px;
                border-radius: 999px;
                background: rgba(255,255,255,0.94);
                box-shadow:
                  0 0 6px rgba(255,255,255,0.54),
                  0 0 12px rgba(255,200,150,0.18);
                opacity: 0;
                will-change: transform;
                backface-visibility: hidden;
                transform: translateZ(0);
              }

              @keyframes dotMoveX{
                0%   { transform: translate3d(-36px, 0, 0); opacity: 0; }
                6%   { opacity: 0.88; }
                78%  { opacity: 0.68; }
                100% { transform: translate3d(500px, 0, 0); opacity: 0; }
              }

              @keyframes dotMoveY{
                0%   { transform: translate3d(0, -32px, 0); opacity: 0; }
                6%   { opacity: 0.88; }
                78%  { opacity: 0.68; }
                100% { transform: translate3d(0, 500px, 0); opacity: 0; }
              }

              .dot-x-1{ top: 20%; left: 10%; animation: dotMoveX 2.5s linear infinite; animation-delay: -0.8s; }
              .dot-x-2{ top: 50%; left: 22%; animation: dotMoveX 3.2s linear infinite; animation-delay: -2.0s; animation-direction: reverse; }
              .dot-x-3{ top: 70%; left: 52%; animation: dotMoveX 2.8s linear infinite; animation-delay: -1.4s; }

              .dot-y-1{ left: 30%; top: 16%; animation: dotMoveY 3.0s linear infinite; animation-delay: -1.6s; }
              .dot-y-2{ left: 60%; top: 24%; animation: dotMoveY 3.6s linear infinite; animation-delay: -2.8s; animation-direction: reverse; }
              .dot-y-3{ left: 80%; top: 44%; animation: dotMoveY 2.7s linear infinite; animation-delay: -0.9s; }

              .circuit-vignette{
                position:absolute; inset:0;
                pointer-events:none;
                box-shadow:
                  inset 0 0 0 1px rgba(255,255,255,0.02),
                  inset 0 -50px 100px rgba(0,0,0,0.60),
                  inset 0 50px 100px rgba(0,0,0,0.50);
                opacity: 0.95;
              }

              /* Perf */
              @media (prefers-reduced-motion: reduce){
                .circuit-stars, .led, .signal-dot{ animation: none !important; opacity: 0.7; }
              }
            `}</style>
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full text-[11px] font-black uppercase tracking-[0.18em] mb-5"
            >
              <Zap size={12} />
              What is it?
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="section-heading mb-5 leading-[1.08] tracking-tight text-white text-[1.25rem] md:text-[1.5rem] lg:text-[2rem]"
            >
              All-in-One Platform for Seamless Logistics
              <br />
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="opacity-60 text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] font-semibold block mt-1"
              >
                Connect with your Account Manager
                <br />
                Access to unlimited Products to import
                <br />
                24/7 Support from our Call Center
              </motion.span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="opacity-70 text-sm md:text-base mb-4 leading-snug font-normal"
            >
              Our platform simplifies logistics management, providing you with
              real-time insights and control over your supply chain operations.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FeatureItem icon={MessageSquare} label="Strategic Warehousing" />
              <FeatureItem icon={ImageIcon} label="Smart Packaging" />
              <FeatureItem icon={Mic} label="Reliable Delivery" />
              <FeatureItem icon={Search} label="Global Reach" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, label }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex items-center gap-3 p-4 border-2 border-current/20 bg-black/5 rounded-xl hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group min-h-[56px] shadow-sm hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
  >
    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 group-hover:text-orange-400 transition-all duration-300">
      <Icon size={18} />
    </div>
    <div className="font-bold text-base opacity-80 group-hover:opacity-100 select-none leading-tight group-hover:text-orange-500 transition-colors duration-300">
      {label}
    </div>
  </motion.div>
);

export default AIFaster;