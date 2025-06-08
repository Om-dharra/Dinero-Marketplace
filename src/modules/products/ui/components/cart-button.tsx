import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";


interface Props {
  tenantSlug: string;
  productId: string,
  isPurchased?: boolean;
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        asChild
        className="flex-1 font-medium bg-green-400"
      >
        <Link prefetch href={`/library`}>
          View in Library
        </Link>
      </Button>
    )
  }
  const cart = useCart(tenantSlug);
  return (
    <Button
      variant="elevated"
      className={cn("flex-1 bg-green-400", cart.isProductInCart(productId) && "bg-white")}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId)
        ? "Remove from Cart"
        : "Add to Cart"}
    </Button>
  )
}