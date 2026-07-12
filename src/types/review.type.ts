export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number; // 1-5
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateReviewData {
  review: string;
  rating: number;
}

export interface UpdateReviewData {
  review?: string;
  rating?: number;
}

export interface GetReviewsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Review[];
}

export interface GetReviewByIdResponse {
  data: Review;
}

export interface ReviewActionResponse {
  success: boolean;
  message: string;
  data?: Review;
}