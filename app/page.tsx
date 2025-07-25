import HomeProductGrid from "@/components/HomeProductGrid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import products from "@/features/products/products";

export default async function Home() {
    // const products = await getProducts({ max: 6 })
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list())

    const height = "h-[calc(100vh-110px)]"

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col space-y-5">
                <section className={cn(height, "flex flex-grow flex-col space-y-8 justify-center items-center bg-muted rounded-xl")}>
                    <h1 className="text-7xl font-black">
                        <span className="text-muted-foreground">B</span>
                        <span className="text-muted-foreground/60">azar</span>
                    </h1>
                    <Button asChild size="lg" className="!px-24">
                        Shop
                        {/* <Link to="section2" smooth={true} duration={500}>Shop</Link> */}
                    </Button>
                </section>
                {/* <Element name="section2"> */}
                <section className={cn(height, "grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_3fr] gap-4")}>
                    <aside className="flex flex-1 flex-grow bg-muted rounded-xl"></aside>
                    <HomeProductGrid />
                </section>
                {/* </Element> */}
            </main>
        </HydrationBoundary>
    );
}
