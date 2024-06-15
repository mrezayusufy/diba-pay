// components/ProductCard.tsx
import { FC } from 'react';
import { AddCartIcon } from './icons';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

export const ProductCard: FC<ProductCardProps> = ({ title, price, image }) => {
  const p = new Intl.NumberFormat('fa-IR').format(price);
  const pay = (price: string) => {
    
  }
  return (
    <div className="bg-primary shadow rounded-xl p-4 pt-0 text-white relative product-card w-40">
      <div className="flex justify-center">
        <img src={image} alt={title} className="size-28" />
      </div>
      <div className="text-center mt-4">
        <div className="font-bold text-xs">{title}</div>
        <div className="mb-5 text-xs">{p} <small>{"تومان"}</small></div>
        <button className="add-to-cart " onClick={() => pay(p)}>
          <span className='cart-icon'>
            <AddCartIcon size={24}/>
          </span>
        </button>
      </div>
    </div>
  );
};