"use client"

import ProductGridItem from "./Product"
import { stagger, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import products from "@/features/products/products"

export default function () {
    const { data } = useQuery(products.list({ limit: 6 }))

    const [scope, animate] = useAnimate()
    const inView = useInView(scope, { once: true })

    useEffect(() => {
        if (inView) {
            animate("#product", { opacity: 1 }, {
                ease: "easeInOut",
                duration: 0.5,
                delay: stagger(0.1)
            })
        }
    }, [inView, animate])

    return (
        <main ref={scope} className="grid grid-cols-3 gap-4 p-4 rounded-xl">
            {data?.map(product => (
                <ProductGridItem key={product.id} product={product} className="opacity-0 bg-gray-200" />
            ))}
        </main>
    )
}