import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}



const Layout = async ({ params, children }: LayoutProps) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
    slug, 
  }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>

    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar slug={slug}/>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          {children}

        </div>

      </div>
      <Footer />

    </div>
    </HydrationBoundary>
  )
}
export default Layout;