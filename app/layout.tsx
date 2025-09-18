import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { ThemeProvider } from "./provider";
import Chatbot from "@/components/Chatbot/Chatbot";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ali Mohamed | Full Stack Developer & AI Solutions Architect",
    template: "%s | Ali Mohamed Portfolio",
  },
  description:
    "Portfolio of Ali Mohamed – Full Stack Developer and AI Solutions Architect. Showcasing expertise in web development, system architecture, and AI-powered applications.",
  keywords: [
    "Ali Mohamed",
    "Full Stack Developer",
    "AI Developer",
    "AI Solutions Architect",
    "React Developer",
    "Node.js Developer",
    "Next.js",
    "Nest.js",
    "Web Applications",
    "Generative AI",
    "Chatbot Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Ali Mohamed", url: "https://alimohamed-dev.vercel.app/" }],
  creator: "Ali Mohamed",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ali Mohamed | Full Stack Developer & AI Solutions Architect",
    description:
      "Discover the work of Ali Mohamed, a passionate Full Stack Developer & AI Solutions Architect. Explore projects in modern web development and AI-powered systems.",
    url: "https://alimohamed-dev.vercel.app/",
    siteName: "Ali Mohamed Portfolio",
    images: [
      {
        url: "/op-personal.png",
        width: 800,
        height: 600,
        alt: "Ali Mohamed Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Mohamed | Full Stack Developer & AI Solutions Architect",
    description:
      "Explore the modern portfolio of Ali Mohamed – Full Stack Developer and AI Solutions Architect. Showcasing AI-powered apps, web projects, and solutions.",
    creator: "@AliMohamed_Dev",
    images: ["/op-personal.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
