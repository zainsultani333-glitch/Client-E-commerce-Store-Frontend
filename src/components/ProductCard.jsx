import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  "Shirts": "badge-blue",
  "Hoodies": "badge-gold",
  "Shorts": "badge-green",
  "Trousers": "badge-purple",
};

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  const isOutOfStock = product.quantity <= 0;
  const isSale = product.originalPrice && product.originalPrice > product.price;

  const averageRating = product.reviews?.length
    ? (product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <div
        className="product-card-hover"
        onClick={() => navigate(`/product/${product._id}`)}
        style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          height: "100%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = "scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = "scale(1)";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#f4f3ef", borderRadius: "12px" }}>
          {!imgError && product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: "12px", color: "#888" }}>No Image</span>
            </div>
          )}

          {/* Top Tags */}
          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {isOutOfStock ? (
              <span style={{ background: "#000", color: "#fff", fontSize: "11px", padding: "4px 10px", fontWeight: "600", borderRadius: "4px" }}>Sold out</span>
            ) : isSale ? (
              <span style={{ background: "#e11d48", color: "#fff", fontSize: "11px", padding: "4px 10px", fontWeight: "700", borderRadius: "4px" }}>
                {product.discountPercentage ? `-${product.discountPercentage}% OFF` : 'Sale'}
              </span>
            ) : null}
          </div>

          {/* Heart Button */}
          <button style={{ 
            position: "absolute", top: "12px", right: "12px", 
            width: "36px", height: "36px", background: "#fff", borderRadius: "50%", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            color: isInWishlist(product._id) ? "#e11d48" : "var(--text-primary)", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#e11d48"}
          onMouseLeave={e => e.currentTarget.style.color = isInWishlist(product._id) ? "#e11d48" : "var(--text-primary)"}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          >
            <svg width="18" height="18" fill={isInWishlist(product._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{
            fontSize: "17px", fontWeight: "600", fontFamily: "'Playfair Display', serif",
            color: "var(--text-primary)", margin: "0 0 8px 0",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {product.name} <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "'Montserrat', sans-serif", fontWeight: "400" }}>({product.category || 'Apparel'})</span>
          </h3>

          {/* Description (max 2 lines) */}
          <p style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            margin: "0 0 10px 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.4",
            height: "2.8em"
          }}>
            {product.description || "No description available for this product."}
          </p>

          {/* Reviews */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
              <svg width="12" height="12" fill="#1a3622" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
              <span style={{ fontWeight: "600", color: "#111" }}>{averageRating > 0 ? averageRating : '0.0'}</span>
              <span style={{ color: "#d1d1d1" }}>|</span>
              <span>{product.reviews?.length || 0} reviews</span>
            </div>
            {product.colors && product.colors.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: product.colors[0], border: "1px solid rgba(0,0,0,0.1)" }} />
                <span>{product.colors[0]}</span>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#e0d2c3", border: "1px solid rgba(0,0,0,0.1)" }} />
                <span>Beige</span>
              </div>
            )}
          </div>

          {/* Bottom Row */}
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "var(--text-primary)", margin: 0, display: "flex", alignItems: "baseline", gap: "8px" }}>
              Rs. {product.price.toLocaleString()}
              {isSale && (
                <span style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "line-through", fontWeight: "500", fontFamily: "'Montserrat', sans-serif" }}>
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </h4>

            <button
              onClick={handleQuickView}
              disabled={isOutOfStock}
              style={{
                width: "100%",
                background: "#1a3622",
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                padding: "10px 0",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                opacity: isOutOfStock ? 0.6 : 1
              }}
              onMouseEnter={e => { if (!isOutOfStock) { e.target.style.background = "#2a5235"; } }}
              onMouseLeave={e => { if (!isOutOfStock) { e.target.style.background = "#1a3622"; } }}
            >
              {isOutOfStock ? "Out of Stock" : "Quick View"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
