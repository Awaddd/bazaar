import HomeProductGrid from "@/components/HomeProductGrid";
import { Button } from "@/components/ui/button";
import products from "@/features/products/products";
import { getQueryClient } from "@/lib/get-query-client";
import { cn } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
const HeroSection: React.FC = () => {
    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-600 to-blue-900 py-16 rounded-xl">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/10 via-transparent to-rose-700/10" />
                <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-white/80">Premium Sneaker Collection</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                            <span
                                className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent"
                                style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.15)' }}
                            >
                                Sneakers
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-white/70 mb-8 max-w-md">
                            Discover authentic sneakers from the world's most coveted brands.
                        </p>

                        <Button size="lg" className="!px-10 bg-primary/90 hover:bg-primary">
                            Browse Collection
                        </Button>
                    </div>

                    {/* Right Visual - Replace this with your custom art or 3D render */}
                    <div className="flex justify-center p-10">
                        <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/hero-sneaker-5.png"
                                alt="Hero Sneaker Visual"
                                fill
                                priority
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default async function Home() {
    // const products = await getProducts({ max: 6 })
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list({ limit: 6 }))

    const height = "h-[calc(100vh-110px)]"
    {/* <Link to="section2" smooth={true} duration={500}>Shop</Link> */ }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col space-y-5">
                {/* <section className={cn(height, "flex flex-grow flex-col space-y-8 justify-center items-center bg-muted rounded-xl")}>
                    <h1 className="text-7xl font-black">
                        <span className="text-muted-foreground">B</span>
                        <span className="text-muted-foreground/60">azar</span>
                    </h1>
                    <Button asChild size="lg" className="!px-24">
                        Shop
                    </Button>
                </section> */}
                <HeroSection />
                {/* <Element name="section2"> */}
                <section className={cn(height, "grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_4fr] gap-4")}>
                    <aside className="flex flex-1 flex-grow bg-muted rounded-xl"></aside>
                    <HomeProductGrid />
                </section>
                {/* </Element> */}
            </main>
        </HydrationBoundary>
    );
}
