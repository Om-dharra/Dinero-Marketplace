
import { SearchParams } from 'nuqs/server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient,trpc } from '@/trpc/server';
import { DEFAULT_LIMIT } from '@/constants';

import { ProductListView } from '@/modules/products/ui/views/product-list-view';
import { loadProductsFilters } from '@/modules/products/search-params';

interface Props {
  params:Promise<{
    subcategory: string;
  }>,
  searchParams:Promise<SearchParams>
}

const Page = async({ params,searchParams }:Props) => {
  const { subcategory } = await params;
  const queryClient=getQueryClient();

  const filters = await loadProductsFilters(searchParams);
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    category:subcategory,
    limit:DEFAULT_LIMIT,
  }
  ))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory}/>
    </HydrationBoundary>
  )
}

export default Page