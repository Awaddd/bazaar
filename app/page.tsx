import FilterSidebar from "@/components/FilterSidebar";
import Hero from "@/components/Hero";
import HomeProductGrid from "@/components/HomeProductGrid";
import SortProducts from "@/components/SortProducts";
import { Input } from "@/components/ui/input";
import products from "@/features/products/products";
import { getQueryClient } from "@/lib/get-query-client";
import { cn } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Search } from "lucide-react";

export default async function Home() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list({ limit: 6 }))

    const height = "h-[calc(100vh-110px)]"
    {/* <Link to="section2" smooth={true} duration={500}>Shop</Link> */ }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col space-y-5">
                <Hero />
                {/* <Element name="section2"> */}
                <section className={cn(height, "grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_4fr] gap-4")}>
                    <FilterSidebar />

                    <div className="p-4">
                        <div className="flex justify-between align-bottom mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Drops</h2>
                                <p className="text-gray-600">Discover the newest additions to our collection</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <SortProducts />
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center ">
                                            <Search className="w-3 h-3 ml-2.5 text-muted-foreground" />
                                        </div>
                                        <Input
                                            placeholder="Search sneakers..."
                                            className="pl-8 bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <HomeProductGrid />
                    </div>
                </section>
                {/* </Element> */}
            </main>
        </HydrationBoundary>
    );
}
