import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';


import { Footer } from "./footer";
import { Navbar } from "./navbar"
import { SearchFilterLoading, SearchFilters } from "./search-filters";
import { Suspense } from 'react';



interface Props{
  children: React.ReactNode;
}
const layout =async ({children}:Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
      /** input */
  
  );   

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading/>}>
          <SearchFilters/>

        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">
      {children}

      </div>
    <Footer/>

    </div>
    
  )
}
export default layout