import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CategoriesGetManyOutput } from "@/modules/categories/server/types";

interface Props{
  open:boolean;
  onOpenChange: (open: boolean) => void;
}




export const CategoriesSidebar = ({
  open,
  onOpenChange,
}:Props) => {
  const trpc = useTRPC();
  const { data }=useQuery(trpc.categories.getMany.queryOptions());
  
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategpry, setselectedCategpry] = useState<CategoriesGetManyOutput[1] | null>(null);
  const handleOpenChange = (open: boolean) => {
    setselectedCategpry(null);
    setParentCategories(null);
    onOpenChange(open);
  };
  // const categories = data;
  const currentCategories =
  parentCategories
  ?? data   // ← grab the inner array
  ?? [];
  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setselectedCategpry(category);
    } else {
      if (parentCategories && selectedCategpry) {
        router.push(`/${selectedCategpry.slug}/${category.slug}`);
      } else {
        if (category.slug === 'all') {
          router.push('/'); // Redirect to home if 'all' category is selected
        } else {
          router.push(`/${category.slug}`); // Redirect to the selected category
        }
      }
      handleOpenChange(false); // Close the sidebar
    }
  };
  const handleBackClick = () => {
    if(parentCategories){
      setParentCategories(null);
      setselectedCategpry(null);
    }
  };

  const backgroundColor=selectedCategpry?.color || 'white';


  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
      side="left"
      className="p-0 transition-none"
      style={{ backgroundColor}}
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