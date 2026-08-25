import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Project Idea Generator | High-Fidelity Startup Blueprints",
  description: "Instantly synthesize modern, realistic, and trending software blueprints, complete with detailed folder structures, schemas, and interactive learning roadmaps.",
  keywords: ["AI Project Generator", "Hackathon Ideas", "Software Architecture Builder", "Learning Roadmaps", "Resume Boosters"],
  authors: [{ name: "NextGen Projector" }],
  openGraph: {
    title: "AI Project Idea Generator | Futuristic Startup Blueprints",
    description: "Generate highly professional software roadmaps and developer templates using advanced generative AI.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030303] text-[#f5f5f7] flex flex-col selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
