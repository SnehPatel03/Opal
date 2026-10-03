import { ArrowUpRight, Download } from "lucide-react";

const desktopReleasesUrl =
  "https://github.com/SnehPatel03/Opal-Desktop/releases/latest";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[.24em] text-[#ff4c0f]">
          Opal Desktop
        </p>
        <h1 className="mt-5 text-4xl font-black uppercase tracking-[-.05em] sm:text-6xl">
          Install to upload
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
          Install the Opal desktop app to record your screen and send recordings
          to your workspace. Choose the installer for your computer from the
          latest release.
        </p>
        <a
          href={desktopReleasesUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ff4c0f] px-5 py-4 text-sm font-bold text-black transition hover:bg-[#ff6a36]"
        >
          <Download size={18} />
          Get the desktop installer
          <ArrowUpRight size={16} />
        </a>
        <ol className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm leading-6 text-white/55">
          <li>1. Download the installer that matches your operating system.</li>
          <li>2. Install and open Opal Desktop, then sign in to your account.</li>
          <li>3. Record your screen; the recording will appear in your workspace.</li>
        </ol>
      </div>
    </main>
  );
}
