import { Brand } from "./brands.type";
import { CartData } from "./cart.type";
import { Category } from "./categories.type";
import { MetaDataResponse } from "./common.type";
import { Order } from "./orders.type";
import { Product } from "./product.type";
import { ShippingAddress } from "./profile.type";

export type ApiResponse = {
  session?: any;
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

export interface OrderApiResponse {
  success: boolean;
  message?: string;
  data?: Order[];
}

export interface BrandApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Brand[];
}

export interface CategoryApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Category[];
}

export interface SpecificBrandApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Brand;
}

export interface SpecificCategoryApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Category;
}

export interface ProductApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Product[];
}

export interface SpecificProductApiResponse {
  success: boolean;
  message?: string;
  results?: number;
  metadata?: MetaDataResponse;
  data?: Product;
}

export interface AddressesApiResponse {
  success: boolean;
  message?: string;
  status?: string;
  results?: number;
  data?: ShippingAddress[];
}