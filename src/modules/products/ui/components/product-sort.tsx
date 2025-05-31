
"use client";

import { Button } from "@/components/ui/button";
import { useProductsFilters } from "../../hooks/use-products-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductsFilters();
  return (
    <div className="flex items-center gap-2">
      <Button
      size="sm"
      className={cn("rounded-full bg-white",
        filters.sort!== "curated" && 
        "bg-transparent hover:border-border hover:bg-transparent")}
      variant="secondary"
      onClick={() => setFilters({ sort: "curated" })}>
        Curated
      </Button>
      <Button
      size="sm"
      className={cn("rounded-full bg-white",
        filters.sort!== "trending" && 
        "bg-transparent hover:border-border hover:bg-transparent")}
      variant="secondary"
      onClick={() => setFilters({ sort: "trending" })}>
        Trending
      </Button>
      <Button
      size="sm"
      className={cn("rounded-full bg-white",
        filters.sort!== "Hyped" && 
        "bg-transparent hover:border-border hover:bg-transparent")}
      variant="secondary"
      onClick={() => setFilters({ sort: "Hyped" })}>
        Hyped
      </Button>
    </div>
  )
}