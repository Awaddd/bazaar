"use client"

import FilterSidebar from "@/components/FilterSidebar";
import HomeProductGrid from "@/components/HomeProductGrid";
import SortProducts from "@/components/SortProducts";
import SearchInput from "@/components/SearchInput";
import { cn } from "@/lib/utils";

type Props = {
    title?: string
    description?: string
    limit?: number
}

export default function ProductsList({
    title = "Latest Drops",
    description = "Discover the newest additions to our collection",
    limit
}: Props) {
    const height = "h-[calc(100vh-110px)]"

    return (
        <section className={cn(height, "grid grid-rows-[1fr_3fr] lg:grid-rows-1 lg:grid-cols-[1fr_4fr] gap-4")}>
            <FilterSidebar />

            <div className="p-4">
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between align-bottom mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex items-end gap-2">
                        <SortProducts />
                        <SearchInput />
                    </div>
                </div>
                <HomeProductGrid limit={limit} />
            </div>
        </section>
    )
}
