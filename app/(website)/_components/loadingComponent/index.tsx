"use client";

import { motion } from "framer-motion";

const BRAND_ORANGE = "#FF4C0F";

const waveform = [
  0.18, 0.28, 0.42, 0.58, 0.72, 0.88, 0.64, 0.48,
  0.76, 0.94, 0.68, 0.52, 0.38, 0.62, 0.82, 1,
  0.72, 0.54, 0.36, 0.48, 0.7, 0.9, 0.62, 0.44,
  0.28, 0.2,
];

const LoadingComponent = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-16 rounded-full opacity-20 blur-[90px]"
        style={{ background: BRAND_ORANGE }}
      />

      {/* Minimal glass loader */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative z-10
          flex w-[320px] flex-col items-center
          rounded-[28px]
          border border-white/[0.08]
          bg-white/[0.025]
          px-10 py-9
          backdrop-blur-2xl
          shadow-[0_20px_80px_-20px_rgba(0,0,0,0.85)]
        "
      >
        {/* Recording waveform */}
        <div className="relative flex h-[72px] w-[210px] items-center justify-center">
          {/* Subtle center glow */}
          <motion.div
            className="absolute h-8 w-28 rounded-full blur-2xl"
            style={{ background: BRAND_ORANGE }}
            animate={{
              opacity: [0.04, 0.12, 0.04],
              scale: [0.85, 1.1, 0.85],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative flex h-full items-center justify-center gap-[3px]">
            {waveform.map((value, index) => {
              const distanceFromCenter =
                Math.abs(index - (waveform.length - 1) / 2);

              return (
                <motion.span
                  key={index}
                  className="w-[3px] rounded-full bg-white"
                  style={{
                    height: `${Math.max(8, value * 58)}px`,
                    opacity: Math.max(
                      0.28,
                      1 - distanceFromCenter * 0.045
                    ),
                  }}
                  animate={{
                    scaleY: [0.35, 1, 0.5, 0.8, 0.35],
                    opacity: [
                      Math.max(0.2, value * 0.55),
                      Math.min(1, value + 0.15),
                      Math.max(0.25, value * 0.7),
                    ],
                  }}
                  transition={{
                    duration: 1.35,
                    delay: index * 0.045,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-7 h-[2px] w-[180px] overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="loading-fill h-full rounded-full"
            style={{ background: BRAND_ORANGE }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>

        {/* Status */}
        <div className="mt-5 flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: BRAND_ORANGE }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          />

          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
            Initializing Opal
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingComponent;