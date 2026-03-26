import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import ScrollToTop from "./components/cards/shared/ScrollToTop";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  GITHUB_URL,
  STACK_OVERFLOW_URL,
} from "../libs/seo";
// import { Chatbot } from "./components/cards/shared/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | Randy Listrud",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Randy Listrud",
    "Randy",
    "Listrud",
    "senior developer",
    "senior full stack developer",
    "full stack engineer",
    "CMS developer",
    "WordPress developer",
    "Drupal developer",
    "headless CMS",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "web application development",
    "web performance optimization",
    "Core Web Vitals",
    "cloud infrastructure",
    "deployment pipelines",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  authors: [{ name: "Randy Listrud" }],
  icons: {
    icon: "/logo.png",
  },
  other: {
    github: GITHUB_URL,
    stackoverflow: STACK_OVERFLOW_URL,
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
      data-scroll-behavior="smooth"
      className={inter.variable}
    >
      <body className="antialiased">
        <Header />
        {children}
        {/* <Chatbot /> */}
        <ScrollToTop />
      </body>
    </html>
  );
}
