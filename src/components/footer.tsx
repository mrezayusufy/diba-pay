"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GearIcon, HomeIcon, TrxIcon, UserIcon } from "./icons"
import { WalletIcon } from "./icons";
 
function Footer() {
  return <footer>
    <ul className="flex justify-around">
      <MenuIcon to={{pathname:"/"}}>
        <HomeIcon size={24}/>
        <div>خانه</div>
      </MenuIcon>
      
      <MenuIcon to={{pathname: "/wallet", query: {navType: 0}}}> 
        <WalletIcon size={24}/>
        <div>کیف‌پول</div>
      </MenuIcon>
      <MenuIcon to={{pathname: "/account"}}>
        <UserIcon size={24}/>
        <div >حساب کاربری</div>
      </MenuIcon>
      <MenuIcon to={{pathname:"/transactions"}}> 
        <TrxIcon size={24}/>
        <div>تراکنش‌ها</div>
      </MenuIcon>
      <MenuIcon to={{pathname:"/settings"}}>
        <GearIcon size={24}/>
        <div>تنظیمات</div>
      </MenuIcon>
    </ul>
  </footer>
}

export default Footer
const MenuIcon: FC<{ children: ReactNode, className?: string, to: any }> = ({ children, className, to }) => {
  const pathname = usePathname();
  return <li className="h-12 w-7">
  <Link href={to} className={cn(["flex flex-col text-nowrap items-center text-primary hover:opacity-100 transition-all ease-in-out hover:cursor-pointer",
     pathname === to.pathname ? 'opacity-100': 'opacity-60'])}>{children}</Link>
</li>
}