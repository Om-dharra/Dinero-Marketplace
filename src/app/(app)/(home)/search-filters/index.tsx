import { CustomCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
interface Props{
  data:CustomCategory[];
}


export const SearchFilters = ({data ,}:Props)=>{
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col hap-4 w-full justify-between gap-3">
      <SearchInput data={data}/>
      <div className="hidden lg:block">
        <Categories data={data} />

      </div>
   
    </div>
  );
};