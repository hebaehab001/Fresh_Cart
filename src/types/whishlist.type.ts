import { Product } from "./product.type"; 

export interface WishList{
  status: string;
  count: number;
  data: Product[];
}

