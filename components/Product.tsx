import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import MotionImage from "./MotionImage";
import Link from "next/link";

type Props = {
    id?: string
    product: Product
    className?: string
}

export default function ({ id = "product", product, className }: Props) {
    return (
        <Link href={`/products/${product.id}`}>
            <div id={id}>
                <MotionImage
                    src={product.imageUrl}
                    alt={`${product.name} ${product.category}`}
                    className={cn("w-full h-48 xl:h-48 object-cover rounded-lg", className)}
                />
                <div className="p-2 space-y-1.5 bg-background">
                    <div className="flex justify-between items-end">
                        <h5 className="mt-2 text-muted-foreground">{product.name}</h5>
                        <p className="font-medium">{product.brand}</p>
                    </div>
                    <p className="font-black">£{product.price}</p>
                </div>
            </div>
        </Link>
    )
}
