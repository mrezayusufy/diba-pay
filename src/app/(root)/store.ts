import { Product } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
 
type CartItem = Product & {
  order_quantity: number,
}
type CartState = {
  cart: CartItem[],
  add: (item: any) => void,
  remove: (id: string) => void,
  increment: (id: string) => void,
  decrement: (id: string) => void,
  totalSum: () => number,
}
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalSum: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price, 0);
      },
      add: (product) => set((_) => {
        // const isExist = _.cart.find(item => item.id === product.id);
        // if(isExist){
        //   return {
        //     cart: _.cart.map(item => item.id === product.id 
        //       ?{...item, order_quantity: item.order_quantity+1}
        //       : item
        //     )
        //   }
        // }
        return {cart: [..._.cart, {...product, order_quantity: 1}]}
      }),
      remove: (id) => set(_ => ({cart: _.cart.filter(item => item.id !== id)})),
      increment: (id) => set(_ => ({
        cart: _.cart.map(item => item.id === id 
          ?{...item, order_quantity: item.order_quantity + 1}
          : item
        )
      })),
      decrement: (id) => set(_ => ({
        cart: _.cart.map(item => item.id === id 
          ?{...item, order_quantity: item.order_quantity - 1}
          : item
        )
      })),
    }),
    { name: 'cart' }
  )
)
export { useCartStore }