# Product Detail Page Style Guide

Use this guide when building pages that should match the product detail page aesthetic (checkout, cart, etc.)

---

## Layout Structure

### Two-Column Layout (Desktop)
```tsx
<main className="flex flex-col space-y-4 lg:grid lg:grid-cols-[4fr_3fr] lg:gap-6 xl:gap-12">
    <div>{/* Left column - larger */}</div>
    <div className="flex flex-col space-y-3 lg:pt-2">{/* Right column - smaller */}</div>
</main>
```

### Single Column with Sections
```tsx
<div className="flex flex-col space-y-6">
    {/* Sections stacked vertically */}
</div>
```

---

## Typography

| Element | Classes |
|---------|---------|
| Page title | `text-3xl lg:text-4xl font-semibold` |
| Price / Large number | `text-5xl xl:text-6xl font-black` |
| Section heading | `text-xl font-semibold` |
| Body text | `text-muted-foreground` |
| Label | `text-sm font-medium` |
| Small info | `text-sm text-muted-foreground` |

### Section Pattern
```tsx
<div>
    <h4 className="text-xl font-semibold">Section Title</h4>
    <p className="mt-2 text-muted-foreground">Description or content here.</p>
</div>
```

---

## Spacing

### Vertical Spacing
- Between major sections: `space-y-6`
- Between subsections: `space-y-3`
- After headings: `mt-2`
- Before buttons: `mt-7`

### Price Section Margins
```tsx
<h2 className="text-5xl xl:text-6xl font-black my-6 lg:my-8 xl:my-12">$129</h2>
```

---

## Buttons

### Two-Column Action Buttons
```tsx
<div className="grid grid-cols-2 gap-2 mt-7">
    <Button variant="secondary" size="lg">Secondary Action</Button>
    <Button size="lg" className="flex space-x-2">
        <span>Primary Action</span>
        <ArrowRight size={18} />
    </Button>
</div>
```

### Button Sizes
- Default: `h-9 px-4 py-2`
- Large: `h-10 lg:h-12 px-6 lg:px-18 lg:text-base lg:font-bold`

---

## Form Controls

### Label + Input Pattern
```tsx
<div>
    <Label htmlFor="field" className="font-medium">Field Label</Label>
    <Input id="field" className="mt-2" placeholder="Placeholder..." />
</div>
```

### Selection Grid (like sizes)
```tsx
<div className="grid grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
    {options.map(option => (
        <button
            key={option}
            className={cn(
                "p-1.5 xl:p-4 rounded text-center cursor-pointer",
                isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
            )}
        >
            {option}
        </button>
    ))}
</div>
```

---

## Info Lines with Icons

```tsx
<div className="text-sm text-muted-foreground flex items-center space-x-1.5">
    <IconComponent size={16} />
    <span>Info text here</span>
</div>
```

---

## Lists

### Feature/Bullet List
```tsx
<ul className="list-disc list-inside text-muted-foreground mt-2">
    <li>Item one</li>
    <li>Item two</li>
</ul>
```

---

## Animations (motion/react)

### Section Entrance
```tsx
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ opacity: { delay: 0.4, duration: 0.4, ease: "easeOut" } }}
>
    {/* content */}
</motion.div>
```

### Staggered Items
```tsx
{items.map((item, index) => (
    <motion.div
        key={item.id}
        initial={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
    >
        {/* item content */}
    </motion.div>
))}
```

---

## Color Reference

| Purpose | Class |
|---------|-------|
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Primary button bg | `bg-primary` |
| Secondary button bg | `bg-secondary` |
| Selection highlight | `bg-primary text-primary-foreground` |
| Unselected option | `bg-accent text-accent-foreground` |
| Disabled | `bg-muted text-muted-foreground` |
| Borders | `border-border` |

---

## Responsive Breakpoints

| Breakpoint | Typical Changes |
|------------|-----------------|
| Base | Single column, smaller text/spacing |
| `lg:` (1024px) | Two-column grid, increased gaps |
| `xl:` (1280px) | Larger text, more spacing |

---

## Checkout Page Sections (Recommended)

1. **Order Summary** (left column on desktop)
   - Product image thumbnail
   - Product name, size, quantity
   - Price breakdown

2. **Checkout Form** (right column on desktop)
   - Shipping information
   - Payment method
   - Order total
   - Place order button

Use same `lg:grid lg:grid-cols-[4fr_3fr]` layout as product detail.
