import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ScrollToTop from "./components/cards/shared/ScrollToTop";
import { Chatbot } from "./components/cards/shared/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Randy | Senior Full Stack & CMS Developer",
  description:
    "Full-stack and CMS developer with 10+ years of experience building and maintaining scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={inter.variable}>
      <body className="antialiased">
        <Header />
        {children}
        <Chatbot />
        <ScrollToTop />
      </body>
    </html>
  );
}
