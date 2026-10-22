import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Syne } from "next/font/google";
import { SmoothProvider } from "@/components/SmoothProvider";
import "./globals.css";

const title = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-title",
  display: "swap",
});

const label = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-label",
  display: "swap",
});

const body = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanisha | Freelance Portfolio",
  description:
    "Freelance AI/ML engineer and team leader. AI powered apps, agents, custom software, and data analytics.",
  openGraph: {
    title: "Tanisha | Freelance Portfolio",
    description:
      "LLMs, RAG, AI agents, custom web and app development, and practical analytics.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff4da0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${title.variable} ${label.variable} ${body.variable}`}>
        <SmoothProvider>{children}</SmoothProvider>
      </body>
    </html>
  );
}
