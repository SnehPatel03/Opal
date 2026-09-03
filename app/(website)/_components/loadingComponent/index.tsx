"use client";

import { motion } from "framer-motion";

type Props = { label?: string; fullPage?: boolean };

/** A deliberately quiet loading state for in-app data and route transitions. */
const LoadingComponent = ({ label = "Loading", fullPage = false }: Props) => (
  <div className={`flex items-center justify-center gap-2.5 ${fullPage ? "min-h-screen" : "py-8"}`} role="status" aria-live="polite">
    <div className="flex items-end gap-1" aria-hidden>
      {[0, 1, 2].map((dot) => (
        <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-[#ff4c0f]" animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={{ duration: 0.7, delay: dot * 0.12, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-white/40">{label}</span>
  </div>
);

export default LoadingComponent;
