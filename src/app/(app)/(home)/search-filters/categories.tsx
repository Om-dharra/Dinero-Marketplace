import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/payload-types"; // Adjust the import path as necessary
interface Props {
  data: any; // Use the correct type instead of 'any'
}

export const Categories = ({ data }: Props) => {
  
  return (
    <div>
      {data.map((category:Category) => (
        <div key={category.id} className="flex flex-col gap-2">
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  );
};
