import Hero from "@/components/home/Hero";
import ScrollWrapper from "@/components/home/ScrollWrapper";
import ProductsList from "@/components/ProductsList";
import products from "@/features/products/products";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list({ limit: 6 }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col space-y-5">
                <Hero />
                <ScrollWrapper>
                    <ProductsList />
                </ScrollWrapper>
            </main>
        </HydrationBoundary>
    );
}
