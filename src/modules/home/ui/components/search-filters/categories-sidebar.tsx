import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CategoriesGetManyOutput } from "@/modules/categories/server/types";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}




export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategpry, setselectedCategpry] = useState<CategoriesGetManyOutput[1] | null>(null);

  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());
  const currentCategories = useMemo(
    () => parentCategories ?? data ?? [],
    [parentCategories, data]
  );

  useEffect(() => {
    if (!currentCategories) return;
    currentCategories.forEach((category) => {
      if (!category.subcategories || category.subcategories.length === 0) {
        router.prefetch(`/${category.slug}`);
      }
    });
  }, [currentCategories, router]);

  if (!data) { return <div>Loading...</div>; }

  const handleOpenChange = (open: boolean) => {
    setselectedCategpry(null);
    setParentCategories(null);
    onOpenChange(open);
  };



  const handleCategoryClick = async (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setselectedCategpry(category);
    } else {
      try {

        if (parentCategories && selectedCategpry) {
          await router.push(`/${selectedCategpry.slug}/${category.slug}`);
        } else {
          if (category.slug === 'all') {
            await router.push('/');
          } else {
            router.push(`/${category.slug}`);
          }
        }
        handleOpenChange(false);
      } catch (error) {
        console.error("Error navigating to category:", error);
      }
    
    }
  };
  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setselectedCategpry(null);
    }
  };

  const backgroundColor = selectedCategpry?.color || 'white';


  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category: CategoriesGetManyOutput[1]) => (
            (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
              >
                {category.name}
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronRightIcon className="size-4" />
                )}
              </button>
            )
          ))}

        </ScrollArea>

      </SheetContent>
    </Sheet>
  )
}