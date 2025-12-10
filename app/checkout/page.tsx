import { Suspense } from "react";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
    return (
        <main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <CheckoutForm />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <OrderSummary />
            </Suspense>
        </main>
    );
}
