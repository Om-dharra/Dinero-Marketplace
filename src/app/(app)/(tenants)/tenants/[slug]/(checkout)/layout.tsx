import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from "@/trpc/server";


import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/checkout/ui/components/navbar"
import { SearchFilterLoading, SearchFilters } from "@/modules/home/ui/components/search-filters";
import { Suspense } from 'react';



interface Props{
  children: React.ReactNode;
  params:Promise<{slug:string}>;
}
const layout =async ({children, params}:Props) => {
  const { slug }= await params;
 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar slug={slug}/>
      <div className='flex-1'>
        <div className="flex-1 bg-[#F4F4F0]">
          {children}
        </div>
      </div>
    

    <Footer/>

    </div>
    
  )
}
export default layout