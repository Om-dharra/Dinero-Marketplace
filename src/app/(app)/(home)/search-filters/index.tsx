"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/server/types";
interface Props{
  data:CategoriesGetManyOutput[1];
}


export const SearchFilters = () =>{
  const trpc= useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col hap-4 w-full justify-between gap-3"    
    style={{backgroundColor: "#F5F5F5"}}>
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />

      </div>
   
    </div>
  );
};

export const SearchFilterLoading = () => {
  const trpc= useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col hap-4 w-full justify-between gap-3"
    style={{backgroundColor: "#F5F5F5"}}>
      <SearchInput disabled/>
      <div className="hidden lg:block">
        <div className="h-11"></div>

      </div>
   
    </div>
  );
}