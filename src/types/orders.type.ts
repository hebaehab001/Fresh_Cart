import { ShippingAddress } from "./addresses.type";
import { Product } from "./product.type";

export interface OrderItem {
  count: number;
  price: number;
  product: Product;
  _id: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: ShippingAddress;
  isPaid: boolean;
  isDelivered: boolean;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
}

// Typings for the raw API list response or your main state wrapper
export type UserOrdersResponse = Order[];