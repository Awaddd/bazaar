import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import MotionImage from "./MotionImage";

type Props = {
    id?: string
    product: Product
    className?: string
}

export default function ({ id = "product", product, className }: Props) {
    function navigate() {
        console.log("navigating...")
    }

    return (
        <div
            id={id}
            className={cn("bg-background rounded-lg", className)}
            onClick={() => navigate()}
        >
            <MotionImage
                src={product.imageUrl}
                alt={`${product.name} ${product.category}`}
                className="w-full h-32 xl:h-48 object-cover rounded-t-lg"
            />
            <div className="py-4 px-2">
                <h5 className="mt-2 font-medium">{product.name}</h5>
                <p className="text-muted-foreground">£{product.price}</p>
            </div>
        </div>
    )
}
