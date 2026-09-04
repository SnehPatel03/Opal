"use client";

import { motion } from "framer-motion";

type Props = {
  label?: string;
  fullPage?: boolean;
  overlay?: boolean;
};

const LoadingComponent = ({
  label = "Loading",
  fullPage = false,
  overlay = false,
}: Props) => (
  <div
    role="status"
    aria-live="polite"
    className={[
      "flex flex-col items-center justify-center gap-2",
      fullPage ? "min-h-screen" : "py-4",
      overlay
        ? "fixed inset-0 z-100 bg-[#0b0b0c]/70 backdrop-blur-xl"
        : "",
    ].join(" ")}
  >
    {/* ONLY THESE BARS ANIMATE */}
    <div
      className="flex h-[12px] w-[14px] items-end justify-center gap-[3px]"
      aria-hidden
    >
      {[0, 1, 2, 3].map((bar) => (
        <motion.span
          key={bar}
          className="block w-[2px] rounded-full bg-[#ff4c0f]/75"
          animate={{
            height: [3, 10, 3],
          }}
          transition={{
            duration: 0.7,
            delay: bar * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* COMPLETELY STATIC */}
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
      {label}
    </span>
  </div>
);

export default LoadingComponent;