

import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const maxRating = 5;
const minRating = 0;

interface StarRatingProps {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  iconClassName,
  text,
}: StarRatingProps) => {
  const safeRating=Math.max(minRating, Math.min(maxRating, rating));
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            safeRating > index ? "fill-black" : "text-gray-300",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}

    </div>
  )
}
