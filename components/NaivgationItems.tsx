"use client"

export default function () {
    const [active, setActive] = useState("home")

    return (
        <>
            <NavigationItem route="home" label="Home" active={active === "home"} setActive={setActive} />
            <NavigationItem route="products" label="Products" active={active === "products"} setActive={setActive} />
            <NavigationItem route="checkout" label="Checkout" active={active === "checkout"} setActive={setActive} />
        </>
    )
}

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
    route: string
    label: string
    active?: boolean
    setActive: (route: string) => void
}

function NavigationItem({ route, label, active, setActive }: Props) {
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
                onClick={(e) => {
                    e.preventDefault();
                    setActive(route);
                }}
            >
                <a href="#">{label}</a>
            </Button>
        </div>
    )
}
