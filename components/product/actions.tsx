"use client"

import { useState } from "react";
import Sizes from "@/components/Sizes";
import AddToCartButton from "./add-to-cart-button";
import BuyNowButton from "./buy-now-button";

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
        <BuyNowButton productId={productId} selectedSize={selectedSize} />
      </div>
    </>
  );
}
