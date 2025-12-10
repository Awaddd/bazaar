"use client"

import { useState } from "react"
import MotionImage from "./MotionImage"
import products from "@/features/products/products"
import { useQuery } from "@tanstack/react-query"

type Props = {
    productId: number
}

export default function ({ productId }: Props) {
    const { data: product } = useQuery(products.get(productId))
    const [currentImage, setCurrentImage] = useState(0)

    if (!product) return

    return (
        <>
            <div className="overflow-hidden">
                <MotionImage
                    className="w-full h-64 sm:h-[65vh] max-h-128 object-cover bg-gray-200 dark:bg-white/10"
                    src={product.gallery[currentImage] || product.imageUrl}
                    alt={`${product.name} ${product.category}`}
                    priority
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        opacity: {
                            delay: 0.2,
                            ease: "easeOut"
                        },
                    }}
                />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4">
                {product.gallery.map((image, index) => (
                    <MotionImage
                        key={index}
                        className="w-full h-18 lg:h-24 sm:h-30 xl:h-36 object-cover bg-gray-200 dark:bg-white/10"
                        src={image}
                        alt={`${product.name} gallery image ${index + 1}`}
                        active={index === currentImage}
                        onClick={() => setCurrentImage(index)}
                        initial={{ translateY: 50, opacity: 0 }}
                        animate={{ translateY: [50, 0] }}
                        transition={{
                            opacity: {
                                delay: (4 + index) * 0.1
                            },
                            translateY: {
                                delay: (4 + index) * 0.1
                            }
                        }}
                    />
                ))}
            </div>
        </>
    )
}
