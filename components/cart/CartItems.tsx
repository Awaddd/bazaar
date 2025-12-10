"use client"

import { motion } from "motion/react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type CartItem = {
    id: number;
    name: string;
    size: number;
    price: number;
    quantity: number;
    image: string;
};

type Props = {
    items: CartItem[];
};

export default function CartItems({ items }: Props) {
    const [cartItems, setCartItems] = useState(items);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col space-y-6"
        >
            <h1 className="text-3xl lg:text-4xl font-semibold">Shopping Cart</h1>

            <div className="flex flex-col space-y-3">
                {cartItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex space-x-4 p-4 bg-muted rounded-lg"
                    >
                        <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-background rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${item.image}`}
                                alt={item.name}
                                fill
                                className="object-contain p-3"
                            />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-base lg:text-lg">{item.name}</h3>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-sm text-muted-foreground">Size {item.size}</span>
                                </div>
                                <div className="mt-3">
                                    <span className="font-bold text-lg lg:text-xl">£{item.price}</span>
                                    <span className="text-sm text-muted-foreground ml-2">per item</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        disabled={item.quantity <= 1}
                                        className="h-8 w-8"
                                    >
                                        <Minus size={14} />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        readOnly
                                        className="w-16 h-8 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="h-8 w-8"
                                    >
                                        <Plus size={14} />
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 size={16} />
                                    <span className="ml-1.5 hidden sm:inline">Remove</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {cartItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 space-y-4"
                >
                    <p className="text-muted-foreground text-lg">Your cart is empty</p>
                    <Button asChild size="lg">
                        <a href="/products">Browse Products</a>
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
}
