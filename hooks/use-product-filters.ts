"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo, useTransition } from "react"

export type SortOption = "price_asc" | "price_desc" | "name_asc" | "featured"

export type ProductFilters = {
  brands: string[]
  minPrice: number | null
  maxPrice: number | null
  size: number | null
  search: string
  sort: SortOption
}

export type ProductFilterParams = {
  brands?: string
  minPrice?: string
  maxPrice?: string
  size?: string
  search?: string
  sort?: string
}

const DEFAULT_FILTERS: ProductFilters = {
  brands: [],
  minPrice: null,
  maxPrice: null,
  size: null,
  search: "",
  sort: "featured",
}

export function useProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  // Parse current filters from URL
  const filters = useMemo<ProductFilters>(() => {
    const brandsParam = searchParams.get("brands")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")
    const sizeParam = searchParams.get("size")
    const searchParam = searchParams.get("search")
    const sortParam = searchParams.get("sort")

    return {
      brands: brandsParam ? brandsParam.split(",").filter(Boolean) : [],
      minPrice: minPriceParam ? Number(minPriceParam) : null,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : null,
      size: sizeParam ? Number(sizeParam) : null,
      search: searchParam ?? "",
      sort: isValidSortOption(sortParam) ? sortParam : "featured",
    }
  }, [searchParams])

  // Update URL with new params
  const updateFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString())

        // Handle brands
        if (updates.brands !== undefined) {
          if (updates.brands.length > 0) {
            params.set("brands", updates.brands.join(","))
          } else {
            params.delete("brands")
          }
        }

        // Handle minPrice
        if (updates.minPrice !== undefined) {
          if (updates.minPrice !== null) {
            params.set("minPrice", updates.minPrice.toString())
          } else {
            params.delete("minPrice")
          }
        }

        // Handle maxPrice
        if (updates.maxPrice !== undefined) {
          if (updates.maxPrice !== null) {
            params.set("maxPrice", updates.maxPrice.toString())
          } else {
            params.delete("maxPrice")
          }
        }

        // Handle size
        if (updates.size !== undefined) {
          if (updates.size !== null) {
            params.set("size", updates.size.toString())
          } else {
            params.delete("size")
          }
        }

        // Handle search
        if (updates.search !== undefined) {
          if (updates.search.trim()) {
            params.set("search", updates.search.trim())
          } else {
            params.delete("search")
          }
        }

        // Handle sort
        if (updates.sort !== undefined) {
          if (updates.sort !== "featured") {
            params.set("sort", updates.sort)
          } else {
            params.delete("sort")
          }
        }

        const queryString = params.toString()
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname
        router.push(newUrl, { scroll: false })
      })
    },
    [searchParams, pathname, router]
  )

  // Toggle brand selection
  const toggleBrand = useCallback(
    (brand: string) => {
      const currentBrands = filters.brands
      const newBrands = currentBrands.includes(brand)
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand]
      updateFilters({ brands: newBrands })
    },
    [filters.brands, updateFilters]
  )

  // Set price range
  const setPriceRange = useCallback(
    (minPrice: number | null, maxPrice: number | null) => {
      updateFilters({ minPrice, maxPrice })
    },
    [updateFilters]
  )

  // Set size
  const setSize = useCallback(
    (size: number | null) => {
      updateFilters({ size })
    },
    [updateFilters]
  )

  // Set search
  const setSearch = useCallback(
    (search: string) => {
      updateFilters({ search })
    },
    [updateFilters]
  )

  // Set sort
  const setSort = useCallback(
    (sort: SortOption) => {
      updateFilters({ sort })
    },
    [updateFilters]
  )

  // Clear all filters
  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }, [pathname, router])

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.brands.length > 0 ||
      filters.minPrice !== null ||
      filters.maxPrice !== null ||
      filters.size !== null ||
      filters.search !== "" ||
      filters.sort !== "featured"
    )
  }, [filters])

  // Get params object for API calls
  const getApiParams = useCallback((): ProductFilterParams => {
    const params: ProductFilterParams = {}

    if (filters.brands.length > 0) {
      params.brands = filters.brands.join(",")
    }
    if (filters.minPrice !== null) {
      params.minPrice = filters.minPrice.toString()
    }
    if (filters.maxPrice !== null) {
      params.maxPrice = filters.maxPrice.toString()
    }
    if (filters.size !== null) {
      params.size = filters.size.toString()
    }
    if (filters.search) {
      params.search = filters.search
    }
    if (filters.sort !== "featured") {
      params.sort = filters.sort
    }

    return params
  }, [filters])

  return {
    filters,
    isPending,
    toggleBrand,
    setPriceRange,
    setSize,
    setSearch,
    setSort,
    clearFilters,
    hasActiveFilters,
    getApiParams,
    updateFilters,
  }
}

function isValidSortOption(value: string | null): value is SortOption {
  return (
    value === "price_asc" ||
    value === "price_desc" ||
    value === "name_asc" ||
    value === "featured"
  )
}
