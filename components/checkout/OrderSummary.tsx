"use client"

import { motion } from "motion/react";
import Image from "next/image";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import cart from "@/features/cart/cart";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrderSummary() {
    const { data: cartItems = [], isLoading } = useQuery(cart.list());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0;
    const vat = Math.round(subtotal * 0.20);
    const total = subtotal + shipping + vat;

    if (!mounted || isLoading) {
        return (
            <div className="flex flex-col space-y-6">
                <div className="h-10 w-48 bg-muted rounded animate-pulse" />
                <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                    ))}
                </div>
                <div className="h-40 bg-muted rounded animate-pulse" />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" } }}
                className="flex flex-col items-center justify-center space-y-6 p-8 border border-border rounded-lg"
            >
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground text-center">
                    Add some items to your cart to continue with checkout
                </p>
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Browse Products
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col space-y-6"
        >
            <h1 className="text-3xl lg:text-4xl font-semibold">Order Summary</h1>

            <div className="flex flex-col space-y-3">
                {cartItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex space-x-4 p-4 bg-muted rounded-lg"
                    >
                        <div className="relative w-24 h-24 bg-white dark:bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={item.imageUrl}
                                alt={item.productName}
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-base">{item.productName}</h3>
                                {item.addons && (
                                    <p className="text-xs text-muted-foreground mt-1">{item.addons}</p>
                                )}
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-sm text-muted-foreground">Size {item.size}</span>
                                    <span className="text-sm text-muted-foreground">Qty {item.quantity}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-lg">£{item.price}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">£{subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (20%)</span>
                    <span className="font-medium">£{vat}</span>
                </div>
            </div>

            <div className="border-t-2 border-border pt-6">
                <div className="flex items-baseline justify-between">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-5xl xl:text-6xl font-black">£{total}</span>
                </div>
            </div>

            {/* Trust Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { delay: 0.6, duration: 0.4, ease: "easeOut" } }}
                className="border-t border-border pt-6 space-y-3"
            >
                <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <ShieldCheck className="text-primary" size={20} />
                    </div>
                    <div>
                        <div className="font-medium">Secure Checkout</div>
                        <div className="text-xs text-muted-foreground">SSL Encrypted</div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Truck className="text-primary" size={20} />
                    </div>
                    <div>
                        <div className="font-medium">Fast & Reliable Shipping</div>
                        <div className="text-xs text-muted-foreground">Free on orders over £75</div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <CreditCard className="text-primary" size={20} />
                    </div>
                    <div>
                        <div className="font-medium">Verified Payments</div>
                        <div className="text-xs text-muted-foreground">Visa, Mastercard & More</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
