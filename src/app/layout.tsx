import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/query-client-provider";
import '@/lib/intl-phone-format';

const yekanBakh = localFont({
  src: "./fonts/YekanBakh-Regular.woff",
  variable: "--font-yekan-bahk",
});

export const metadata: Metadata = {
  title: "دیبا.پی",
  description: "دیبا.پی",
  // manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="fa" dir="rtl"> 
      <head><link rel="icon" href="/logo.svg" sizes="any" /></head>
      <QueryProvider>
        <body className={`${yekanBakh.variable} flex flex-col min-h-lvh mx-auto items-center overflow-hidden bg-[#FFFAF1]`}>
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
