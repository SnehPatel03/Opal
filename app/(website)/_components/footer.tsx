"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const columns = [
  { title: "Product", links: [["Services", "/services"], ["Pricing", "/pricing"], ["Sign in", "/auth/sign-in"]] },
  { title: "Company", links: [["About", "/services"], ["Contact", "mailto:hello@opal.app"], ["Privacy", "/pricing"]] },
];

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/[.08] bg-[#0b0b0c] px-6 pt-20">
    <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-[#ff4c0f]/12 blur-[140px]" />

    <div className="relative mx-auto max-w-6xl">
      <div className="flex flex-col gap-10 pb-16 md:flex-row md:items-start md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.28em] text-[#ff4c0f]">Start recording</p>
          <h3 className="opal-display mt-4 text-3xl uppercase text-white sm:text-4xl">Share ideas, faster.</h3>
          <Link
            href="/auth/sign-up"
            className="btn-fill mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
          >
            Get started <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="flex gap-14">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-white/35">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group relative inline-block text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#ff4c0f] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between gap-6 border-t border-white/[.07] pt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end gap-4"
        >
          <Image src="/logo.svg" alt="Opal" width={60} height={60} className="mb-3 w-10 sm:w-16" />
          <h2 className="opal-display select-none text-[22vw] leading-[.72] text-white md:text-[16rem]">
            Opal<sup className="align-super text-[0.16em] font-normal">®</sup>
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] text-white/30">
        <span className="font-mono uppercase tracking-[.22em]">Built for fast teams</span>
      </div>
    </div>
  </footer>
);

export default Footer;
