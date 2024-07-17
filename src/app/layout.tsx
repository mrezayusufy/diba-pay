import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/query-client-provider";
import '@/lib/intl-phone-format';
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/providers";

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
  console.log("------------------------------------------")

  const token = cookies().get("token")?.value as string;
  return (
    <html lang="fa" dir="rtl"> 
      <head><link rel="icon" href="/logo.svg" sizes="any" /></head>
      <AuthProvider token={token}>
        <QueryProvider>
          <body className={`${yekanBakh.variable} flex flex-col min-h-lvh mx-auto items-center overflow-hidden bg-[#FFFAF1]`}>
            {children}
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  );
}
