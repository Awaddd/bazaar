"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useProductFilters } from "@/hooks/use-product-filters"

const DEBOUNCE_MS = 300

export default function SearchInput() {
    const { filters, setSearch } = useProductFilters()
    const [localValue, setLocalValue] = useState(filters.search)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)
    const isFirstRender = useRef(true)

    // Sync local state with URL state on initial load
    useEffect(() => {
        if (isFirstRender.current) {
            setLocalValue(filters.search)
            isFirstRender.current = false
        }
    }, [filters.search])

    // Debounced update to URL
    useEffect(() => {
        // Skip the initial render
        if (isFirstRender.current) {
            return
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            if (localValue !== filters.search) {
                setSearch(localValue)
            }
        }, DEBOUNCE_MS)

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [localValue, setSearch, filters.search])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center ">
                <Search className="w-3 h-3 ml-2.5 text-muted-foreground" />
            </div>
            <Input
                placeholder="Search sneakers..."
                className="pl-8"
                value={localValue}
                onChange={handleChange}
            />
        </div>
    )
}
