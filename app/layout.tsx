import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil Modi — Finance and Technology Analyst",
  description:
    "Finance and Computer Information Systems graduate from ASU W.P. Carey. Venture capital analyst, financial modeler, and quantitative systems builder. Seeking VC analyst and investment roles.",
  openGraph: {
    title: "Sahil Modi — Finance and Technology Analyst",
    description:
      "Building at the intersection of investment analysis and quantitative systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
