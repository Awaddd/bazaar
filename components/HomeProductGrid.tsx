"use client"

import ProductGridItem from "./Product"
import { stagger, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import products from "@/features/products/products"
import { useProductFilters } from "@/hooks/use-product-filters"

type Props = {
    limit?: number
}

export default function HomeProductGrid({ limit }: Props) {
    const { getApiParams } = useProductFilters()
    const filterParams = getApiParams()

    const { data, isLoading } = useQuery(products.list({ ...(limit && { limit }), ...filterParams }))

    const [scope, animate] = useAnimate()
    const inView = useInView(scope, { once: true })

    useEffect(() => {
        if (inView && data && data.length > 0) {
            animate("#product", { opacity: 1 }, {
                ease: "easeInOut",
                duration: 0.5,
                delay: stagger(0.1)
            })
        }
    }, [inView, animate, data])

    if (isLoading) {
        return (
            <main className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-80 rounded-lg bg-gray-200 animate-pulse"
                    />
                ))}
            </main>
        )
    }

    if (!data || data.length === 0) {
        return (
            <main className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            </main>
        )
    }

    return (
        <main ref={scope} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map(product => (
                <ProductGridItem key={product.id} product={product} className="opacity-0 bg-gray-200" />
            ))}
        </main>
    )
}
