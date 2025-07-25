import { LucideMenu, ShoppingCart } from 'lucide-react'
import Cart from './Cart'
import NaivgationItems from './NaivgationItems'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'

export default function Header() {
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
                <ThemeToggle />
            </nav>
        </header>
    )
}
