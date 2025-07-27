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
                <div className="py-2 px-2 bg-background">
                    <h5 className="mt-2 font-medium">{product.name}</h5>
                    <p className="text-muted-foreground">£{product.price}</p>
                </div>
            </div>
        </Link>
    )
}
