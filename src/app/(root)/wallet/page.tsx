"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react";

const Page = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return
    }
    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    })
  }, [api])
  return (
    <section className="flex-col justify-center flex-1 bg-blue-800 pt-12 flex">
      <Carousel opts={{ direction: "rtl" }} className="mb-4" setApi={setApi}>
        <CarouselContent>
          <CarouselItem className="basis-2/3 px-0">
            <CarouselCard index={0}/>
          </CarouselItem>
          <CarouselItem className="basis-2/3 px-0">
            <CarouselCard index={1}/>
          </CarouselItem>
          <CarouselItem className="basis-2/3">
            <CarouselCard index={2}/>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="flex-1 bg-white rounded-t-xl px-3 py-4">
        {currentIndex}
      </div>

    </section>
  )
}

export default Page

const Gradient = ({ to = "" }: any) => <div className={cn("bg-gradient-to-br from-transparent z-0 inset-0 absolute size-full", to === 1 ? "to-[#B8860B]" : to === 2 ? "to-slate-800" : "to-blue-800")}></div>

const CarouselCard = ({ index }: { index: number }) => {
  
  const cardClass = "h-fit relative m-3 rounded-2xl overflow-hidden text-white px-5 py-3 shadow-lg"
  const wallet = index === 0 ? "کیف‌پول من" : index === 1 ? "کیف طلا" : "کیف نقره"
  const color = index === 0 ? "bg-blue-500" : index === 1 ? "bg-amber-100" : "bg-slate-300"

  return <div className={cn(cardClass, color)} dir="rtl">
    <Gradient to={index} />
    <div className="relative z-10 select-none text-white flex flex-col relative" >
      <div className="flex flex-col">
        <small>موجودی</small>
        <small>۱۲۳۴ میلی گرم</small>
      </div>
      <div className="flex flex-col mt-5">
        <small>معادل</small>
        <small>12439234</small>
      </div>
      <span className="text-left absolute bottom-0 left-0 text-[10px]">{wallet}</span>
    </div>
  </div>
}