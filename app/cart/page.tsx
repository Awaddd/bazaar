"use client"

import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

const cartItems = [
    { id: 1, name: "Nike Air Max 90", size: 9, price: 129, quantity: 2, image: "/assets/products/nike-air-max-90-orange.png" },
    { id: 2, name: "Jordan 1 Green", size: 10, price: 189, quantity: 1, image: "/assets/products/jordan-1-green.png" },
];

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0;
    const vat = Math.round(subtotal * 0.20);
    const total = subtotal + shipping + vat;

    return (
        <main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
            <CartItems items={cartItems} />
            <CartSummary subtotal={subtotal} shipping={shipping} vat={vat} total={total} />
        </main>
    );
}
