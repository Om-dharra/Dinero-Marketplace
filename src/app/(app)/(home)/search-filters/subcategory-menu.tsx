import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: Category;
  isOpen: boolean;
  getDropdownPosition: {
    top: number;
    left: number;
  };
}

export const SubcategoryMenu = ({
  category,
  isOpen,
  getDropdownPosition,
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
      className="fixed z-100"
      // style={{
      //   top: getDropdownPosition.top,
      //   left: getDropdownPosition.left,
      // }}
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
              href="/"
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