import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import LandingPageNavbar from "../_components/navbar";

const free = [
  "Record and share videos",
  "Personal workspace and folders",
  "Video playback and link sharing",
];

const pro = [
  "Everything in Free",
  "AI summaries and descriptions",
  "AI transcripts",
  "Public workspaces and team invitations",
];

export default function PricingPage() {
  return (
    <main className="relative h-[100svh] min-h-[620px] overflow-hidden bg-black text-white">
      {/* Navbar */}
      <div className="relative z-50">
        <LandingPageNavbar />
      </div>

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[12%] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#ff4c0f]/10 blur-[150px]" />

        <div className="absolute bottom-[-180px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#ff4c0f]/[0.04] blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.4)_70%,#000_100%)]" />
      </div>

      {/* Main content */}
      <div className="absolute inset-x-0 bottom-0 top-[100px] z-10 flex flex-col px-5 sm:px-6">
        {/* Hero */}
        <section className="flex shrink-0 flex-col items-center px-2 pb-5 pt-8 text-center sm:pt-9">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff4c0f]">
            Straightforward access
          </p>

          <h1 className="opal-display mt-3 text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-[0.86] tracking-[-0.065em]">
            Pick the way
            <br />
            you work.
          </h1>

          <p className="mt-4 max-w-[500px] text-[12px] leading-relaxed text-white/45 sm:text-[13px]">
            Start recording for free. Upgrade when your team needs Opal&apos;s
            AI workflow and collaboration tools.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="min-h-0 flex-1 pb-3">
          <div className="mx-auto grid h-full max-w-[900px] grid-cols-1 gap-3 md:grid-cols-2">
            <Plan
              name="Free"
              price="₹0"
              eyebrow="For getting started"
              copy="The essentials for recording and sharing work clearly."
              features={free}
              action="Create a free account"
            />

            <Plan
              name="Pro"
              price="₹99"
              eyebrow="For connected teams"
              copy="Unlock the AI and collaboration features already built into Opal."
              features={pro}
              action="Start with Pro"
              featured
            />
          </div>
        </section>

        {/* Footer note */}
        <div className="shrink-0 pb-3 pt-1 text-center">
          <p className="text-[9px] leading-relaxed text-white/25">
            Pro is ₹99 per month, as reflected in your workspace billing.
            Checkout is handled securely after you sign in.
          </p>
        </div>
      </div>
    </main>
  );
}

function Plan({
  name,
  price,
  eyebrow,
  copy,
  features,
  action,
  featured = false,
}: {
  name: string;
  price: string;
  eyebrow: string;
  copy: string;
  features: string[];
  action: string;
  featured?: boolean;
}) {
  return (
    <article
      className={[
        "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] border p-5 sm:p-6",
        "transition-all duration-300",
        featured
          ? "border-[#ff4c0f] bg-[#ff4c0f] text-black shadow-[0_0_70px_rgba(255,76,15,0.12)]"
          : "border-white/[0.09] bg-white/[0.035] text-white hover:border-white/[0.16] hover:bg-white/[0.05]",
      ].join(" ")}
    >
      {/* Pro glow */}
      {featured && (
        <div className="pointer-events-none absolute -right-24 -top-24 h-[120px] w-[190px] rounded-full bg-white/20 blur-[70px]" />
      )}

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Header */}
        <div>
          <p
            className={`font-mono text-[9px] font-bold uppercase tracking-[0.24em] ${
              featured ? "text-black/55" : "text-[#ff784c]"
            }`}
          >
            {eyebrow}
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <h2 className="text-[2.5rem] font-black uppercase leading-none tracking-[-0.065em]">
              {name}
            </h2>

            {featured && (
              <span className="mb-1 rounded-full bg-black px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white">
                Recommended
              </span>
            )}
          </div>

          <div className="mt-3 flex items-baseline">
            <span className="text-[2rem] font-black leading-none tracking-[-0.06em]">
              {price}
            </span>

            <span
              className={`ml-1.5 text-[11px] font-medium ${
                featured ? "text-black/55" : "text-white/35"
              }`}
            >
              /month
            </span>
          </div>

          <p
            className={`mt-2 max-w-[360px] text-[12px] leading-relaxed ${
              featured ? "text-black/60" : "text-white/45"
            }`}
          >
            {copy}
          </p>
        </div>

        {/* Divider */}
        <div
          className={`my-4 h-px ${
            featured ? "bg-black/15" : "bg-white/[0.08]"
          }`}
        />

        {/* Features */}
        <ul className="min-h-0 flex-1 space-y-3">
          {features.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[12px] leading-5"
            >
              <span
                className={`mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  featured ? "bg-black/10" : "bg-white/[0.07]"
                }`}
              >
                <Check size={10} strokeWidth={2.5} />
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/auth/sign-up"
          className={[
            "mt-4 flex shrink-0 items-center justify-between rounded-full px-4 py-3",
            "text-[10px] font-bold uppercase tracking-[0.08em]",
            "transition-all duration-200 hover:scale-[1.015] active:scale-[0.99]",
            featured
              ? "bg-black text-white hover:bg-black/90"
              : "bg-white text-black hover:bg-white/90",
          ].join(" ")}
        >
          <span>{action}</span>

          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              featured ? "bg-white/10" : "bg-black/10"
            }`}
          >
            <ArrowUpRight size={13} />
          </span>
        </Link>
      </div>
    </article>
  );
}