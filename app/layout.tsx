import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { ThemeProvider } from "./provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Ali Mohamed's Portfolio | Solution Architect & Full Stack Developer",
    template: "%s | Ali Mohamed Portfolio",
  },
  description:
    "Explore the modern, minimalist portfolio of Ali Mohamed – Solution Architect, Full Stack Developer, and Tech Enthusiast. Showcasing projects, experience, and services in web development, System Architecture, and technology.",
  keywords: [
    "Ali Mohamed",
    "Portfolio",
    "Solution Architect",
    "Full Stack Developer",
    "Web Developer",
    "UI/UX Designer",
    "JavaScript",
    "Node.js",
    "React",
    "Next.js",
    "Frontend",
    "Backend",
    "Projects",
    "Minimalist Design",
    "Modern Web",
    "Tech Enthusiast",
  ],
  authors: [{ name: "Ali Mohamed", url: "https://alimohamed-dev.vercel.app/" }],
  creator: "Ali Mohamed",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "Ali Mohamed's Portfolio | Solution Architect & Full Stack Developer",
    description:
      "Discover the work and expertise of Ali Mohamed, a passionate Solution Architect & Full Stack Developer. Explore projects, skills, and services.",
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
    title:
      "Ali Mohamed's Portfolio | Solution Architect & Full Stack Developer",
    description:
      "Explore the modern, minimalist portfolio of Ali Mohamed – Full Stack Developer, UI/UX Designer, and Tech Enthusiast.",
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
