"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  sizeMl: number;
  price: number;
  stock: number;
  quantity: number;
  category: string;
}

interface DecantDiscountInfo {
  count: number;
  rate: number;
  amount: number;
  message: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  decantDiscount: DecantDiscountInfo;
  cartTotalWithDecantDiscount: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getDecantDiscount(cart: CartItem[]): DecantDiscountInfo {
  const decantCount = cart
    .filter((item) => item.category === "decants")
    .reduce((sum, item) => sum + item.quantity, 0);

  let rate = 0;
  let message = "";

  if (decantCount === 1) {
    rate = 0;
    message = "Agregá 1 decant más y obtené 5% OFF.";
  } else if (decantCount === 2) {
    rate = 0.05;
    message = "¡Ya tenés 5% OFF! Agregá 1 decant más para obtener 10% OFF.";
  } else if (decantCount >= 3 && decantCount <= 4) {
    rate = 0.1;
    message = "¡Ya tenés 10% OFF! Llegá a 5 decants y obtené 15% OFF.";
  } else if (decantCount >= 5) {
    rate = 0.15;
    message = "¡Excelente! Ya desbloqueaste 15% OFF en tus decants.";
  }

  const decantSubtotal = cart
    .filter((item) => item.category === "decants")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const amount = Math.round(decantSubtotal * rate);

  return { count: decantCount, rate, amount, message };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("prime-essence-cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Migración: agregar category si no existe en items viejos
        const migrated = parsed.map((item: any) => ({
          ...item,
          category: item.category || "decants",
        }));
        setCart(migrated);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("prime-essence-cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const decantDiscount = useMemo(() => getDecantDiscount(cart), [cart]);
  const cartTotalWithDecantDiscount = cartTotal - decantDiscount.amount;

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.stock, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { ...item, quantity: Math.min(item.stock, quantity) }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id);
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const safeQty = Math.min(item.stock, Math.max(1, quantity));
      return prev.map((i) => (i.id === id ? { ...i, quantity: safeQty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        decantDiscount,
        cartTotalWithDecantDiscount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}