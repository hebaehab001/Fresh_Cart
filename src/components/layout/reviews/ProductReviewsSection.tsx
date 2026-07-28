"use client";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import { Review } from "@/types/review.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewUpdate from "./ReviewUpdate";
import { useReviews } from "@/hooks/useReviews";
export default function ProductReviewsSection({
  id,
  initialReviews,
}: {
  id: string;
  initialReviews: Review[];
}) {
  const {
    reviews,
    loading,
    userReview,
    actionState,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
  } = useReviews(id, initialReviews);

  return (
    <div className="col-span-2 space-y-6 w-full">
      <Tabs defaultValue="CustomerReviews" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="CustomerReviews">
            Customer Reviews
          </TabsTrigger>
          <TabsTrigger value="AddReview">
            Add Your review
          </TabsTrigger>
        </TabsList>
        <TabsContent value="CustomerReviews">
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
              <ReviewsList reviews={reviews} />
          )}
        </TabsContent>
        <TabsContent value="AddReview">
          {userReview ? (
            <ReviewUpdate
              review={userReview}
              isSaving={actionState === "update"}
              isDeleting={actionState === "delete"}
              onSave={(values) => handleUpdateReview(userReview._id, values)}
              onDelete={() => handleDeleteReview(userReview._id)}
             />
          ) : (
            <ReviewForm 
                isSubmitting={actionState === "add"}
                onSubmit={handleAddReview}
             />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
