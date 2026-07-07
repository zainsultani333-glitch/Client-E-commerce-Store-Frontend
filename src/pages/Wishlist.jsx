import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      
      {/* ─── HEADER ─── */}
      <div style={{ 
        background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-card))", 
        padding: "60px 24px", 
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3, pointerEvents: "none" }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "900", color: "var(--text-primary)", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>
            Your <span style={{ color: "var(--error)" }}>Wishlist</span>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto" }}>
            Saved for later. These are the items you've favorited across the store.
          </p>
        </div>
      </div>

      {/* ─── WISHLIST CONTENT ─── */}
      <div className="container" style={{ flex: 1, padding: "40px 24px 80px" }}>
        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              textAlign: "center", 
              padding: "80px 24px", 
              background: "var(--bg-card)", 
              borderRadius: "24px", 
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div style={{ 
              width: "80px", height: "80px", 
              background: "rgba(225, 29, 72, 0.1)", 
              color: "var(--error)", 
              borderRadius: "50%", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              margin: "0 auto 24px" 
            }}>
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "12px" }}>Your wishlist is empty</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "15px" }}>Explore our collections and tap the heart icon to save items you love.</p>
            <Link to="/products" className="btn-primary" style={{ display: "inline-block", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>{wishlist.length} Items Saved</h2>
            </div>
            
            <div className="product-grid">
              {wishlist.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>
        {`
          .product-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 640px) {
            .product-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .product-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 28px;
            }
          }
        `}
      </style>
    </div>
  );
}
