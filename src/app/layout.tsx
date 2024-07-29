import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RepliBot",
  description: "Real feedback from real people.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
