import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

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

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imgContainerRef = useRef(null);

  // Attach non-passive wheel listener to prevent page scroll during zoom
  useEffect(() => {
    const el = imgContainerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setZoomScale(prev => {
        const next = e.deltaY < 0 ? Math.min(prev + 0.25, 4) : Math.max(prev - 0.25, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

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
      .then(res => { 
        setProduct(res.data); 
        setLoading(false); 
        if (res.data.category) {
          api.get('/products').then(allRes => {
            const related = allRes.data.filter(p => p.category === res.data.category && p._id !== res.data._id).slice(0, 4);
            setRelatedProducts(related);
          });
        }
      })
      .catch(() => { setError("Product not found"); setLoading(false); });
  }, [id]);

  // The CSS marquee animation handles the loop, so no interval needed here
  useEffect(() => {
    // Left empty since we moved to CSS animation
  }, []);

  const displayReviews = product?.reviews ? [...product.reviews].reverse() : [];
  const loopReviews = displayReviews.length > 3 ? [...displayReviews, ...displayReviews] : displayReviews;

  const averageRating = product?.reviews?.length
    ? (product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return alert("Please fill all fields");
    setSubmittingReview(true);
    try {
      const res = await api.post(`/products/${product._id}/reviews`, {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment
      });
      setProduct(res.data.product);
      setReviewName("");
      setReviewRating(5);
      setReviewComment("");
    } catch (err) {
      alert("Failed to add review");
    } finally {
      setSubmittingReview(false);
    }
  };

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
        <div className="product-detail-grid">

          {/* ─── LEFT: IMAGE GALLERY ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              ref={imgContainerRef}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                overflow: "hidden",
                height: "70vh",
                minHeight: "420px",
                maxHeight: "700px",
                cursor: product.images?.length > 0
                  ? (zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in")
                  : "default",
                position: "relative",
                userSelect: "none",
              }}
              onDoubleClick={() => {
                if (!product.images?.length) return;
                if (zoomScale > 1) {
                  setZoomScale(1);
                  setPan({ x: 0, y: 0 });
                } else {
                  setZoomScale(2.5);
                }
              }}
              onMouseDown={(e) => {
                if (zoomScale > 1 && product.images?.length > 0) {
                  e.preventDefault();
                  setIsDragging(true);
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={(e) => {
                if (isDragging && zoomScale > 1) {
                  setPan(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
                }
              }}
            >
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                      transition: isDragging ? "none" : "transform 0.25s ease",
                      pointerEvents: "none",
                    }}
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setZoomScale(1); setPan({ x: 0, y: 0 }); handlePrevImage(e); }}
                        style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", zIndex: 10, color: "var(--text-primary)", transition: "var(--transition)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setZoomScale(1); setPan({ x: 0, y: 0 }); handleNextImage(e); }}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", zIndex: 10, color: "var(--text-primary)", transition: "var(--transition)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </>
                  )}
                  {/* Hint overlay */}
                  {zoomScale === 1 && (
                    <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.55)", borderRadius: "20px", padding: "5px 14px", fontSize: "11px", color: "#fff", whiteSpace: "nowrap", pointerEvents: "none", backdropFilter: "blur(4px)" }}>
                      Double-click to zoom · Scroll to zoom
                    </div>
                  )}
                  {/* Zoom level pill */}
                  {zoomScale > 1 && (
                    <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.65)", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", pointerEvents: "none", backdropFilter: "blur(4px)" }}>
                      {Math.round(zoomScale * 100)}% · Double-click to reset
                    </div>
                  )}
                </>
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-hover))", gap: "16px" }}>
                  <span style={{ fontSize: "80px" }}>👕</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>No image available</span>
                </div>
              )}

              {/* Stock badges */}
              {!isOutOfStock && product.quantity <= 10 && (
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10 }}>
                  <span className="badge badge-gold">⚠ Only {product.quantity} left</span>
                </div>
              )}
              {isOutOfStock && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
                  <span className="badge badge-red" style={{ fontSize: "16px", padding: "10px 20px" }}>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => { setSelectedImage(idx); setZoomScale(1); setPan({ x: 0, y: 0 }); }}
                    style={{
                      width: "72px", height: "72px", objectFit: "cover", borderRadius: "10px",
                      border: `2px solid ${selectedImage === idx ? "var(--primary)" : "transparent"}`,
                      cursor: "pointer", transition: "var(--transition)", flexShrink: 0,
                      boxShadow: selectedImage === idx ? "var(--shadow-sm)" : "none",
                      opacity: selectedImage === idx ? 1 : 0.55,
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
              <div style={{ fontSize: "clamp(32px, 8vw, 40px)", fontWeight: "900", color: "var(--primary)", lineHeight: 1, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ whiteSpace: "nowrap" }}>Rs. {product.price.toLocaleString()}</span>
                {product.discountPercentage > 0 && (
                  <span style={{ fontSize: "clamp(16px, 5vw, 20px)", textDecoration: "line-through", color: "var(--text-muted)", fontWeight: "500", whiteSpace: "nowrap" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span style={{ fontSize: "14px", background: "#e11d48", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontWeight: "700", whiteSpace: "nowrap" }}>
                    -{product.discountPercentage}%
                  </span>
                )}
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
                        cursor: "pointer", transition: "var(--transition)", fontFamily: "'Montserrat', sans-serif"
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
                        cursor: "pointer", transition: "var(--transition)", fontFamily: "'Montserrat', sans-serif"
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
            </div>


          </div>
        </div>
      </div>

      {/* ─── REVIEWS SECTION ─── */}
      <div className="container" style={{ padding: "0 24px 64px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "32px", color: "var(--text-primary)", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px" }}>Customer Reviews</h2>
        
        {/* Top: Summary & Reviews Carousel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
           {/* Summary Header */}
           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)", lineHeight: 1 }}>{averageRating}</div>
                <div>
                  <div style={{ color: "#fbbf24", fontSize: "16px", letterSpacing: "1px" }}>
                    {"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Based on {product.reviews?.length || 0} reviews</div>
                </div>
              </div>
           </div>

           {/* Carousel */}
           <div style={{ overflow: "hidden", position: "relative", padding: "10px 0" }}>
            <style>
              {`
                @keyframes scrollMarquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(calc(-50% - 8px)); }
                }
                .reviews-track {
                  animation: scrollMarquee 20s linear infinite;
                }
                .reviews-track:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            {displayReviews.length > 0 ? (
              <div className={displayReviews.length > 3 ? "reviews-track" : ""} style={{ 
                display: "flex", 
                gap: "16px", 
                flexWrap: displayReviews.length > 3 ? "nowrap" : "wrap",
                width: displayReviews.length > 3 ? "max-content" : "100%"
              }}>
                {loopReviews.map((rev, idx) => (
                  <div key={idx} style={{ 
                    flex: displayReviews.length > 3 ? "0 0 320px" : "1 1 300px",
                    background: "var(--bg-card)", 
                    padding: "20px", 
                    borderRadius: "12px", 
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    display: "flex", flexDirection: "column", gap: "12px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-light))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", flexShrink: 0 }}>
                          {rev.userName.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <strong style={{ fontSize: "14px", color: "var(--text-primary)", display: "block", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{rev.userName}</strong>
                          <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>{new Date(rev.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div style={{ color: "#fbbf24", fontSize: "14px", flexShrink: 0 }}>
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)", fontSize: "15px" }}>
                No reviews yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Form / Write a Review Button */}
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          {!showReviewForm ? (
            <button onClick={() => setShowReviewForm(true)} className="btn-primary" style={{ padding: "14px 32px", borderRadius: "12px", fontSize: "15px" }}>Add Review</button>
          ) : (
            <form onSubmit={handleSubmitReview} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left", background: "var(--bg-elevated)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", textAlign: "center" }}>Add Your Review</h3>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <input type="text" placeholder="Your Name" value={reviewName} onChange={e => setReviewName(e.target.value)} required style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", outline: "none", fontFamily: "'Montserrat', sans-serif", fontSize: "14px" }} />
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "4px 0" }}>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>Rating:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setReviewRating(star)}
                      style={{ background: "none", border: "none", color: star <= reviewRating ? "#fbbf24" : "var(--border)", fontSize: "24px", cursor: "pointer", padding: 0, lineHeight: 1 }}
                    >★</button>
                  ))}
                </div>
              </div>
              
              <textarea placeholder="Your Comment" value={reviewComment} onChange={e => setReviewComment(e.target.value)} required rows="3" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", outline: "none", resize: "vertical", fontFamily: "'Montserrat', sans-serif", fontSize: "14px" }}></textarea>
              
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="submit" disabled={submittingReview} className="btn-primary" style={{ flex: 1, padding: "12px", borderRadius: "8px" }}>{submittingReview ? "Submitting..." : "Submit Review"}</button>
                <button type="button" onClick={() => setShowReviewForm(false)} className="btn-ghost" style={{ padding: "12px", borderRadius: "8px" }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ─── RELATED PRODUCTS ─── */}
      {relatedProducts.length > 0 && (
        <div className="container" style={{ padding: "0 24px 64px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px", color: "var(--text-primary)", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>More from {product.category}</h2>
          <div className="related-products-grid">
            {relatedProducts.map(rp => (
              <ProductCard key={rp._id} product={rp} />
            ))}
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <Footer />

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
            <button onClick={() => { setZoomScale(prev => { const n = Math.max(prev - 0.2, 1); if (n === 1) setPan({ x: 0, y: 0 }); return n; }); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.2)"}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
            </button>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "600", minWidth: "50px", textAlign: "center", fontFamily: "'Montserrat', sans-serif" }}>
              {Math.round(zoomScale * 100)}%
            </span>
            <button onClick={() => setZoomScale(prev => Math.min(prev + 0.2, 4))} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.2)"}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <button onClick={() => { setImgZoomed(false); setZoomScale(1); setPan({ x: 0, y: 0 }); }}
            style={{ position: "absolute", top: "20px", right: "24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "44px", height: "44px", color: "#fff", cursor: "pointer", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", zIndex: 10 }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.1)"}>
            ×
          </button>
        </div>
      )}

      <style>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 48px;
          }
        }
        
        .related-products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 500px) { .related-products-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .related-products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .related-products-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </div>
  );
}
