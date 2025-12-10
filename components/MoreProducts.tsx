"use client"

import { motion, useAnimate, useInView } from "motion/react";
import ProductGridItem from "./Product";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import products from "@/features/products/products";

type Props = {
    productId: number
    className?: string
}

export default function ({ productId, className }: Props) {
    const { data } = useQuery(products.list({ limit: 2, exclude: productId }))

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope, { once: true })

    useEffect(() => {
        if (isInView) {
            animate("#product", { opacity: 1 }, {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.2,
            })
        }
    }, [isInView, animate])

    // todo: do better handling on no result
    if (!data) return

    return (
        <div className={className}>
            <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    opacity: {
                        delay: 0.6,
                        duration: 0.4,
                        ease: "easeOut"
                    }
                }}
                className="text-xl font-semibold"
            >
                You May Also Like
            </motion.h4>
            <div ref={scope} className="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                {data.map(product => (
                    <ProductGridItem key={product.id} product={product} className="opacity-0 bg-gray-200 dark:bg-white/10" />
                ))}
            </div>
        </div>
    )
}
