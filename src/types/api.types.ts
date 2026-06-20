import { CartData } from "./cart.type";
import { Product } from "./product.type";

export type ApiResponse = {
  success: boolean;
  message?: string;
};

export type ApiDataResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export interface ApiParams {
  token?: string;
  id?: string;
  count?: number;
}

export interface ApiDataParams<T> {
  token?: string;
  id?: string;
  data: T;
}

export interface WishListApiResponse {
  success: boolean;
  message?: string;
  data?: Product[];
  count?: number;
}

export interface CartApiResponse {
  success: boolean;
  message?: string;
  data?: CartData;
  numOfCartItems?: number;
  cartId?: string;
}