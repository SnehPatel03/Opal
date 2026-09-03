import { getpaymentDetails } from "@/actions/workspace";
import PaymentButton from "@/app/(website)/_components/Payment-Button";
import { Check, CreditCard, Sparkles } from "lucide-react";

export default async function BillingPage() {
  const payment = await getpaymentDetails();
  const isPro = payment?.data?.subscription?.plan === "PRO";
  const plan = isPro ? "Pro" : "Free";
  const price = isPro ? "₹99" : "₹0";
  const features = isPro ? ["AI summaries and descriptions", "AI video transcripts", "Public workspace collaboration"] : ["Record and share videos", "Personal workspace and folders", "Video playback and share links"];

  return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#ff784c]">Workspace billing</p><h1 className="mt-2 text-3xl font-black uppercase tracking-[-.06em] text-white sm:text-4xl">Your plan</h1><p className="mt-2 text-sm text-white/45">Manage the features available to this Opal workspace.</p></header>
    <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><section className="opal-panel rounded-3xl p-6 text-white sm:p-8"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#ff784c]">Current subscription</p><h2 className="mt-4 text-5xl font-black uppercase tracking-[-.065em]">{plan}</h2></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[.08] text-[#ff784c]"><CreditCard size={20}/></div></div><div className="my-8 h-px bg-white/[.08]"/><p className="text-4xl font-black tracking-[-.05em]">{price}<span className="ml-1 text-sm font-medium text-white/45">/month</span></p><ul className="mt-7 space-y-3">{features.map(feature => <li key={feature} className="flex gap-3 text-sm"><Check size={17} className="shrink-0 text-[#ff784c]"/><span>{feature}</span></li>)}</ul>{!isPro && <div className="mt-8 max-w-52"><PaymentButton /></div>}</section>
      <aside className="opal-panel rounded-3xl p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c0f]/15 text-[#ff784c]"><Sparkles size={18}/></div><h2 className="mt-5 text-xl font-bold text-white">Built to grow with your workflow.</h2><p className="mt-3 text-sm leading-relaxed text-white/45">Pro unlocks the AI workflow already available throughout Opal, so recordings become useful documentation and conversations.</p><div className="mt-7 rounded-2xl border border-white/[.08] bg-black/20 p-4"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/35">Subscription status</p><p className="mt-2 text-sm font-semibold text-white">{isPro ? "Pro subscription active" : "Free plan active"}</p></div></aside></div>
  </div>;
}
