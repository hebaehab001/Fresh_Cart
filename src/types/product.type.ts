import { Brand } from "./brands.type";
import { Category, Subcategory } from "./categories.type";
import { MetaDataResponse } from "./common.type";
import { Review } from "./review.type";

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  images: string[];
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Partial<Category>;
  subcategory: Partial<Subcategory[]>;
  brand: Partial<Brand>;
  createdAt: string;
  updatedAt: string;
}

export interface SpecificProductResponse extends Product {
  reviews: Review[];
  __v: number;
}

export interface ProductResponse {
  results: number;
  metadata: MetaDataResponse;
  data: Product[];
}