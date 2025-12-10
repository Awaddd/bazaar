"use client"

import PriceRange from "./PriceRange";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useProductFilters } from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";

const brands = ["Nike", "Adidas", "Jordan", "Converse", "Vans", "ASICS"];
const availableSizes = [6, 7, 8, 9, 10, 11, 12];

export default function FilterSidebar() {
    const {
        filters,
        toggleBrand,
        setPriceRange,
        setSize,
        clearFilters,
        hasActiveFilters,
    } = useProductFilters();

    return (
        <div className="p-6 space-y-6 border-r border-border">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>

            <div className="space-y-3">
                <h3 className="font-medium text-foreground">Brand</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                                id={`brand-${brand}`}
                                checked={filters.brands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                            />
                            <label
                                htmlFor={`brand-${brand}`}
                                className="text-sm text-muted-foreground cursor-pointer"
                            >
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="space-y-3">
                <h3 className="font-medium text-foreground">Price Range</h3>
                <PriceRange
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onPriceChange={setPriceRange}
                />
            </div>

            <div className="space-y-3">
                <h3 className="font-medium text-foreground">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => {
                        const isSelected = filters.size === size;
                        return (
                            <button
                                key={size}
                                onClick={() => setSize(isSelected ? null : size)}
                                className={cn(
                                    "min-w-12 min-h-12 rounded-lg border text-sm font-medium transition-all",
                                    isSelected
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-background text-foreground border-border hover:border-gray-400"
                                )}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
            >
                Clear All Filters
            </Button>
        </div>
    )
}
