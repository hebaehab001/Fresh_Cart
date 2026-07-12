import { GetReviewsResponse, Review, GetReviewByIdResponse, CreateReviewData, ReviewActionResponse, UpdateReviewData } from "@/types/review.type";

// Get all reviews for a specific product
export async function getProductReviews(
  id: string,
): Promise<GetReviewsResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS}/${id}/reviews`,
    );
    const result: GetReviewsResponse = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return result;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      results: 0,
      metadata: {
        currentPage: 1,
        numberOfPages: 0,
        limit: 40,
      },
      data: [],
    };
  }
}

// Get a specific review by ID
export async function getReviewById(id: string): Promise<Review | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REVIEWS}/${id}`);
    const result: GetReviewByIdResponse = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch review");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
}

// Create a new review for a product
export async function createReview(
  id: string,
  data: CreateReviewData,
  token: string,
): Promise<ReviewActionResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS}/${id}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create review",
      };
    }

    return {
      success: true,
      message: "Review created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error creating review:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}

// Update a review
export async function updateReview(
  id: string,
  data: UpdateReviewData,
  token: string,
): Promise<ReviewActionResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REVIEWS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update review",
      };
    }

    return {
      success: true,
      message: "Review updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating review:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}

// Delete a review
export async function deleteReview(
  id: string,
  token: string,
): Promise<ReviewActionResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REVIEWS}/${id}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

        let result;
        if (res.ok && res.status === 204) {
          // 204 No Content - empty response is expected
          result = { data: {} };
        } else if (res.status === 200) {
          // 200 OK - try to parse JSON
          const text = await res.text();
          result = text ? JSON.parse(text) : { data: {} };
        } else {
          result = await res.json();
        }


    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete review",
      };
    }

    return {
      success: true,
      message: "Review deleted successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}
