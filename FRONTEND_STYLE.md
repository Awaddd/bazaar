# Bazaar Frontend Style Guide

## Project Structure

```
app/           - Next.js 15 App Router pages
components/    - UI components (ui/ for shadcn, domain-specific at root)
features/      - Query-based data fetching (products/)
hooks/         - Custom hooks (use-product-filters, use-slider-with-input)
types/         - TypeScript types
lib/           - Utilities (cn, query client, providers)
```

## Component Patterns

### Exports
- Use default exports: `export default function ComponentName()`
- One component per file

### Props Typing
```tsx
type Props = {
    title?: string
    limit?: number
}

export default function Component({ title = "Default", limit }: Props) {
    // ...
}
```

### Client Components
Add `"use client"` only when needed:
- Using hooks (useState, useEffect, useSearchParams)
- Event handlers (onClick, onChange)
- Browser APIs

### State Management
- **URL State**: `useSearchParams` + `useRouter` for filters (shareable URLs)
- **Server State**: React Query (TanStack Query) for API data
- **Local State**: `useState` for UI-only state

---

## Typography Scale

| Element | Classes |
|---------|---------|
| Hero main | `text-7xl font-black` |
| Hero subtitle | `text-5xl` |
| Product price | `text-6xl font-black` |
| Page headings | `text-3xl font-bold` |
| Section headings | `text-xl font-semibold` or `text-lg font-semibold` |
| Body text | `text-base` |
| Labels/descriptions | `text-sm` |
| Small/compact | `text-xs` |

### Font Weights
- `font-black` - Logo, prices, hero text
- `font-bold` - Page headings
- `font-semibold` - Section headings
- `font-medium` - Labels, nav items

---

## Spacing Patterns

### Padding
- Page content: `p-4`
- Sidebars: `py-6 pr-6`
- Cards: `p-2`
- Form elements: `p-1`

### Gaps (Flexbox/Grid)
- Product grid: `gap-6`
- Main layouts: `gap-4`
- Filter groups: `gap-2`
- Compact items: `gap-1`

### Vertical Stacking
- Large sections: `space-y-6`
- Form groups: `space-y-3`
- List items: `space-y-2`
- Tight spacing: `space-y-1.5`

### Margins
- Section bottom: `mb-8`
- Heading bottom: `mb-2`

---

## Color Tokens

**Always use design tokens, never hardcode colors.**

### Text
- Primary: `text-foreground`
- Secondary: `text-muted-foreground`
- On primary bg: `text-primary-foreground`
- On backgrounds: `text-background`

### Backgrounds
- Page: `bg-background`
- Subtle/muted: `bg-muted`
- Primary buttons: `bg-primary`
- Secondary: `bg-secondary`

### Borders
- Default: `border-border`
- Focus rings: `ring-ring`

### States
- Hover borders: `hover:border-foreground/50`
- Selected: `bg-foreground text-background`

---

## UI Components (shadcn/ui)

Available components in `components/ui/`:
- Button (variants: default, outline, ghost, invisible, destructive)
- Checkbox
- Input
- Label
- Select
- Slider
- Tooltip
- Sheet (mobile menu)

### Button Variants
```tsx
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="invisible">No styling</Button>
<Button variant="destructive">Danger</Button>
```

---

## Animation Patterns (motion/react)

### Hover Effects
```tsx
<motion.div whileHover={{ scale: 1.035 }}>
    {/* content */}
</motion.div>
```

### Layout Animations
```tsx
// Shared layout animations with layoutId
{active && (
    <motion.div
        layoutId="nav-items"
        className="absolute h-1 w-4/5 bottom-0 bg-primary"
    />
)}
```

### Staggered Children
```tsx
const [scope, animate] = useAnimate()
const inView = useInView(scope, { once: true })

useEffect(() => {
    if (inView && data) {
        animate("#item", { opacity: 1 }, {
            delay: stagger(0.1),
            duration: 0.5
        })
    }
}, [inView, data])
```

---

## Data Fetching

### React Query Pattern
```tsx
// features/products/products.ts
const products = {
    list: (params: Params) => queryOptions({
        queryKey: ["products", params],
        queryFn: () => fetchProducts(params),
    }),
    detail: (id: number) => queryOptions({
        queryKey: ["products", id],
        queryFn: () => fetchProduct(id),
    }),
}

// In component
const { data, isLoading } = useQuery(products.list({ limit: 6 }))
```

### Server-Side Prefetching
```tsx
// In page.tsx (Server Component)
export default async function Page() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(products.list({}))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ClientComponent />
        </HydrationBoundary>
    )
}
```

---

## File Naming

- Components: `PascalCase.tsx` (e.g., `ProductsList.tsx`)
- Hooks: `kebab-case.ts` with `use-` prefix (e.g., `use-product-filters.ts`)
- Utils: `kebab-case.ts` (e.g., `get-query-client.ts`)
- Types: `types.ts` in `types/` folder

---

## Common Patterns

### Loading Skeleton
```tsx
if (isLoading) {
    return (
        <div className="grid gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
            ))}
        </div>
    )
}
```

### Empty State
```tsx
if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground text-lg">No items found.</p>
        </div>
    )
}
```

### Conditional Classes
```tsx
import { cn } from "@/lib/utils"

<button className={cn(
    "h-8 rounded border text-xs font-medium",
    isSelected
        ? "bg-foreground text-background border-foreground"
        : "bg-background text-foreground border-border hover:border-foreground/50"
)}>
```

---

## Grid Layouts

### Product Grid
```tsx
<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
```

### Filter + Content Layout
```tsx
<section className="grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_4fr] gap-4">
    <FilterSidebar />
    <MainContent />
</section>
```

### Size Buttons (Compact)
```tsx
<div className="grid grid-cols-5 gap-1">
```
