import { CustomCategory } from "../types";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: { formattedData?: CustomCategory[] } | CustomCategory[];
}

export const Categories = ({ data }: Props) => {
  // Convert to array if needed
  const categories = Array.isArray(data)
    ? data
    : Array.isArray(data?.formattedData)
      ? data.formattedData
      : [];

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};