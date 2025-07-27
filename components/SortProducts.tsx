import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function () {
    return (
        <Select>
            <SelectTrigger className="w-[180px] bg-gray-50">
                <SelectValue placeholder="Sort by: Featured" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="low">Price: Low to High</SelectItem>
                    <SelectItem value="high">Price: High to Low</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
