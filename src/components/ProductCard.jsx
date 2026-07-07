import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./QuickViewModal";

const CATEGORY_COLORS = {
  "Shirts": "badge-blue",
  "Hoodies": "badge-gold",
  "Shorts": "badge-green",
  "Trousers": "badge-purple",
};

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleChooseOptions = (e) => {
    e.stopPropagation();
    setShowModal(true);
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
          background: "#ffffff",
          borderRadius: "0px", // Sharp edges for a more editorial/professional fashion look, or subtle 4px. Let's use 8px
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          height: "100%",
          border: "1px solid #f0f0f0"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)";
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = "scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = "scale(1)";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#f9f9f9", padding: "16px" }}>
          {!imgError && product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: "12px", color: "#888" }}>No Image</span>
            </div>
          )}

          {/* Top Left Tags */}
          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {isOutOfStock ? (
              <span style={{ background: "#000", color: "#fff", fontSize: "11px", padding: "4px 10px", fontWeight: "600", borderRadius: "4px" }}>Sold out</span>
            ) : isSale ? (
              <span style={{ background: "#e11d48", color: "#fff", fontSize: "11px", padding: "4px 10px", fontWeight: "700", borderRadius: "4px", border: "none", boxShadow: "0 2px 10px rgba(225,29,72,0.3)" }}>
                {product.discountPercentage ? `-${product.discountPercentage}% OFF` : 'Sale'}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{
            fontSize: "15px", fontWeight: "600",
            color: "#111",
            margin: "0 0 6px 0",
            lineHeight: "1.3",
            letterSpacing: "-0.2px"
          }}>
            {product.name}
          </h3>

          <p style={{
            fontSize: "13px", color: "#666",
            margin: "0 0 20px 0",
            lineHeight: "1.5",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {product.description || `Premium quality ${product.category?.toLowerCase() || 'product'} designed for maximum comfort.`}
          </p>

          {/* Bottom Row (Price & Button) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>
                  Rs. {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span style={{ fontSize: "13px", color: "#999", textDecoration: "line-through" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {product.reviews && product.reviews.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="12" height="12" fill="#111" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#111" }}>{averageRating}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleChooseOptions}
              disabled={isOutOfStock}
              style={{
                width: "100%",
                background: "transparent",
                color: "#111",
                border: "1px solid #111",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                padding: "10px 0",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                opacity: isOutOfStock ? 0.4 : 1
              }}
              onMouseEnter={e => { if (!isOutOfStock) { e.target.style.background = "#111"; e.target.style.color = "#fff"; } }}
              onMouseLeave={e => { if (!isOutOfStock) { e.target.style.background = "transparent"; e.target.style.color = "#111"; } }}
            >
              {isOutOfStock ? "Out of Stock" : "Quick View"}
            </button>
          </div>
        </div>
      </div>

      {showModal && createPortal(
        <QuickViewModal product={product} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
