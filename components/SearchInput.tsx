"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useProductFilters } from "@/hooks/use-product-filters"

const DEBOUNCE_MS = 300

export default function SearchInput() {
    const { filters, setSearch } = useProductFilters()
    const [localValue, setLocalValue] = useState(filters.search)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)
    // Track if the local value change was from user input vs URL sync
    const isUserInputRef = useRef(false)

    // Sync local state with URL state when URL changes externally
    // (e.g., browser back/forward, initial hydration)
    useEffect(() => {
        // Only sync if this wasn't triggered by user input
        if (!isUserInputRef.current && localValue !== filters.search) {
            setLocalValue(filters.search)
        }
        // Reset the flag after URL updates
        isUserInputRef.current = false
    }, [filters.search, localValue])

    // Debounced update to URL when user types
    const debouncedSetSearch = useCallback((value: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            setSearch(value)
        }, DEBOUNCE_MS)
    }, [setSearch])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        isUserInputRef.current = true
        setLocalValue(newValue)
        debouncedSetSearch(newValue)
    }

    return (
        <div className="relative">
            <div className="absolute left-0 inset-y-0 flex items-center pointer-events-none">
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
