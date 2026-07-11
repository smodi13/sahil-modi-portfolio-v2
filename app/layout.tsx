import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Display: a clean professional grotesk (Söhne / GT America family feel)
const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
  display: "swap",
});

// Body: neutral, highly readable sans
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahilmodi.vercel.app"),
  title: {
    default: "Sahil Modi — Finance & Technology",
    template: "%s — Sahil Modi",
  },
  description:
    "Finance and Computer Information Systems graduate from ASU W.P. Carey. I build investment tools at the intersection of quantitative research and software — for private equity, venture, growth, and AI-forward roles.",
  keywords: [
    "Sahil Modi",
    "venture capital analyst",
    "private equity",
    "financial modeling",
    "LBO",
    "quantitative",
  ],
  authors: [{ name: "Sahil Modi" }],
  openGraph: {
    title: "Sahil Modi — Finance & Technology",
    description:
      "Building at the intersection of investment analysis and quantitative systems.",
    url: "https://sahilmodi.vercel.app",
    siteName: "Sahil Modi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Modi — Finance & Technology",
    description:
      "Building at the intersection of investment analysis and quantitative systems.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
