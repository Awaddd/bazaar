import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Theme } from "@/types/types"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function ({ children }: Props) {
    const theme = "light" as Theme // temp, add state management

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent dark={theme === "dark"}>
                <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription>
                        Review the items in your cart before proceeding to checkout.
                    </SheetDescription>
                </SheetHeader>
                <main className="px-4">
                    <h2 className="text-3xl font-black">Items</h2>
                </main>
                <SheetFooter>
                    <Button type="submit">Checkout</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
