import { ProductsList } from "@/components";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-semibold text-slate-400">محصولات</h1>
      <ProductsList/>
    </div>
  );
}
