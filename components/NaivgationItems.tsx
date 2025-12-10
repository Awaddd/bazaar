"use client"

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import cart from "@/features/cart/cart";

const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/checkout", label: "Checkout" },
]

export default function NavigationItems() {
    const pathname = usePathname()
    const { data: cartItems = [] } = useQuery(cart.list())

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <>
            {routes.map((route) => (
                <NavigationItem
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    active={pathname === route.href}
                    badge={route.href === "/cart" && cartItemCount > 0 ? cartItemCount : undefined}
                />
            ))}
        </>
    )
}

type Props = {
    href: string
    label: string
    active?: boolean
    badge?: number
}

function NavigationItem({ href, label, active, badge }: Props) {
    return (
        <div className="relative">
            {active && (
                <motion.div
                    layoutId="nav-items"
                    className="absolute h-1 w-4/5 bottom-0 transform left-1/2 -translate-x-1/2 pointer-events-none bg-primary rounded-sm"
                    style={{ willChange: "transform, opacity" }}
                />
            )}
            <Button
                variant="invisible"
                asChild
                className="text-lg font-medium"
            >
                <Link href={href}>
                    {label}
                    {badge !== undefined && (
                        <span className="ml-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-primary rounded-full">
                            {badge}
                        </span>
                    )}
                </Link>
            </Button>
        </div>
    )
}
