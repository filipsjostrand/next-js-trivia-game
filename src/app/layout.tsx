import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../../components/footer";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trivia Game",
  description: "Generated with Open Trivia Database API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                  {/* Top-right Attribution */}
        <div className="text-gray-200 text-sm sm:absolute sm:top-2 sm:right-6 m-3">
            Photo:{" "}
            <a href="https://www.pexels.com/@fatih-turan-63325184/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300" >
            Faith Turan (Pexels) </a>
        </div>
        <Providers>
        {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
