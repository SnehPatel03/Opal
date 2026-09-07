import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  MessageSquareText,
  MonitorUp,
  Sparkles,
} from "lucide-react";
import LandingPageNavbar from "../_components/navbar";

const services = [
  {
    number: "01",
    title: "Record the full context",
    copy: "Capture your screen, camera and microphone together. Opal creates the video so your explanation travels with the work.",
    icon: MonitorUp,
  },
  {
    number: "02",
    title: "Share & review",
    copy: "Send one video link, then collect feedback where it belongs—at the exact timestamp, in a focused conversation.",
    icon: MessageSquareText,
  },
  {
    number: "03",
    title: "AI video intelligence",
    copy: "Generate a transcript, summary and description from your recordings, so viewers can understand the point before pressing play.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Organize your library",
    copy: "Keep recordings in workspaces and folders, with team access and notifications that make handoffs easy to follow.",
    icon: FolderKanban,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LandingPageNavbar />
      <section className="opal-atmosphere relative overflow-hidden px-6 pb-20 pt-36 sm:pb-28 sm:pt-48">
        <div className="pointer-events-none absolute -right-30 top-10 h-100 w-100 rounded-full bg-[#ff4c0f]/20 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.28em] text-[#ff4c0f]">
            Opal services
          </p>
          <h1 className="opal-display mt-6 max-w-4xl text-5xl uppercase sm:text-7xl">
            The tools that make an explanation{" "}
            <span className="text-[#ff4c0f]">stick.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/55">
            Opal is built around a simple workflow: record what matters, share
            it with the right people, and keep the feedback connected to the
            work.
          </p>
        </div>
      </section>
      <section className="bg-[#f3f1ed] px-6 py-16 text-black sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid border-y border-black/15 md:grid-cols-2">
            {services.map(({ number, title, copy, icon: Icon }) => (
              <article
                key={number}
                className="group border-black/15 p-7 first:border-b md:border-r md:even:border-r-0 md:nth-[3]:border-t md:nth-[4]:border-t"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#ff4c0f]">
                    {number}
                  </span>
                </div>
                <h2 className="mt-20 text-3xl font-black uppercase leading-[.92] tracking-[-.055em]">
                  {title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-black/60">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#ff4c0f] px-6 py-20 text-black">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.25em]">
              Ready when you are
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[.88] tracking-[-.06em] sm:text-6xl">
              Start with a clearer video.
            </h2>
          </div>
          <Link
            href="/auth/sign-up"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:scale-105"
          >
            Get started <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
