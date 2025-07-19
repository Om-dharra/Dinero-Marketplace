"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProductsFilters } from "../../hooks/use-products-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
  const [filters] = useProductsFilters();
  const trpc = useTRPC();

  // The useInView hook gives us a ref to attach to an element and an `inView` boolean
  const { ref, inView } = useInView({
    threshold: 0, // Trigger as soon as the element is visible
    rootMargin: "400px", // Start loading 400px before the element is in view for a smoother experience
  });

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          tenantSlug,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            // If the last page has docs, return the next page cursor, otherwise undefined
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  // This effect triggers the fetch for the next page
  useEffect(() => {
    // Check if the trigger element is in view, if there's a next page, and if we're not already fetching
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon className="size-8 text-neutral-400" />
        <p className="text-base font-medium text-neutral-600">No Products Found</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewCount}
              price={product.price}
            />
          ))}
        
        {/* While fetching the next page, show skeleton loaders */}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>

      {/* This is the invisible trigger element. 
          We attach the ref to it. It has no height unless we're out of pages. */}
      <div ref={ref} className="h-1 w-full mt-4" />
      
      {!hasNextPage && !isFetchingNextPage && (
        <div className="text-center text-neutral-500 py-8">
            <p>You&apos;ve reached the end.</p>
        </div>
      )}
    </>
  );
};

export const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
