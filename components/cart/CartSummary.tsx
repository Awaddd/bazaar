"use client"

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
    subtotal: number;
    shipping: number;
    vat: number;
    total: number;
};

export default function CartSummary({ subtotal, shipping, vat, total }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { delay: 0.4, duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col space-y-6 lg:pt-2"
        >
            <h2 className="text-3xl lg:text-4xl font-semibold">Order Summary</h2>

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
                    <span className="text-3xl font-bold">£{total}</span>
                </div>
            </div>

            <Button size="lg" className="flex space-x-2 mt-4" asChild>
                <Link href="/checkout">
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                </Link>
            </Button>
        </motion.div>
    );
}
