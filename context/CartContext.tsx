"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: string; // id de la variante (tamaño) del producto
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  sizeMl: number;
  price: number;
  stock: number;
  quantity: number;
}

export type CartItemInput = Omit<CartItem, "quantity">;

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItemInput, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("prime-essence-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("prime-essence-cart");
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("prime-essence-cart", JSON.stringify(cart));
  }, [cart, loaded]);

  function addToCart(item: CartItemInput, quantity: number = 1) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((i) => i.id === item.id);

      if (existingItem) {
        return currentCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...currentCart, { ...item, quantity }];
    });
  }

  function removeFromCart(variantId: string) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== variantId));
  }

  function updateQuantity(variantId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === variantId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }

  return context;
}