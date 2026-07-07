import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]); // Array of favorited products

  // Load wishlist on mount or user change
  useEffect(() => {
    if (user) {
      // Fetch from DB
      fetchWishlist();
    } else {
      // Fetch from session storage for guests
      const savedWishlist = sessionStorage.getItem("guestWishlist");
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Failed to parse guest wishlist", e);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    }
  }, [user]);

  // When wishlist state changes, sync to session storage if guest
  useEffect(() => {
    if (!user) {
      sessionStorage.setItem("guestWishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const toggleWishlist = async (product) => {
    if (!product || !product._id) return;
    
    // Check if it's already in wishlist
    const exists = wishlist.some(item => item._id === product._id);
    
    // Optimistic UI update
    if (exists) {
      setWishlist(prev => prev.filter(item => item._id !== product._id));
    } else {
      setWishlist(prev => [...prev, product]);
    }

    // Sync with DB if logged in
    if (user) {
      try {
        await api.post("/wishlist/toggle", { productId: product._id });
        // Optionally refetch to ensure exact sync
      } catch (error) {
        console.error("Failed to toggle wishlist in DB:", error);
        // Revert optimistic update on failure
        fetchWishlist();
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
