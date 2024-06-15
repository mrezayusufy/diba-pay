import type { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "دیبا.پی",
  description: "دیبا.پی",
};

export default function Layout({children}:Readonly<{
  children: React.ReactNode;
}>){
  return <div className="flex h-lvh flex-col">
      <Toaster />
      {children}
      </div>

}