// components/ProductCard.tsx
import { FC } from 'react';
import { AddCartIcon } from './icons';
import { useCartStore } from '@/app/(root)/store';
import { _d } from '@/lib/utils';
import Image from "next/image"
interface ProductCardProps {
  item: any;
}

export const ProductCard: FC<ProductCardProps> = ({item}) => { 
  const addToCart = useCartStore(_ => _.add);
  
  return (
    <div className="product-card relative w-36 rounded-xl bg-primary p-4 pt-0 text-white shadow">
      <div className="flex justify-center">
        <Image src={`/product/${item.category.id}.webp`} alt={item.name} className="size-28" width={512} height={512}/>
      </div>
      <div className="mt-4 text-center">
        <div className="text-xs font-bold">{item.name}</div>
        <div className="mb-5 text-xs">{_d(item.price)} <small>{"تومان"}</small></div>
        <button className="add-to-cart" onClick={() => addToCart(item)}>
          <span className='cart-icon'>
            <AddCartIcon size={24}/>
          </span>
        </button>
      </div>
    </div>
  );
};