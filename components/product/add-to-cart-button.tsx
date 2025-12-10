"use client"

import { Button } from "@/components/ui/button";
import cart from "@/features/cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  productId: number;
  selectedSize: number | null;
};

export default function AddToCartButton({ productId, selectedSize }: Props) {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const addMutation = useMutation({
    ...cart.add(),
    onMutate: () => {
      setIsAdding(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "list"] });
      setTimeout(() => setIsAdding(false), 1500);
    },
    onError: () => {
      setIsAdding(false);
    },
  });

  function handleAddToCart() {
    if (!selectedSize) return;

    addMutation.mutate({
      productId,
      size: selectedSize,
      quantity: 1,
    });
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handleAddToCart}
      disabled={!selectedSize || isAdding || addMutation.isPending}
      className="transition-all"
    >
      {isAdding ? "Added to cart!" : "Add to cart"}
    </Button>
  );
}
