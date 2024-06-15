import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return <div className="grid place-content-center h-svh items-center select-none">
    <Image width={320} height={320} src="/404.svg" alt="" loading="lazy"/>
    <div className="flex justify-center flex-col items-center gap-7 ">
      <span>با عرض پوزش صفحه مورد نظر پیدا نشد!</span>
      <Link href={"/"} className="bg-primary text-white px-5 py-2 rounded-full hover:cursor-pointer" >
         به عقب برگرد 
      </Link>
    </div>
  </div>;
};
