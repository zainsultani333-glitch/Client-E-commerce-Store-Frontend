import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const CATEGORY_COLORS = {
  "Shirts": "#3b82f6",
  "Hoodies": "#f59e0b",
  "Shorts": "#22c55e",
  "Trousers": "#a855f7",
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.get(`/products/${id}`)
      .then(res => { setProduct(res.data); setLoading(false); })
      .catch(() => { setError("Product not found"); setLoading(false); });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }
    addToCart(product, qty, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product?.quantity <= 0;
  const maxQty = product?.quantity || 1;

  if (loading) return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
      <div className="spinner" style={{ width: "48px", height: "48px" }} />
      <p style={{ color: "var(--text-muted)" }}>Loading product...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "60px" }}>😕</div>
      <h2 style={{ fontSize: "22px", fontWeight: "700" }}>{error}</h2>
      <Link to="/" className="btn-primary">← Back to Shop</Link>
    </div>
  );

  const categoryColor = CATEGORY_COLORS[product.category] || "#6b7280";

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)" }}>

      {/* ─── BREADCRUMB ─── */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "14px 24px", background: "var(--bg-card)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
            <Link to="/" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Shop</Link>
            <span>›</span>
            {product.category && (
              <>
                <span style={{ color: "var(--text-secondary)" }}>{product.category}</span>
                <span>›</span>
              </>
            )}
            <span style={{ color: "var(--text-primary)", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* ─── LEFT: IMAGE GALLERY ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              onClick={() => product.images && product.images.length > 0 && setImgZoomed(true)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "1/1",
                cursor: product.images && product.images.length > 0 ? "zoom-in" : "default",
                position: "relative",
              }}
            >
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                  {product.images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", zIndex: 10, color: "var(--text-primary)", transition: "var(--transition)" }} onMouseEnter={e => e.target.style.background = "var(--bg-hover)"} onMouseLeave={e => e.target.style.background = "var(--bg-card)"}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <button onClick={handleNextImage} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", zIndex: 10, color: "var(--text-primary)", transition: "var(--transition)" }} onMouseEnter={e => e.target.style.background = "var(--bg-hover)"} onMouseLeave={e => e.target.style.background = "var(--bg-card)"}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-hover))", gap: "16px" }}>
                  <span style={{ fontSize: "80px" }}>👕</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>No image available</span>
                </div>
              )}

              {/* Stock badge on image */}
              {!isOutOfStock && product.quantity <= 10 && (
                <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                  <span className="badge badge-gold">⚠ Only {product.quantity} left</span>
                </div>
              )}
              {isOutOfStock && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="badge badge-red" style={{ fontSize: "16px", padding: "10px 20px" }}>Out of Stock</span>
                </div>
              )}
              {product.images && product.images.length > 0 && !isOutOfStock && (
                <div style={{ position: "absolute", bottom: "14px", right: "14px", background: "rgba(0,0,0,0.6)", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to zoom
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px",
                      border: `2px solid ${selectedImage === idx ? "var(--primary)" : "transparent"}`,
                      cursor: "pointer", transition: "var(--transition)",
                      boxShadow: selectedImage === idx ? "var(--shadow-sm)" : "none",
                      opacity: selectedImage === idx ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ─── RIGHT: DETAILS ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Category badge */}
            {product.category && (
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  background: `${categoryColor}18`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                }}>
                  {product.category}
                </span>
              </div>
            )}

            {/* Name */}
            <div>
              <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "900", lineHeight: 1.15, margin: "0 0 8px", color: "var(--text-primary)" }}>
                {product.name}
              </h1>
              {product.description && (
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div style={{ padding: "20px", background: "linear-gradient(135deg, rgba(212,163,115,0.08), rgba(212,163,115,0.03))", border: "1px solid rgba(212,163,115,0.2)", borderRadius: "14px" }}>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>Price</div>
              <div style={{ fontSize: "40px", fontWeight: "900", color: "var(--primary)", lineHeight: 1 }}>
                Rs. {product.price.toLocaleString()}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
                Cash on Delivery available
              </div>
            </div>

            {/* Stock info */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <div style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: isOutOfStock ? "var(--error)" : product.quantity <= 5 ? "#f59e0b" : "var(--success)",
                flexShrink: 0,
                boxShadow: `0 0 8px ${isOutOfStock ? "rgba(239,68,68,0.5)" : product.quantity <= 5 ? "rgba(245,158,11,0.5)" : "rgba(34,197,94,0.5)"}`,
              }} />
              <span style={{ fontSize: "14px", fontWeight: "600", color: isOutOfStock ? "var(--error)" : product.quantity <= 5 ? "#f59e0b" : "var(--success)" }}>
                {isOutOfStock ? "Out of Stock" : product.quantity <= 5 ? `Only ${product.quantity} pieces left!` : `${product.quantity} pieces in stock`}
              </span>
            </div>

            {/* Size selector */}
            {!isOutOfStock && product.sizes && product.sizes.length > 0 && (
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  Select Size *
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: `1px solid ${selectedSize === size ? "var(--primary)" : "var(--border)"}`,
                        background: selectedSize === size ? "var(--primary-glow)" : "var(--bg-card)",
                        color: selectedSize === size ? "var(--primary)" : "var(--text-secondary)",
                        fontWeight: selectedSize === size ? "700" : "500",
                        cursor: "pointer", transition: "var(--transition)", fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {!isOutOfStock && product.colors && product.colors.length > 0 && (
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  Select Color *
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: `1px solid ${selectedColor === color ? "var(--primary)" : "var(--border)"}`,
                        background: selectedColor === color ? "var(--primary-glow)" : "var(--bg-card)",
                        color: selectedColor === color ? "var(--primary)" : "var(--text-secondary)",
                        fontWeight: selectedColor === color ? "700" : "500",
                        cursor: "pointer", transition: "var(--transition)", fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  Quantity
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div className="qty-control" style={{ borderRadius: "12px" }}>
                    <button className="qty-btn" style={{ width: "44px", height: "44px", fontSize: "20px" }}
                      onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <div className="qty-value" style={{ fontSize: "18px", minWidth: "52px" }}>{qty}</div>
                    <button className="qty-btn" style={{ width: "44px", height: "44px", fontSize: "20px" }}
                      onClick={() => setQty(q => Math.min(maxQty, q + 1))}>+</button>
                  </div>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    Max: {maxQty} pcs
                  </span>
                </div>
              </div>
            )}

            {/* Subtotal */}
            {!isOutOfStock && qty > 1 && (
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                Subtotal: <span style={{ color: "var(--primary)", fontWeight: "800", fontSize: "18px" }}>Rs. {(product.price * qty).toLocaleString()}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                id={`add-to-cart-detail-${product._id}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn-primary"
                style={{
                  padding: "16px",
                  fontSize: "16px",
                  borderRadius: "14px",
                  background: isOutOfStock
                    ? "var(--bg-elevated)"
                    : added
                    ? "linear-gradient(135deg, var(--success), #16a34a)"
                    : undefined,
                  color: isOutOfStock ? "var(--text-muted)" : undefined,
                  cursor: isOutOfStock ? "not-allowed" : "pointer",
                  justifyContent: "center",
                }}
              >
                {added ? (
                  <><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg> Added to Basket!</>
                ) : isOutOfStock ? "Out of Stock" : (
                  <><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg> Add to Basket — Rs. {(product.price * qty).toLocaleString()}</>
                )}
              </button>
              <button onClick={() => navigate(-1)} className="btn-ghost" style={{ padding: "14px", fontSize: "15px", justifyContent: "center" }}>
                ← Back to Shop
              </button>
            </div>

            {/* Product Meta */}
            <div style={{ padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                Product Details
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Category", value: product.category || "—" },
                  { label: "Stock", value: isOutOfStock ? "Out of Stock" : `${product.quantity} pieces available` },
                  { label: "Payment", value: "Cash on Delivery" },
                  { label: "Added", value: new Date(product.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" }) },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── IMAGE ZOOM MODAL ─── */}
      {imgZoomed && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging && zoomScale > 1) {
              setPan(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
            }
          }}
        >
          <div
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
            onWheel={(e) => {
              if (e.deltaY < 0) setZoomScale(prev => Math.min(prev + 0.2, 4));
              else {
                setZoomScale(prev => {
                  const newScale = Math.max(prev - 0.2, 1);
                  if (newScale === 1) setPan({ x: 0, y: 0 });
                  return newScale;
                });
              }
            }}
            onMouseDown={(e) => {
              if (zoomScale > 1) {
                e.preventDefault();
                setIsDragging(true);
              }
            }}
          >
            <img src={product.images[selectedImage]} alt={product.name}
              style={{
                maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "12px",
                boxShadow: zoomScale > 1 ? "none" : "0 30px 80px rgba(0,0,0,0.8)",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                transition: isDragging ? "none" : "transform 0.2s ease",
                pointerEvents: "none"
              }}
            />
          </div>

          {/* Zoom controls */}
          <div style={{ position: "absolute", bottom: "40px", display: "flex", gap: "24px", background: "rgba(255,255,255,0.1)", padding: "12px 24px", borderRadius: "30px", backdropFilter: "blur(10px)", alignItems: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
            <button onClick={() => { setZoomScale(prev => { const n = Math.max(prev - 0.2, 1); if(n===1) setPan({x:0,y:0}); return n; }); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.2)"}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
            </button>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "600", minWidth: "50px", textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
              {Math.round(zoomScale * 100)}%
            </span>
            <button onClick={() => setZoomScale(prev => Math.min(prev + 0.2, 4))} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.2)"}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <button onClick={() => { setImgZoomed(false); setZoomScale(1); setPan({x:0, y:0}); }}
            style={{ position: "absolute", top: "20px", right: "24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "44px", height: "44px", color: "#fff", cursor: "pointer", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", zIndex: 10 }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.1)"}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
