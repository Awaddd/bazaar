"use client"

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/checkout", label: "Checkout" },
]

export default function NavigationItems() {
    const pathname = usePathname()

    return (
        <>
            {routes.map((route) => (
                <NavigationItem
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    active={pathname === route.href}
                />
            ))}
        </>
    )
}

type Props = {
    href: string
    label: string
    active?: boolean
}

function NavigationItem({ href, label, active }: Props) {
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
                <Link href={href}>{label}</Link>
            </Button>
        </div>
    )
}
