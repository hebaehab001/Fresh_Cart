// Common types used everywhere
export interface MetaDataResponse {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface ValidationError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ErorrResponse {
  message: "success" | "fail";
  errors?: ValidationError;
}

export interface PagePropsParams {
  params: Promise<{
    id: string;
  }>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type SortOption = "name" | "price-asc" | "price-desc" | "newest";

