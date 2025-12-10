"use client"

import { Button } from "@/components/ui/button";
import cart from "@/features/cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  productId: number;
  selectedSize: number | null;
};

export default function BuyNowButton({ productId, selectedSize }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const addMutation = useMutation({
    ...cart.add(),
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "list"] });
      router.push("/checkout");
    },
    onError: () => {
      setIsProcessing(false);
    },
  });

  function handleBuyNow() {
    if (!selectedSize) return;

    addMutation.mutate({
      productId,
      size: selectedSize,
      quantity: 1,
    });
  }

  return (
    <Button
      size="lg"
      onClick={handleBuyNow}
      disabled={!selectedSize || isProcessing || addMutation.isPending}
      className="flex space-x-2"
    >
      <span>💳</span>
      <span>{isProcessing || addMutation.isPending ? "Processing..." : "Buy now"}</span>
    </Button>
  );
}
