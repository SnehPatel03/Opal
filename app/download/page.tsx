import { Download } from "lucide-react";

const desktopDownloads = [
  {
    platform: "Windows",
    file: "Opal-Windows-Setup.exe",
  },
  {
    platform: "macOS",
    file: "Opal-Mac-Installer.dmg",
  },
  {
    platform: "Linux",
    file: "Opal-Linux.AppImage",
  },
];

const desktopDownloadUrl = (file: string) =>
  `https://github.com/SnehPatel03/Opal-Desktop/releases/latest/download/${file}`;

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
          Install Opal Desktop to record your screen and send recordings to your
          workspace. Choose the download for your computer.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {desktopDownloads.map(({ platform, file }, index) => (
            <a
              key={file}
              href={desktopDownloadUrl(file)}
              className={`inline-flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-bold transition ${
                index === 0
                  ? "bg-[#ff4c0f] text-black hover:bg-[#ff6a36]"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <Download size={18} />
              Download for {platform}
            </a>
          ))}
        </div>
        <ol className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm leading-6 text-white/55">
          <li>1. Download the installer for your computer.</li>
          <li>2. Install Opal. On Windows, setup opens Opal when it finishes.</li>
          <li>3. Sign in and record your screen; recordings appear in your workspace.</li>
        </ol>
      </div>
    </main>
  );
}
