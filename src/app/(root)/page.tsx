import { ProductsList } from "@/components";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="items-center justify-items-center py-3 font-sans">
      <Categories/>
      <h1 className="mb-2 mt-3 text-sm font-semibold text-gray-400">محصولات</h1>
      <ProductsList/>
    </div>
  );
}
