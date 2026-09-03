import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import LandingPageNavbar from "../_components/navbar";

const free = ["Record and share videos", "Personal workspace and folders", "Video playback and link sharing"];
const pro = ["Everything in Free", "AI summaries and descriptions", "AI transcripts", "Public workspaces and team invitations"];

export default function PricingPage() {
  return <main className="min-h-screen bg-black text-white"><LandingPageNavbar />
    <section className="opal-atmosphere relative overflow-hidden px-6 pb-16 pt-36 sm:pt-48"><div className="pointer-events-none absolute left-1/2 top-20 h-110 w-160 -translate-x-1/2 rounded-full bg-[#ff4c0f]/15 blur-[130px]" /><div className="relative mx-auto max-w-6xl text-center"><p className="font-mono text-[10px] font-bold uppercase tracking-[.28em] text-[#ff4c0f]">Straightforward access</p><h1 className="opal-display mt-6 text-5xl uppercase sm:text-7xl">Pick the way<br />you work.</h1><p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/55">Start recording for free. Upgrade when your team needs Opal’s AI workflow and collaboration tools.</p></div></section>
    <section className="px-6 pb-24"><div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2"><Plan name="Free" price="₹0" eyebrow="For getting started" copy="The essentials for recording and sharing work clearly." features={free} action="Create a free account" featured={false}/><Plan name="Pro" price="₹99" eyebrow="For connected teams" copy="Unlock the AI and collaboration features already built into Opal." features={pro} action="Start with Pro" featured /></div><p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/35">Pro is ₹99 per month, as reflected in your workspace billing. Checkout is handled securely after you sign in.</p></section>
  </main>;
}

function Plan({ name, price, eyebrow, copy, features, action, featured }: { name:string; price:string; eyebrow:string; copy:string; features:string[]; action:string; featured?:boolean }) {
  return <article className={`rounded-3xl border p-7 sm:p-8 ${featured ? "border-[#ff4c0f] bg-[#ff4c0f] text-black" : "border-white/[.1] bg-white/[.04] text-white"}`}><p className={`font-mono text-[10px] font-bold uppercase tracking-[.22em] ${featured ? "text-black/60" : "text-[#ff784c]"}`}>{eyebrow}</p><h2 className="mt-6 text-4xl font-black uppercase tracking-[-.06em]">{name}</h2><p className="mt-5 text-3xl font-black tracking-[-.05em]">{price}<span className={`ml-1 text-sm font-medium ${featured ? "text-black/60" : "text-white/45"}`}>/month</span></p><p className={`mt-3 min-h-12 text-sm leading-relaxed ${featured ? "text-black/65" : "text-white/55"}`}>{copy}</p><div className={`my-7 h-px ${featured ? "bg-black/15" : "bg-white/10"}`}/><ul className="space-y-4">{features.map(item => <li key={item} className="flex gap-3 text-sm"><Check size={17} className="shrink-0"/><span>{item}</span></li>)}</ul><Link href="/auth/sign-up" className={`mt-10 flex items-center justify-between rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wide transition hover:scale-[1.02] ${featured ? "bg-black text-white" : "bg-white text-black"}`}><span>{action}</span><ArrowUpRight size={15}/></Link></article>;
}
