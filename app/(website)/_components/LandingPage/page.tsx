"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
      <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
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

/** Animated dot-matrix audio waveform using Canvas */
const WaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      const dotSize = 3;
      const stepX = 12;
      const stepY = 12;

      const cols = Math.floor(width / stepX);
      const rows = Math.floor(height / stepY);

      const offsetX = (width - cols * stepX) / 2 + stepX / 2;
      const offsetY = (height - rows * stepY) / 2 + stepY / 2;

      for (let i = 0; i < cols; i++) {
        // Generate an organic wave amplitude
        const baseAmp = (height / 2.5) * (0.6 + Math.sin(time * 0.5 + i * 0.15) * 0.4);
        const amp = baseAmp * (0.5 + Math.sin(time + i * 0.4) * 0.5);
        const centerY = height / 2;

        for (let j = 0; j < rows; j++) {
          const y = offsetY + j * stepY;
          const distFromCenter = Math.abs(y - centerY);

          if (distFromCenter < amp) {
            // Calculate opacity based on distance from the wave edge
            const edgeDist = amp - distFromCenter;
            const opacity = Math.min(1, edgeDist / 20);
            
            if (opacity > 0.05) {
              ctx.beginPath();
              ctx.arc(offsetX + i * stepX, y, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 76, 15, ${opacity})`;
              ctx.fill();
            }
          }
        }
      }

      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full block" />;
};

const LandingPage = () => {
  return (
    <>
      <LandingPageNavbar />

      <section className="opal-atmosphere relative overflow-hidden pb-24 pt-40 sm:pt-48">
        {/* Ambient background glows */}
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
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.28em] text-[#ff4c0f]">The visual feedback studio</p>
            <h1 className="opal-display text-[13vw] uppercase text-white sm:text-[60px] lg:text-[68px]">
              Make work<br />
              <span className="text-[#ff4c0f]">visible.</span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              Record the work behind the work. Opal turns every screen capture into a clear, shareable conversation with AI context built in.
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

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-1.5 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              
              <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-black/40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <WaveformCanvas />
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-1 pl-1 pr-3 backdrop-blur-xl">
                  <div 
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-black" 
                    style={{ background: AVATAR_COLORS[0] }}
                  >
                    S
                  </div>
                  <span className="text-[11px] font-medium text-white/80">SP</span>
                </div>
              </div>

              {/* Recording Control Bar Footer */}
              <div className="flex justify-center py-4">
                <RecordingControlBar />
              </div>
            </div>
          </div>
        </div>

        {/* Feature List Footer */}
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

      <section id="how-it-works" className="relative overflow-hidden bg-[#151516] px-6 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[.8fr_1.2fr]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#ff4c0f]">01 / Made for momentum</p>
            <div><h2 className="max-w-3xl text-4xl font-black uppercase leading-[.9] tracking-[-.06em] sm:text-6xl">From first thought to clear next step.</h2><p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">A calmer place for async reviews, product walkthroughs, and decisions that should not be lost in a thread.</p></div>
          </div>
          <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {[['01','Capture the context','Screen, camera, and voice — together in one frictionless recording.'],['02','Let Opal organize','AI summaries and transcripts turn a recording into a page your team can scan.'],['03','Move with clarity','Timestamped comments keep feedback attached to the exact moment it matters.']].map(([number,title,copy]) => <article key={number} className="group py-9 md:px-7 md:first:pl-0 md:last:pr-0"><span className="font-mono text-xs text-[#ff4c0f]">{number}</span><h3 className="mt-14 text-2xl font-black uppercase leading-none tracking-[-.05em] transition-transform duration-300 group-hover:translate-x-1">{title}</h3><p className="mt-4 text-sm leading-relaxed text-white/55">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-[#ff4c0f] px-6 py-20 text-black sm:py-28">
        <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.25fr_.75fr]"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.25em]">03 / Built for a better handoff</p><h2 className="mt-6 text-5xl font-black uppercase leading-[.86] tracking-[-.05em] sm:text-7xl">Say less.<br />Show more.</h2></div><div><p className="max-w-md text-base leading-relaxed text-black/70">Bring your team into the picture with a recording that holds the full context—then let the conversation move the work forward.</p><Link href="/auth/sign-up" className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Create your workspace <ArrowUpRight size={15}/></Link></div></div>
      </section>

      <footer className="overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 sm:pt-7">
          <div className="flex items-center justify-between gap-5 font-mono text-[8px] font-bold uppercase tracking-[.08em] text-white/45 sm:text-[9px]">
            <div className="flex items-center gap-4 sm:gap-6">
              <Image
                src="/logo.svg"
                alt="Opal"
                width={93}
                height={40}
                className="h-auto w-8 brightness-0 invert"
              />
              <nav className="hidden items-center gap-4 sm:flex">
                <Link href="/services" className="transition-colors hover:text-[#ff784c]">Services</Link>
                <Link href="/pricing" className="transition-colors hover:text-[#ff784c]">Pricing</Link>
                <Link href="/auth/sign-in" className="transition-colors hover:text-[#ff784c]">Sign in</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="hidden sm:inline">Built for visible work</span>
              <a href="#top" className="transition-colors hover:text-[#ff784c]">Back to top ↗</a>
            </div>
          </div>

          <div className="mt-7 h-[clamp(7rem,18vw,16rem)] overflow-hidden border-t border-white/10 sm:mt-9">
            <h2 className="translate-y-[-.08em] pt-2 text-center text-[clamp(10rem,28vw,25rem)] font-black uppercase leading-[.73] tracking-[-.12em] text-[#f4f4f0]">
              Opal
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-4 font-mono text-[8px] uppercase tracking-[.16em] text-white/30 sm:text-[9px]">
            <span>© {new Date().getFullYear()} Opal. All rights reserved.</span>
            <span>Record the work behind the work</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
