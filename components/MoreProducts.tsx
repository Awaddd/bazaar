// WIP

import { motion, useAnimate, useInView } from "motion/react";
import Product from "./Product";
import { useEffect } from "react";

export default function ({ className }: { className?: string }) {
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
                {moreProducts.map(product => (
                    <Product key={product.id} product={product} className="opacity-0" />
                ))}
            </div>
        </div>
    )
}