import { Product } from "./product.type"; // Path to your main Product interface

export interface ProductListResponse {
  status: string;
  count: number;
  data: Product[];
}