
"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryDropdown } from "./category-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/server/types";

interface Props {
  data: CategoriesGetManyOutput;
}

export const Categories = ({ data }: Props) => {
  // Convert to array if needed
  
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setisAnyHovered] = useState(false);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const activeCategory = "all";
  const activeCategoryindex = data.findIndex((cat) => cat.slug === activeCategory);
  const isActiveCategoryHidden = activeCategoryindex >= visibleCount && activeCategoryindex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return;
      }
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;
      for (const item of items) {
        const width = (item as HTMLElement).getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) {
          break;
        }
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };
    // Optionally, you can call calculateVisible here or on resize
    const resizeObserver = new ResizeObserver(calculateVisible);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [data.length]);



  return (
    <div className="relative w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setisSidebarOpen}/>
      <div
      ref={measureRef}
      className="absolute opacity-0 pointer-events-none flex"
      style={{ position: "fixed",top:-9999, left: -9999 }}>
        {data.map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      <div
      ref={containerRef}
      className="flex flex-nowrap items-center"
      onMouseEnter={() => setisAnyHovered(true)}
      onMouseLeave={() => setisAnyHovered(false)}>
        {data.slice(0,visibleCount).map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
          variant="elevated"  
          className={cn("h-11 px-4 transparent border-transparent rounded-full bg-white hover:bg-white hover:border-primary text-black",
            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",
          )}
          onClick={() => setisSidebarOpen(true)}>
            View All
            <ListFilterIcon/>

          </Button>

        </div>
      </div>
    </div>
  );
};