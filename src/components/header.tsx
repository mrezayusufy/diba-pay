"use client";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CartIcon } from "./icons";
import { Logo } from "./logo"; 

export function Header() {
  const params = useSearchParams();
  const navType = params.get("navType");
  const d = navType && Number(navType) === 0;
  const c = d ? "text-white":"text-primary";
  return <header className="z-10 ">
    <nav className={d ? "bg-transparent shadow-none" : "h-12 mb-3"}>
      <button className={c}>
        <Menu size={32} />
      </button>
      <Logo type={d ? 1 : 0}/> 
      <button className={c}>
        <CartIcon />
      </button>
    </nav>
  </header>
}