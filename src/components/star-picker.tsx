
"use Client"

import { useState } from "react"
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

interface StarPickerProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({
  value = 0,
  onChange,
  disabled,
  className,
}: StarPickerProps) => {
  const [hoveredValue, setHoveredValue] = useState(0);

  const handleOnChange =(value:number) => {
    if (disabled) return;
    onChange?.(value);
  }

  return (
    <div className={cn("flex items-center",disabled && "opacity-50 cursor-not-allowed", className)}>
      {[1,2,3,4,5].map((star)=>(
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn("p-0.5 hover:scale-110",!disabled && "cursor-pointer")}
          onClick={() => onChange?.(star)}
          onMouseEnter={()=>setHoveredValue(star)}
          onMouseLeave={()=>setHoveredValue(0)}
          
          >
            <StarIcon
              className={cn("size-5",(hoveredValue || value) >= star ? "fill-black" : "stroke-black")}
            />

          </button>
      ))}
    </div>
  );
};