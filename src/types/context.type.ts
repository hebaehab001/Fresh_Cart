import { CartItem } from "./cart.type";
import { Product } from "./product.type";

export interface WishListContextType {
  numOfFav: number;
  products: Product[];
  isLoading: boolean;
  error: string;
  addProductToFav: (id: string) => Promise<any>;
  removeFavItem: (id: string) => Promise<any>;
}

export interface CartContextType {
  numOfCart: number;
  products: CartItem[];
  totalPrice: number;
  isLoading: boolean;
  cartId: string;
  error: string;
  addProductToCart: (id: string) => Promise<any>;
  removeCartItem: (id: string) => Promise<any>;
  updateCartItem: (id: string, count: number) => Promise<any>;
  removeAllCartItem: () => Promise<any>;
  afterPayment: () => void;
}