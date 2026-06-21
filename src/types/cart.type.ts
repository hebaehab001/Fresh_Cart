import { Product } from "./product.type";

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Partial<Product>;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

