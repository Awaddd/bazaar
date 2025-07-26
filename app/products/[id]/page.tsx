import getProduct from "@/app/actions/getProduct"
import getProducts from "@/app/actions/getProducts"
import BackButton from "@/components/BackButton"
import MoreProducts from "@/components/MoreProducts"
import ProductGallery from "@/components/ProductGallery"
import Rating from "@/components/Rating"
import Sizes from "@/components/Sizes"
import { Button } from "@/components/ui/button"
import products from "@/features/products/products"
import { getQueryClient } from "@/lib/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { PackageX } from "lucide-react"

type Props = {
    params: { id: string }
}

export default async function ({ params }: Props) {
    const queryClient = getQueryClient();

    const id = parseInt(params.id)
    await queryClient.prefetchQuery(products.get(id));

    // const product = await getProduct(params.id)

    const moreProducts = await getProducts({
        exclude: [parseInt(params.id)],
        max: 2
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="h-full relative flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-12">
                <div className="grid gap-2 lg:flex lg:flex-col md:gap-4">
                    <ProductGallery productId={id} />

                    <MoreProducts products={moreProducts} className="hidden mt-4 xl:mt-8 md:block" />
                </div>

                <div className="flex flex-col space-y-3 lg:pt-2 xl:max-w-2/3">
                    <h3 className="mt-2 mb-3 xl:py-3 text-3xl lg:text-4xl font-semibold">Nike Airforce 1 off-white</h3>

                    <Rating value={4} />

                    <div className="my-6 lg:my-8 xl:my-12">
                        <h2 className="text-5xl xl:text-6xl font-black">£199.00</h2>
                    </div>

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
                        <div>
                            <h4 className="text-xl font-semibold">Product Description</h4>
                            <p className="mt-2 text-muted-foreground">
                                The Nike Airforce 1 Off-White is a premium sneaker designed for comfort and style. Featuring high-quality materials and a sleek design, it's perfect for any occasion.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold">Key Features</h4>
                            <ul className="mt-2 list-disc list-inside text-muted-foreground">
                                <li>High-quality leather upper</li>
                                <li>Durable rubber outsole</li>
                                <li>Lightweight cushioning for comfort</li>
                                <li>Iconic Off-White design elements</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold">Shipping & Returns</h4>
                            <p className="mt-2 text-muted-foreground">
                                Free shipping on orders over £100. Returns are accepted within 30 days of purchase.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold">Care Instructions</h4>
                            <p className="mt-2 text-muted-foreground">
                                Clean with a damp cloth. Avoid exposure to direct sunlight for extended periods.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold">Customer Reviews</h4>
                            <p className="mt-2 text-muted-foreground italic">
                                No reviews yet. Be the first to leave a review!
                            </p>
                        </div>

                        <MoreProducts products={moreProducts} className="md:hidden" />
                    </section>
                </div>

                <BackButton />
            </main>
        </HydrationBoundary>
    )
}
