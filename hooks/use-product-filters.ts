"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo, useTransition } from "react"

export type SortOption = "default" | "price_asc" | "price_desc" | "name_asc" | "featured"

export type ProductFilters = {
  brands: string[]
  minPrice: number | null
  maxPrice: number | null
  sizes: number[]
  search: string
  sort: SortOption
}

export type ProductFilterParams = {
  brands?: string
  minPrice?: string
  maxPrice?: string
  sizes?: string
  search?: string
  sort?: string
}

const DEFAULT_FILTERS: ProductFilters = {
  brands: [],
  minPrice: null,
  maxPrice: null,
  sizes: [],
  search: "",
  sort: "default",
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
    const sizesParam = searchParams.get("sizes")
    const searchParam = searchParams.get("search")
    const sortParam = searchParams.get("sort")

    return {
      brands: brandsParam ? brandsParam.split(",").filter(Boolean) : [],
      minPrice: minPriceParam ? Number(minPriceParam) : null,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : null,
      sizes: sizesParam ? sizesParam.split(",").map(Number).filter(Boolean) : [],
      search: searchParam ?? "",
      sort: isValidSortOption(sortParam) ? sortParam : "default",
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

        // Handle sizes
        if (updates.sizes !== undefined) {
          if (updates.sizes.length > 0) {
            params.set("sizes", updates.sizes.join(","))
          } else {
            params.delete("sizes")
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
          if (updates.sort !== "default") {
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

  // Toggle size selection (multi-select)
  const toggleSize = useCallback(
    (size: number) => {
      const currentSizes = filters.sizes
      const newSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size].sort((a, b) => a - b)
      updateFilters({ sizes: newSizes })
    },
    [filters.sizes, updateFilters]
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
      filters.sizes.length > 0 ||
      filters.search !== "" ||
      filters.sort !== "default"
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
    if (filters.sizes.length > 0) {
      params.sizes = filters.sizes.join(",")
    }
    if (filters.search) {
      params.search = filters.search
    }
    if (filters.sort !== "default") {
      params.sort = filters.sort
    }

    return params
  }, [filters])

  return {
    filters,
    isPending,
    toggleBrand,
    setPriceRange,
    toggleSize,
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
    value === "default" ||
    value === "price_asc" ||
    value === "price_desc" ||
    value === "name_asc" ||
    value === "featured"
  )
}
