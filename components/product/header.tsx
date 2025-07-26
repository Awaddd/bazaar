"use client"

import { useQuery } from "@tanstack/react-query"
import Rating from "../Rating"
import products from "@/features/products/products"

type Props = {
    productId: number
}

export default function ({ productId }: Props) {
    const { data: product } = useQuery(products.get(productId))
    if (!product) return
    return (
        <>
            <h3 className="mt-2 mb-3 xl:py-3 text-3xl lg:text-4xl font-semibold">{product.name}</h3>

            <Rating value={4} />

            <div className="my-6 lg:my-8 xl:my-12">
                <h2 className="text-5xl xl:text-6xl font-black">£{product.price}.00</h2>
            </div>
        </>
    )
}