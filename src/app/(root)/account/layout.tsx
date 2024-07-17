import React from "react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "حساب من",
  description: "دیبا.پی",
}; 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
