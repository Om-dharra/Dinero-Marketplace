import { StarRating } from "@/components/star-rating";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "lucide-react";



export const ProductReviews = ({ productId }: { productId: string }) => {
  const trpc = useTRPC();
  const { data: reviews } = useSuspenseQuery(
    trpc.reviews.getAllForProduct.queryOptions({ productId })
  );

  if (!reviews?.length) return <p>No reviews yet.</p>;

  return (
    <div className="p-4 flex flex-col gap-3 flex-1">
      <h2 className="text-lg font-medium line-clamp-4">All Reviews</h2>
      <Card className="border rounded-md bg-white overflow-hidden">
        <CardHeader className="pb-2">
          {reviews.map((review) => (

            <div key={review.id} className="mb-4 border-b pb-2">
              <div className="flex items-center space-x-2">
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <Badge fontVariant="secondary" className="w-4 h-4" />
                  Verified Purchase
                </span>
                <span className="text-xs text-gray-500">
                  {typeof review.user === "object" && review.user?.username
                    ? review.user.username
                    : "Anonymous"}
                </span>
                <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>

              </div>
              <CardContent className="py-2 space-y-2">
                <StarRating
                  rating={review.rating}
                  iconClassName="size-4"
                />
                <p className="text-sm text-gray-700">{review.description}</p>
              </CardContent>
            </div>
          ))}
        </CardHeader>
      </Card>
    </div>
  );
};