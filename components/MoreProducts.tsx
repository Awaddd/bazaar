"use client"

import { motion, useAnimate, useInView } from "motion/react";
import ProductGridItem from "./Product";
import { useEffect } from "react";
import { Product } from "@/types/product";

type Props = {
    products: Product[]
    className?: string
}

export default function ({ products, className }: Props) {
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
                {products.map(product => (
                    <ProductGridItem key={product.id} product={product} className="opacity-0" />
                ))}
            </div>
        </div>
    )
}
