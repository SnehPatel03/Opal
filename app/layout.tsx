import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./components/theme-provider";
import ReactQueryProvider from "./react-query";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/Provider";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opal",
  description: "Share AI Powered videos with your friends",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <ReactQueryProvider>
              <ReduxProvider>{children}</ReduxProvider>
              <Toaster position="top-right" />
            </ReactQueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
