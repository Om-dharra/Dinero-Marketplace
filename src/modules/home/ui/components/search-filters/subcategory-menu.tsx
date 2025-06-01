import { CategoriesGetManyOutput } from "@/modules/categories/server/types";
import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: CategoriesGetManyOutput[1];
  // Indicates if the subcategory menu is open
  isOpen: boolean;
}

export const SubcategoryMenu = ({
  category,
  isOpen,
}: Props) => {
  // Hide menu if not open or no subcategories
  if (
    !isOpen ||
    !Array.isArray(category.subcategories) ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";
  return (
    <div
      className="absolute z-100"
      style={{
        top: "100%",
        left: 0,
      }}
    >
      <div className="h-3 w-60" />

      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};