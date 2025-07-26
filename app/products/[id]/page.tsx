import getProducts from "@/app/actions/getProducts"
import BackButton from "@/components/BackButton"
import MoreProducts from "@/components/MoreProducts"
import Detail from "@/components/product/detail"
import Header from "@/components/product/header"
import ProductGallery from "@/components/ProductGallery"
import Sizes from "@/components/Sizes"
import { Button } from "@/components/ui/button"
import products from "@/features/products/products"
import { getQueryClient } from "@/lib/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { PackageX } from "lucide-react"

type Props = {
    params: Promise<{ id: string }>
}

export default async function ({ params }: Props) {
    const id = parseInt((await params).id)

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(products.get(id));
    await queryClient.prefetchQuery(products.list({ limit: 2 }))

    // hard coded
    const moreProducts = await getProducts({
        exclude: [id],
        max: 2
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="h-full relative flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-12">
                <div className="grid gap-2 lg:flex lg:flex-col md:gap-4">
                    <ProductGallery productId={id} />
                    <MoreProducts productId={id} className="hidden mt-4 xl:mt-8 md:block" />
                </div>

                <div className="flex flex-col space-y-3 lg:pt-2 xl:max-w-2/3">
                    <Header productId={id} />
                    <Sizes productId={id} />

                    <div className="grid grid-cols-2 gap-2 mt-7">
                        <Button variant="secondary" size="lg">Add to cart</Button>
                        <Button size="lg" className="flex space-x-2">
                            <span>💳</span>
                            Buy now
                        </Button>
                    </div>

                    <div className="text-sm text-muted-foreground mt-0.5 flex items-center space-x-1.5">
                        <PackageX size={16} />
                        <span>30 day return policy</span>
                    </div>

                    <section className="mt-5 flex flex-col space-y-6">
                        <Detail productId={id} />

                        <div>
                            <h4 className="text-xl font-semibold">Shipping & Returns</h4>
                            <p className="mt-2 text-muted-foreground">
                                Free shipping on orders over £100. Returns are accepted within 30 days of purchase.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold">Customer Reviews</h4>
                            <p className="mt-2 text-muted-foreground italic">
                                No reviews yet. Be the first to leave a review!
                            </p>
                        </div>

                        <MoreProducts productId={id} className="md:hidden" />
                    </section>
                </div>

                <BackButton />
            </main>
        </HydrationBoundary>
    )
}
