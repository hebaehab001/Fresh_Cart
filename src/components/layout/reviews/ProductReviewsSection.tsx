"use client";
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import { Review } from "@/types/review.type";
import { getProductReviews } from "@/APIs/reviews.api";
import { getUserIdAction } from "@/Actions/UserActions/getUserIdAction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewUpdate from "./ReviewUpdate";
export default function ProductReviewsSection({
  id,
  initialReviews,
}: {
  id: string;
  initialReviews: Review[];
}) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const userReview = reviews.find(
    (review) => review.user._id === currentUserId,
  );
  const [loading, setLoading] = useState(false);

  // ✅ Fetch both at the same time
  useEffect(() => {
    const init = async () => {
      // Get user ID
      const userId = await getUserIdAction();
      setCurrentUserId(userId);

      // Fetch reviews
      setLoading(true);
      const response = await getProductReviews(id);
      if (response.data) {
        setReviews(response.data);
      }
      setLoading(false);
    };

    init();
  }, [id]);

  const fetchReviews = async () => {
    setLoading(true);
    const response = await getProductReviews(id);
    if (response.data) {
      setReviews(response.data);
    }
    setLoading(false);
  };
  return (
    <div className="col-span-2 space-y-6 w-full">
      <Tabs defaultValue="CustomerReviews" className="w-full">
        <TabsList className={undefined} variant="line">
          <TabsTrigger value="CustomerReviews" className={undefined}>
            Customer Reviews
          </TabsTrigger>
          <TabsTrigger value="AddReview" className={undefined}>
            Add Your review
          </TabsTrigger>
        </TabsList>
        <TabsContent value="CustomerReviews" className={undefined}>
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <ReviewsList reviews={reviews} currentUserId={currentUserId} />
          )}
        </TabsContent>
        <TabsContent value="AddReview" className={undefined}>
          {userReview ? (
            <ReviewUpdate review={userReview} onReviewDeleted={fetchReviews} />
          ) : (
            <ReviewForm id={id} onReviewAdded={fetchReviews} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
