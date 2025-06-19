"use client"

import { Theme } from "@/types/types"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export default function () {
    const theme = "light" as Theme // temp add state management

    function updateTheme(theme: Theme) {

    }

    if (theme === "dark") {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="text-lg font-medium ml-2"
                onClick={() => updateTheme("light")}
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
            onClick={() => updateTheme("dark")}
        >
            <Moon />
        </Button>
    )
}