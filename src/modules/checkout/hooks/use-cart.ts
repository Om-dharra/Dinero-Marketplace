
import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from "zustand/shallow";

export const useCart = (tenantSlug:string)=>{
  
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);



  const productIds = useCartStore(useShallow((state)=>state.tenantCarts[tenantSlug]?.productIds || []));

  const toggleProduct=useCallback((productId:string)=>{
    if(productIds.includes(productId)){
      removeProduct(tenantSlug, productId);
    }else{
      addProductToCart(tenantSlug, productId);
    }
  },[addProductToCart,removeProduct,productIds,tenantSlug])

  const isProductInCart=useCallback((productId:string)=>{
    return productIds.includes(productId);
  
  },[productIds]);

  const clearTenantCart=useCallback(()=>{
    clearCart(tenantSlug);
  },[clearCart,tenantSlug])

  const handleAddProduct=useCallback((productId:string)=>{
    addProductToCart(tenantSlug, productId);
  }
, [addProductToCart, tenantSlug]);
const handleRemoveProduct=useCallback((productId:string)=>{
    removeProduct(tenantSlug, productId);
  }
, [removeProduct, tenantSlug]);

  return {
    productIds,
    addProductToCart:handleAddProduct,
    removeProduct:handleRemoveProduct,
    clearCart:clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
}
