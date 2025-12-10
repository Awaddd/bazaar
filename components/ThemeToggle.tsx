"use client"

import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme()

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="text-lg font-medium ml-2"
                disabled
                aria-label="Loading theme"
            >
                <Moon />
            </Button>
        )
    }

    if (theme === "dark") {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="text-lg font-medium ml-2"
                onClick={toggleTheme}
                aria-label="Switch to light mode"
            >
                <Sun />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-lg font-medium ml-2"
            onClick={toggleTheme}
            aria-label="Switch to dark mode"
        >
            <Moon />
        </Button>
    )
}