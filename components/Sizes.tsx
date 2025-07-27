"use client"

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import products from "@/features/products/products";
import { Product } from "@/features/products/schema";

type Props = {
    productId: number
}

type ProductSize = Product["sizes"][number] & {
    selected?: boolean
}

export default function ({ productId }: Props) {
    const { data: product } = useQuery(products.get(productId))
    const [sizes, setSizes] = useState(() => {
        if (!product?.sizes) return []

        const sizes: ProductSize[] = product.sizes.map(size => ({ ...size, selected: false }))

        const len = sizes.length
        const start = Math.floor(len / 2)
        let hasDefaultedSize = false

        for (let i = 0; i < len; i++) {
            const index = (start + i) % len
            const size = sizes[index]

            if (!hasDefaultedSize && size.available) {
                size.selected = true
                hasDefaultedSize = true
            }
        }

        return sizes
    })

    function updateSize(size: number) {
        setSizes(sizes.map(item => item.size === size ? { ...item, selected: true } : { ...item, selected: false }))
    }

    return (
        <div>
            <Label htmlFor="size" className="font-medium">Size</Label>
            <div id="size" className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 mt-2 select-none">
                {sizes.map((size, index) => (
                    <Size
                        key={index}
                        selected={size.selected}
                        disabled={!size.available}
                        onClick={() => updateSize(size.size)}
                        size={size.size}
                    />
                ))}
            </div>
        </div>
    )
}

type SizeProps = {
    size: number;
    selected?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

function Size({ size, selected, onClick, disabled }: SizeProps) {
    const controls = useAnimationControls()

    function getClassName() {
        if (disabled) {
            return "bg-muted text-muted-foreground cursor-not-allowed";
        }
        return "bg-accent hover:bg-accent/80 text-accent-foreground"
    }

    return (
        <div className="relative flex">
            {selected && (
                <motion.div
                    layoutId="size"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 z-10 rounded bg-primary hover:bg-primary/90"
                    onLayoutAnimationComplete={() => {
                        controls.start("visible")
                    }}
                />
            )}

            <button
                onClick={disabled ? undefined : onClick}
                className={cn("p-1.5 xl:p-4 rounded text-center cursor-pointer flex flex-grow", getClassName())}
            >
                <AnimatePresence mode="wait">
                    {selected ? (
                        <motion.span
                            key="selected"
                            variants={variants}
                            animate={controls}
                            exit="exit"
                            className="z-20 w-full text-primary-foreground"
                        >
                            {size}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="unselected"
                            variants={variants}
                            animate={controls}
                            exit="exit"
                            className="z-20 w-full text-accent-foreground"
                        >
                            {size}
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    )
}
