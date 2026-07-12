import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

const LandingPageNavbar = () => {
  return (
    <header className="w-full border-b border-neutral-800 bg-[#111111]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button className="text-white">
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={42}
              priority
            />
            <span className="text-3xl font-semibold text-white">Opal</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className="rounded-full bg-violet-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-neutral-300 transition hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="/contact"
            className="text-sm text-neutral-300 transition hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-8">
          <Link
            href="/auth/sign-in"
            className="rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingPageNavbar;