"use client";
import { Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartIcon } from "./icons";
import { Logo } from "./logo"; 
import { useCartStore } from "@/app/(root)/store";
import { cn } from "@/lib/utils";

export function Header() {
  const params = useSearchParams();
  const cart = useCartStore(_ => _.cart);
  const navType = params.get("navType");
  const router = useRouter()
  const d = navType && Number(navType) === 0;
  const c = d ? "text-white":"text-primary";
  return <header className="z-10 mx-auto">
    <nav className={d ? "bg-transparent shadow-none" : "h-12 mb-3"}>
      <button className={c}>
        <Menu size={32} />
      </button>
      <Logo type={d ? 1 : 0}/> 
      <button className={cn(c, 'relative')} onClick={() => router.push("/cart")}>
        <div className={cn("absolute text-[8px]  text-white size-3 circle py-[1px] z-10", cart.length === 0 && "hidden")}>{cart?.length}</div>
        <CartIcon />
      </button>
    </nav>
  </header>
}