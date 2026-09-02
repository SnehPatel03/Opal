import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="opal-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-between gap-16 px-6 py-14 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <section className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium tracking-wide text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI video, made social
          </div>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-foreground sm:text-7xl lg:text-8xl">
            Turn every idea into a <span className="opal-gradient-text">moment.</span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Opal gives your videos a home that feels as good as the work itself. Create, share, and discover without the noise.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/auth/sign-up" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-[#f16001]">
              Start creating <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link href="/auth/sign-in" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-foreground transition hover:bg-white/[0.09]">
              <Play className="size-4 fill-current" aria-hidden="true" /> Watch the flow
            </Link>
          </div>
        </section>

        <section className="opal-glass relative overflow-hidden rounded-3xl p-4 sm:p-5" aria-label="Opal product preview">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
          <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4 text-xs text-muted-foreground">
            <span className="font-mono tracking-[0.18em] text-foreground/70">OPAL / STUDIO</span>
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> Live workspace</span>
          </div>
          <div className="grid gap-4 pt-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="relative flex aspect-video items-end overflow-hidden rounded-2xl bg-linear-to-br from-[#333333] via-[#171717] to-[#c10801] p-5 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(241,96,1,.65),transparent_24%),linear-gradient(135deg,transparent,rgba(0,0,0,.7))]" />
              <div className="relative space-y-2"><p className="text-xs uppercase tracking-[0.2em] text-white/60">Featured cut</p><h2 className="text-2xl font-medium tracking-tight sm:text-4xl">The quiet between frames</h2></div>
              <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white/70">02:18</span>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-black/30 p-5">
              <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What&apos;s inside</p><p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">One clear place.</p></div>
              <div className="space-y-3 text-sm text-muted-foreground"><div className="flex items-center justify-between border-b border-white/10 pb-3"><span>Share instantly</span><span className="text-primary">01</span></div><div className="flex items-center justify-between border-b border-white/10 pb-3"><span>Understand deeply</span><span className="text-primary">02</span></div><div className="flex items-center justify-between"><span>Keep moving</span><span className="text-primary">03</span></div></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
