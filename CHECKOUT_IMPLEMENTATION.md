# Checkout Page Implementation Plan

## Overview
Create a checkout page following the product detail page style. This is a portfolio demo - no real payment processing.

## Running Servers
- **Frontend**: http://localhost:3000 (npm run dev)
- **Backend**: http://localhost:5176 (.NET API)

## Files to Create

### 1. `app/checkout/page.tsx`
Main checkout page - server component with hydration boundary.

```tsx
import { Suspense } from "react";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
    return (
        <main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <OrderSummary />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <CheckoutForm />
            </Suspense>
        </main>
    );
}
```

### 2. `components/checkout/OrderSummary.tsx`
Left column - displays cart items and price breakdown.

**Structure:**
- Title: `<h1 className="text-3xl lg:text-4xl font-semibold">Order Summary</h1>`
- Cart items list with:
  - Product thumbnail image
  - Product name
  - Selected size
  - Price per item
  - Quantity (editable or static)
- Price breakdown section:
  - Subtotal
  - Shipping (e.g., "Free" or "$9.99")
  - Tax
  - Total: `<span className="text-5xl xl:text-6xl font-black">$XXX</span>`

**Mock data** (hardcode for portfolio):
```tsx
const cartItems = [
    { id: 1, name: "Nike Air Max 90", size: 9, price: 129, quantity: 1, image: "/assets/products/air-max-90-orange.png" },
    { id: 2, name: "Jordan 1 Green", size: 10, price: 189, quantity: 1, image: "/assets/products/jordan-1-green.png" },
];
```

### 3. `components/checkout/CheckoutForm.tsx`
Right column - shipping and payment form.

**Sections:**
1. **Shipping Information** (`text-xl font-semibold` heading)
   - Full Name (Input)
   - Email (Input)
   - Address (Input)
   - City, State, Zip (3-column grid)
   - Country (Select or Input)

2. **Payment Method** (`text-xl font-semibold` heading)
   - Card selection grid (like size selector)
   - Options: Credit Card, PayPal, Apple Pay (mock)
   - Card number, expiry, CVV inputs (decorative)

3. **Action Buttons**
```tsx
<div className="grid grid-cols-2 gap-2 mt-7">
    <Button variant="secondary" size="lg" asChild>
        <Link href="/products">Back to Shop</Link>
    </Button>
    <Button size="lg" className="flex space-x-2">
        <span>Place Order</span>
        <ArrowRight size={18} />
    </Button>
</div>
```

## Typography Reference (from product detail)

| Element | Classes |
|---------|---------|
| Page title | `text-3xl lg:text-4xl font-semibold` |
| Total price | `text-5xl xl:text-6xl font-black` |
| Section heading | `text-xl font-semibold` |
| Body/description | `text-muted-foreground` |
| Labels | `text-sm font-medium` |
| Small info | `text-sm text-muted-foreground` |

## Spacing Reference

- Between sections: `space-y-6`
- After headings: `mt-2`
- Before buttons: `mt-7`
- Form field groups: `space-y-3`
- Grid gaps: `gap-2`

## Animation Pattern

```tsx
import { motion } from "motion/react";

<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" } }}
>
    {/* content */}
</motion.div>
```

Stagger delays: 0.2, 0.4, 0.6 for different sections.

## Color Tokens

- Primary text: `text-foreground`
- Secondary text: `text-muted-foreground`
- Selected option: `bg-primary text-primary-foreground`
- Unselected option: `bg-accent text-accent-foreground`
- Borders: `border-border`

## Navigation Update

Update `components/NaivgationItems.tsx` to include Checkout route:
```tsx
const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/checkout", label: "Checkout" },
]
```

## Existing Components to Use

- `Button` from `@/components/ui/button`
- `Input` from `@/components/ui/input`
- `Label` from `@/components/ui/label`
- `Select` from `@/components/ui/select` (if needed)
- `MotionImage` from `@/components/MotionImage` (for product thumbnails)

## Image Assets

Product images are in `/public/assets/products/` and served from backend at `http://localhost:5176/assets/products/`.

Use `NEXT_PUBLIC_API_ENDPOINT` env var for image URLs.
