import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { EMPTY_CART } from "@/lib/shapes";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(EMPTY_CART);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setCart(await api.getCart());
    } catch {
      setCart(EMPTY_CART);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      refresh,
      add: async (input) => setCart(await api.addToCart(input)),
      setQuantity: async (id, quantity) => setCart(await api.updateCartItem(id, quantity)),
      remove: async (id) => setCart(await api.removeCartItem(id)),
      clear: async () => setCart(await api.clearCart()),
    }),
    [cart, loading, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
