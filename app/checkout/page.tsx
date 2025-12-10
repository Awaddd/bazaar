import { Suspense } from "react";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import cart from "@/features/cart/cart";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CheckoutPage() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(cart.list());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
                <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                    <CheckoutForm />
                </Suspense>
                <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                    <OrderSummary />
                </Suspense>
            </main>
        </HydrationBoundary>
    );
}
