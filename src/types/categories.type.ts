import { MetaDataResponse } from "./common.type";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CategoryResponse {
  results: number;
  metadata: MetaDataResponse;
  data: Category[];
}

export interface SidebarFilterationProps {
  data: Category[];
  title: string;
  selected: string | null;
  onSelect: (value: string | null) => void; 
}