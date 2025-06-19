import { Theme } from '@/types/types'
import { LucideMenu, Moon, ShoppingCart, Sun } from 'lucide-react'
import Cart from './Cart'
import NaivgationItems from './NaivgationItems'
import { Button } from './ui/button'

type Props = {
    theme: Theme
}

export default function Header({ theme }: Props) {
    function updateTheme(theme: Theme) {

    }

    return (
        <header className="h-[80px] lg:h-[90px] flex justify-between items-center">
            <div className="text-4xl font-black">
                <span className="text-primary">B</span>
                <span className="text-primary/60">azar</span>
            </div>

            <div className="xl:hidden">
                <Button variant="ghost" size="icon">
                    <LucideMenu />
                </Button>
            </div>

            <nav className="hidden relative xl:flex xl:h-9">
                <NaivgationItems />

                <Cart>
                    <Button variant="ghost" size="icon" className="text-lg font-medium ml-2">
                        <ShoppingCart />
                    </Button>
                </Cart>
                {/* {theme === "dark" ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-lg font-medium ml-2"
                        onClick={() => updateTheme("light")}
                    >
                        <Sun />
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-lg font-medium ml-2"
                        onClick={() => updateTheme("dark")}
                    >
                        <Moon />
                    </Button>
                )} */}
            </nav>
        </header>
    )
}
