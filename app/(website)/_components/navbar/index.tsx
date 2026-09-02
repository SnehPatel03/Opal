import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";

const LandingPageNavbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/10 p-2 text-muted-foreground transition hover:border-primary/50 hover:text-foreground md:hidden" aria-label="Open navigation">
            <Menu size={18} />
          </button>
          <Link href="/" className="flex items-center gap-2.5" aria-label="Opal home">
            <Image src="/logo.svg" alt="Opal logo" width={30} height={30} priority />
            <span className="text-xl font-semibold tracking-[-0.04em] text-foreground">opal<span className="text-primary">.</span></span>
          </Link>
        </div>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Main navigation">
          <Link href="/" className="text-foreground transition hover:text-primary">Home</Link>
          <Link href="/pricing" className="text-muted-foreground transition hover:text-foreground">Pricing</Link>
          <Link href="/contact" className="text-muted-foreground transition hover:text-foreground">Contact</Link>
        </nav>
        <Link href="/auth/sign-in" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/60 hover:bg-primary hover:text-primary-foreground">
          Sign in <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

export default LandingPageNavbar;
