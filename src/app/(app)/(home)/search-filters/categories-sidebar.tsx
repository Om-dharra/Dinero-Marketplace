import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props{
  open:boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}




export const CategoriesSidebar = ({
  open,
  onOpenChange,
  data,
}:Props) => {
  
  
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategpry, setselectedCategpry] = useState<CustomCategory | null>(null);
  const handleOpenChange = (open: boolean) => {
    setselectedCategpry(null);
    setParentCategories(null);
    onOpenChange(open);
  };
  const currentCategories=parentCategories ?? data ?? [];
  console.log("brothereww",currentCategories)
  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
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
  const backgroundColor=selectedCategpry?.color || 'white';


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
              onClick={() => {}}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category: CustomCategory) => (
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
          ))}

        </ScrollArea>
        
      </SheetContent>
      </Sheet>
  )
}