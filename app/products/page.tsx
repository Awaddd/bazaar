import { Suspense } from "react";
import ProductsList from "@/components/ProductsList";
import products from "@/features/products/products";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

function ProductsListFallback() {
    return (
        <div className="h-[calc(100vh-110px)] grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_4fr] gap-4">
            <div className="p-6 space-y-6 border-r border-border animate-pulse">
                <div className="h-6 w-20 bg-muted rounded" />
                <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-5 w-24 bg-muted rounded" />
                    ))}
                </div>
            </div>
            <div className="p-4">
                <div className="mb-8">
                    <div className="h-8 w-48 bg-muted rounded mb-2" />
                    <div className="h-5 w-64 bg-muted rounded" />
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function ProductsPage() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list({}))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col">
                <Suspense fallback={<ProductsListFallback />}>
                    <ProductsList
                        title="All Products"
                        description="Browse our complete sneaker collection"
                    />
                </Suspense>
            </main>
        </HydrationBoundary>
    );
}
