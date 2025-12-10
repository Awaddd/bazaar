"use client"

import { motion } from "motion/react";
import Image from "next/image";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";

const cartItems = [
    {
        id: 1,
        name: "Nike Air Max 90",
        size: 9,
        price: 129,
        quantity: 1,
        image: "/assets/products/air-max-90-orange.png",
        addons: "Premium Laces + Extra Insoles"
    },
    {
        id: 2,
        name: "Jordan 1 Green",
        size: 10,
        price: 189,
        quantity: 1,
        image: "/assets/products/jordan-1-green.png"
    },
];

export default function OrderSummary() {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0;
    const vat = Math.round(subtotal * 0.20);
    const total = subtotal + shipping + vat;

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
                        <div className="relative w-24 h-24 bg-background rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${item.image}`}
                                alt={item.name}
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-base">{item.name}</h3>
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
