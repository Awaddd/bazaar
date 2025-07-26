"use client"

import products from "@/features/products/products"
import { useQuery } from "@tanstack/react-query"

type Props = {
    productId: number
}

export default function ({ productId }: Props) {
    const { data: product } = useQuery(products.get(productId))
    if (!product) return
    return (
        <>
            <div>
                <h4 className="text-xl font-semibold">Product Description</h4>
                <p className="mt-2 text-muted-foreground">
                    {product.description}
                </p>
            </div>

            <div>
                <h4 className="text-xl font-semibold">Key Features</h4>
                <ul className="mt-2 list-disc list-inside text-muted-foreground">
                    {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-xl font-semibold">Care Instructions</h4>
                <p className="mt-2 text-muted-foreground">
                    {product.careInstructions}
                </p>
            </div>
        </>
    )
}