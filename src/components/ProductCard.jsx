import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
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
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isOutOfStock = product.quantity <= 0;
  const badgeClass = CATEGORY_COLORS[product.category] || "badge-gray";

  return (
    <div 
    onClick={() => navigate(`/product/${product._id}`)}
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      overflow: "hidden",
      transition: "var(--transition-slow)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
      e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)";
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      {/* Image */}
      <div style={{
        position: "relative",
        aspectRatio: "4/3",
        overflow: "hidden",
        background: "var(--bg-elevated)",
        flexShrink: 0,
      }}>
        {!imgError && product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-hover))",
            gap: "8px",
          }}>
            <svg style={{ width: "40px", height: "40px", color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>No Image</span>
          </div>
        )}

        {/* Badges */}
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {product.category && (
            <span className={`badge ${badgeClass}`}>{product.category}</span>
          )}
        </div>

        {isOutOfStock && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className="badge badge-red" style={{ fontSize: "13px", padding: "6px 14px" }}>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <div>
          <h3 style={{
            fontSize: "15px", fontWeight: "700",
            color: "var(--text-primary)",
            margin: "0 0 4px",
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>{product.name}</h3>

          {product.description && (
            <p style={{
              fontSize: "12px", color: "var(--text-muted)", margin: 0,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.5,
            }}>{product.description}</p>
          )}
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)", lineHeight: 1 }}>
              Rs. {product.price.toLocaleString()}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
              {product.quantity > 0 ? (
                <span style={{ color: product.quantity <= 5 ? "#f59e0b" : "var(--success)" }}>
                  {product.quantity <= 5 ? `⚠ Only ${product.quantity} left` : `✓ ${product.quantity} in stock`}
                </span>
              ) : (
                <span style={{ color: "var(--error)" }}>Out of stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          id={`add-to-cart-${product._id}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{
            width: "100%",
            padding: "11px",
            background: isOutOfStock
              ? "var(--bg-elevated)"
              : added
              ? "linear-gradient(135deg, var(--success), #16a34a)"
              : "linear-gradient(135deg, var(--primary), var(--primary-light))",
            color: isOutOfStock ? "var(--text-muted)" : "var(--bg-base)",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: isOutOfStock ? "not-allowed" : "pointer",
            transition: "var(--transition)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={e => { if (!isOutOfStock && !added) e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}
        >
          {added ? (
            <>
              <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {isOutOfStock ? "Out of Stock" : "Add to Basket"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}