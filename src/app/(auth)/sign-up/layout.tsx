
import { Logo } from "@/components";
import { Metadata } from "next";
import React from "react"; 
export const metadata: Metadata = {
  title: "دیبا.پی | ثبت نام",
  description: "دیبا.پی", 
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return <div className="flex flex-1 flex-col items-center">
  <div className="mt-5"><Logo type={0}/></div>
  {children}
</div>
}