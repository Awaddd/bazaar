"use client"

import { useQuery } from "@tanstack/react-query";
import cart from "@/features/cart/cart";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function CartPageClient() {
    const { data: items = [] } = useQuery(cart.list());

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0;
    const vat = Math.round(subtotal * 0.20);
    const total = subtotal + shipping + vat;

    return (
        <main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
            <CartItems items={items} />
            <CartSummary subtotal={subtotal} shipping={shipping} vat={vat} total={total} />
        </main>
    );
}
