import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Persist cart in sessionStorage
    try {
      const stored = sessionStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1, size = "", color = "") => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id && item.size === size && item.color === color);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id && item.size === size && item.color === color
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { product, qty, size, color }];
    });
  };

  const removeFromCart = (productId, size = "", color = "") => {
    setCart((prev) => prev.filter((item) => !(item.product._id === productId && item.size === size && item.color === color)));
  };

  const updateQty = (productId, size, color, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.size === size && item.color === color ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => useContext(CartContext);
