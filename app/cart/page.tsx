import cart from "@/features/cart/cart";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CartPageClient from "@/components/cart/CartPageClient";

export default async function CartPage() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(cart.list())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CartPageClient />
        </HydrationBoundary>
    );
}
