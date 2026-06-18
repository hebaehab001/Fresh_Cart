// Common types used everywhere
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

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
