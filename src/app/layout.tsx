import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/lib/site";

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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

const nav = [
  { href: "/", label: "Index" },
  { href: "/writing", label: "Writing" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col`}
      >
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
            <Link href="/" className="font-medium tracking-[-0.01em]">
              {site.name}
            </Link>
            <nav className="flex gap-5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-3 px-6 py-6">
            <p className="font-mono text-[11px] text-muted-foreground">
              {site.location}
            </p>
            <div className="flex gap-4">
              {Object.entries(site.links).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
