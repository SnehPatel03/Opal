"use client";

import { motion } from "framer-motion";

const BRAND_ORANGE = "#FF4C0F";

const LoadingComponent = () => {
  // Exact 6 bars matching the reference image (heights in px)
  const bars = [
    { height: 16, delay: 0.1 },
    { height: 40, delay: 0.3 },
    { height: 64, delay: 0.5 },
    { height: 48, delay: 0.2 },
    { height: 32, delay: 0.4 },
    { height: 20, delay: 0.6 },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Ambient orange glow behind the glass card */}
      <div
        className="absolute -inset-10 rounded-full opacity-20 blur-[80px] pointer-events-none"
        style={{ background: BRAND_ORANGE }}
        aria-hidden
      />

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] px-16 py-12 backdrop-blur-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* Minimal 6-bar Audio Visualizer */}
        <div className="flex items-end justify-center gap-3 h-16">
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-white rounded-full"
              style={{ height: bar.height, transformOrigin: "bottom" }}
              initial={{ scaleY: 0.3, opacity: 0.6 }}
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay,
              }}
            />
          ))}
        </div>

        {/* Loading Bar (GSAP targets .loading-fill from parent) */}
        <div className="w-[200px] h-[2px] rounded-full bg-white/10 overflow-hidden">
          <div className="loading-fill h-full w-0 rounded-full" style={{ background: BRAND_ORANGE }} />
        </div>

        {/* Loader Text under the model */}
        <div className="text-[11px] text-white/40 tracking-[0.3em] uppercase font-mono">
          Initializing Opal
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingComponent;