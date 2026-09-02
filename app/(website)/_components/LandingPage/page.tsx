"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Mic,
  Video,
  MonitorPlay,
  MessageSquare,
  Sparkles,
  Pause,
  Play,
  Square,
  MicOff,
  VideoOff,
} from "lucide-react";
import LandingPageNavbar from "../navbar";

const BRAND_ORANGE = "#FF4C0F";

const AVATAR_COLORS = ["#FFB4A2", "#A2D2FF", "#B9FBC0", "#FFD6A5"];

const STEPS = [
  { label: "Start recording your\nscreen, cam & mic" },
  { label: "Organize into a\nworkspace or folder" },
  { label: "Share the link &\nget AI-powered feedback" },
];

/** Floating pause/play/stop/mic/cam control bar, like an active recording toolbar */
const RecordingControlBar = () => {
  const [paused, setPaused] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        <span className="font-mono text-[11px] font-medium text-white/80">
          04:12
        </span>
      </div>

      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Resume recording" : "Pause recording"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white transition-transform duration-150 hover:scale-105 hover:bg-white/[0.14]"
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>

      <button
        onClick={() => setMicOn((m) => !m)}
        aria-label="Toggle microphone"
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 ${
          micOn ? "bg-white/[0.08] text-white" : "bg-white/[0.04] text-white/30"
        }`}
      >
        {micOn ? <Mic size={15} /> : <MicOff size={15} />}
      </button>

      <button
        onClick={() => setCamOn((c) => !c)}
        aria-label="Toggle camera"
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 ${
          camOn ? "bg-white/[0.08] text-white" : "bg-white/[0.04] text-white/30"
        }`}
      >
        {camOn ? <Video size={15} /> : <VideoOff size={15} />}
      </button>

      <button
        aria-label="Stop recording"
        className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-150 hover:scale-105"
        style={{ background: BRAND_ORANGE }}
      >
        <Square size={13} fill="white" />
      </button>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <LandingPageNavbar />

      <section className="relative overflow-hidden bg-black pb-24 pt-40 sm:pt-48">

        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: BRAND_ORANGE }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-24 h-[380px] w-[380px] rounded-full opacity-20 blur-[100px]"
          style={{ background: BRAND_ORANGE }}
          aria-hidden
        />

    

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

          <div>
            <h1 className="text-[13vw] font-black uppercase leading-[0.92] tracking-tight text-white sm:text-[60px] lg:text-[64px]">
              Screen Record.
              <br />
              Share Instantly.
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              Capture your screen, camera and mic in one click. Opal turns
              every recording into a shareable video with an AI summary,
              transcript and space for your team to comment.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/auth/sign-up"
                className="rounded-full px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: BRAND_ORANGE,
                  boxShadow: `0 10px 30px rgba(255,76,15,0.35)`,
                }}
              >
                Start Recording
              </Link>
              <Link
                href="/auth/sign-up"
                aria-label="Get started"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 text-white transition-transform duration-150 hover:scale-[1.06] hover:border-white/30"
              >
                <ArrowUpRight size={20} />
              </Link>
            </div>
            <ol className="mt-14 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
              {STEPS.map((step, i) => (
                <li key={i} className="border-t border-white/15 pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="whitespace-pre-line text-[12px] font-semibold leading-snug text-white">
                      {step.label}
                    </p>
                    <ArrowUpRight
                      size={14}
                      className="mt-0.5 shrink-0 text-white/40"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right column — live recording window mockup */}
          <div className="flex items-center justify-center lg:justify-end">

          </div>
        </div>

        {/* bottom strip echoing Opal's real feature set */}
        <div className="relative mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 px-6 pt-8 text-white/35">
          <div className="flex items-center gap-2 text-[12px] font-medium">
            <MessageSquare size={14} />
            Threaded comments & replies
          </div>
          <div className="flex items-center gap-2 text-[12px] font-medium">
            <Sparkles size={14} />
            AI summaries & transcripts
          </div>
          <div className="flex items-center gap-2 text-[12px] font-medium">
            <MonitorPlay size={14} />
            Screen, cam & mic recording
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;