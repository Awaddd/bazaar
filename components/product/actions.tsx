"use client"

import { useState } from "react";
import Sizes from "@/components/Sizes";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./add-to-cart-button";

type Props = {
  productId: number;
};

export default function ProductActions({ productId }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <>
      <Sizes productId={productId} onSizeChange={setSelectedSize} />

      <div className="grid grid-cols-2 gap-2 mt-7">
        <AddToCartButton productId={productId} selectedSize={selectedSize} />
        <Button size="lg" className="flex space-x-2">
          <span>💳</span>
          Buy now
        </Button>
      </div>
    </>
  );
}
