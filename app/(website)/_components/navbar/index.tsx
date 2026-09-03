"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How it works" },
];

const LandingPageNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <div
        className={[
          "relative w-full max-w-5xl overflow-hidden rounded-2xl border transition-all duration-300 ease-out",
          "backdrop-blur-2xl",
          scrolled
            ? "border-white/10 bg-black/75 shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
            : "border-white/[0.08] bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        ].join(" ")}
      >
        {/* mirror / glass sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-32 w-[140%] -translate-x-1/2 rounded-full bg-white/[0.06] blur-2xl"
          aria-hidden
        />

        <div className="relative flex h-14 items-center justify-between px-4 sm:h-16 sm:px-5">
          {/* Logo / mark */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Opal home">
            <Image src="/logo.svg" alt="" width={47} height={20} priority />

          </Link>

          {/* Center nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              className="hidden px-2 text-[13.5px] font-medium text-white/60 transition-colors duration-150 hover:text-white sm:block"
            >
              Log in
            </Link>
            <Link
              href="/auth/sign-up"
              className="group flex items-center gap-1.5 rounded-full bg-[#FF4D1C] py-2 pl-4 pr-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,77,28,0.4),0_6px_20px_rgba(255,77,28,0.25)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get Started
              <ArrowUpRight
                size={14}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={[
            "relative overflow-hidden transition-all duration-300 ease-out md:hidden",
            mobileOpen ? "max-h-60 border-t border-white/[0.08]" : "max-h-0",
          ].join(" ")}
        >
          <nav className="flex flex-col gap-1 p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              Log in
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingPageNavbar;
