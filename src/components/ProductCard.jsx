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
      onClick={() => navigate(`/product/${product._id}`)}
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%"
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)"; }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#f7f7f7" }}>
          {!imgError && product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
               <span style={{ background: "#fff", color: "#000", fontSize: "11px", padding: "4px 10px", fontWeight: "600", borderRadius: "4px", border: "1px solid #eaeaea" }}>Sale</span>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{
            fontSize: "18px", fontWeight: "700",
            color: "#2d2a4a",
            margin: "0 0 12px 0",
            lineHeight: "1.4"
          }}>
            {product.name}
          </h3>

          <p style={{
            fontSize: "14px", color: "#8a8a8a",
            margin: "0 0 24px 0",
            lineHeight: "1.6",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {product.description || `Premium quality ${product.category?.toLowerCase() || 'product'} designed for maximum comfort and modern style.`}
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "#f0f0f0", margin: "0 0 20px 0" }} />

          {/* Bottom Row (Price & Button) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#2d2a4a" }}>
                  Rs. {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span style={{ fontSize: "12px", color: "#8a8a8a", textDecoration: "line-through", marginTop: "2px" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {product.reviews && product.reviews.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="14" height="14" fill="#fbbf24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#2d2a4a" }}>{averageRating}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleChooseOptions}
              disabled={isOutOfStock}
              style={{
                background: "#f7f7f7",
                color: "#2d2a4a",
                border: "none",
                fontSize: "14px",
                fontWeight: "700",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                padding: "12px 0",
                borderRadius: "8px",
                transition: "background 0.2s",
                opacity: isOutOfStock ? 0.5 : 1
              }}
              onMouseEnter={e => { if (!isOutOfStock) { e.target.style.background = "var(--primary)"; e.target.style.color = "#fff"; } }}
              onMouseLeave={e => { if (!isOutOfStock) { e.target.style.background = "#f7f7f7"; e.target.style.color = "#2d2a4a"; } }}
            >
              {isOutOfStock ? "Out of Stock" : "Choose Options"}
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
