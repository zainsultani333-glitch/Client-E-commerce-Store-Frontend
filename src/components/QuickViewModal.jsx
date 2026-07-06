import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [added, setAdded] = useState(false);

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => e.stopPropagation();

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    // You could pass quantity and size to addToCart if the context supports it.
    // For now, we'll just call the standard addToCart
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose(); // Auto close after adding
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!user) { navigate("/login"); return; }
    addToCart(product);
    navigate("/cart"); // Or checkout if you have a direct checkout route
  };

  const isLowStock = product.quantity > 0 && product.quantity <= 5;
  const isOutOfStock = product.quantity <= 0;

  return (
    <div 
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px"
      }}
    >
      <div 
        onClick={handleModalClick}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px", right: "16px",
            background: "transparent",
            border: "1px solid #e5e7eb",
            borderRadius: "50%",
            width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "#6b7280",
            zIndex: 10
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Image */}
        <div style={{ flex: 1, padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              style={{ width: "100%", height: "auto", maxHeight: "70vh", objectFit: "contain" }}
            />
          ) : (
            <div style={{ color: "#9ca3af", fontSize: "14px" }}>No Image</div>
          )}
        </div>

        {/* Right: Details */}
        <div style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column" }}>
          
          <div style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
            {product.category || "IRAADAY"}
          </div>
          
          <h2 style={{ fontSize: "28px", fontWeight: "700", textTransform: "uppercase", margin: "0 0 16px 0", lineHeight: 1.1, color: "#111827" }}>
            {product.name}
          </h2>

          <div style={{ fontSize: "16px", fontWeight: "400", color: "#111827", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
            {product.originalPrice && product.originalPrice > product.price && (
               <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>
                 Rs.{product.originalPrice.toLocaleString()} PKR
               </span>
            )}
            <span>Rs.{product.price.toLocaleString()} PKR</span>
          </div>

          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 16px 0" }}>
            <a href="#" style={{ color: "#4b5563", textDecoration: "underline" }}>Shipping</a> calculated at checkout.
          </p>

          {isOutOfStock ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#dc2626", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626" }}></span>
              Out of stock
            </div>
          ) : isLowStock ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#d97706", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#d97706" }}></span>
              Low stock
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#16a34a", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a" }}></span>
              In stock
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: "#374151", marginBottom: "8px" }}>Size</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "8px 16px",
                      background: selectedSize === size ? "#000" : "#fff",
                      color: selectedSize === size ? "#fff" : "#111827",
                      border: "1px solid #d1d5db",
                      fontSize: "13px",
                      cursor: "pointer",
                      minWidth: "60px",
                      textAlign: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: "#374151", marginBottom: "8px" }}>Color</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "8px 16px",
                      background: selectedColor === color ? "#000" : "#fff",
                      color: selectedColor === color ? "#fff" : "#111827",
                      border: "1px solid #d1d5db",
                      fontSize: "13px",
                      cursor: "pointer",
                      minWidth: "60px",
                      textAlign: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "12px", color: "#374151", marginBottom: "8px" }}>Quantity</div>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", width: "fit-content" }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", fontSize: "16px", color: "#4b5563" }}
              >-</button>
              <span style={{ padding: "0 16px", fontSize: "14px", minWidth: "20px", textAlign: "center" }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", fontSize: "16px", color: "#4b5563" }}
              >+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                padding: "14px",
                background: added ? "#16a34a" : "transparent",
                color: added ? "#fff" : "#111827",
                border: added ? "1px solid #16a34a" : "1px solid #111827",
                fontSize: "14px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                transition: "all 0.3s"
              }}
            >
              {added ? "Added!" : "Add to cart"}
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              style={{
                padding: "14px",
                background: isOutOfStock ? "#9ca3af" : "#111827",
                color: "#fff",
                border: "none",
                fontSize: "14px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                transition: "background 0.3s"
              }}
            >
              Buy it now
            </button>
          </div>

          {/* Footer Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "24px" }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /> {/* Replacing with a simpler icon if needed, or actual truck icon */}
            </svg>
            Estimated delivery time 2-5 days
          </div>

          <a 
            href={`/product/${product._id}`}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate(`/product/${product._id}`);
            }}
            style={{
              fontSize: "12px",
              color: "#4b5563",
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            View full details &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
