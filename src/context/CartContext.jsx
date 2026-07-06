import { createContext, useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState(() => {
    try {
      const stored = sessionStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const isInitialMount = useRef(true);

  // 1. Fetch backend cart when user logs in
  useEffect(() => {
    if (user && user.role !== "admin") {
      api.get("/cart").then(res => {
        const backendCart = res.data.items || [];
        
        // Merge with local cart if local cart has items
        if (cart.length > 0) {
          const merged = [...backendCart];
          let changed = false;
          for (const localItem of cart) {
            const existing = merged.find(b => b.product._id === localItem.product._id && b.size === localItem.size && b.color === localItem.color);
            if (existing) {
              existing.qty += localItem.qty;
              changed = true;
            } else {
              merged.push(localItem);
              changed = true;
            }
          }
          setCart(merged);
        } else {
          setCart(backendCart);
        }
      }).catch(err => console.error("Error fetching cart", err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // 2. Sync to sessionStorage AND backend when cart changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (user && user.role !== "admin") {
      const timeoutId = setTimeout(() => {
        const payload = cart.map(item => ({
          productId: item.product._id,
          qty: item.qty,
          size: item.size,
          color: item.color
        }));
        api.post("/cart/sync", { items: payload }).catch(err => console.error("Sync error", err));
      }, 800); // Debounce sync
      return () => clearTimeout(timeoutId);
    }
  }, [cart, user]);

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
