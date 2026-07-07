import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const SkeletonCard = () => (
  <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
    <div className="skeleton" style={{ aspectRatio: "4/3" }} />
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="skeleton" style={{ height: "18px", width: "70%", borderRadius: "6px" }} />
      <div className="skeleton" style={{ height: "12px", width: "90%", borderRadius: "6px" }} />
      <div className="skeleton" style={{ height: "24px", width: "40%", borderRadius: "6px" }} />
      <div className="skeleton" style={{ height: "40px", borderRadius: "10px" }} />
    </div>
  </div>
);

// Sleek professional icons
const Icons = {
  Quality: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  Delivery: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  Secure: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Support: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
  ];

  useEffect(() => {
    api.get("/products")
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const latestProducts = products.slice(0, 4);

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", overflowX: "hidden" }}>

      {/* ─── HERO BANNER ─── */}
      <div style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#C2E8CE" }}>
        <div className="container" style={{ padding: "0 24px", width: "100%" }}>
          <div className="hero-grid" style={{ alignItems: "center" }}>

            {/* ── LEFT: TEXT ── */}
            <div className="hero-text" style={{ animation: "fadeUp 0.9s ease-out" }}>
              <h1 className="hero-title" style={{ fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#1F4529", lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-1px" }}>
                Discover and<br />
                Find Your Own<br />
                Fashion!
              </h1>

              <p style={{ fontSize: "18px", color: "#2B5E39", lineHeight: 1.6, marginBottom: "40px", maxWidth: "440px", fontWeight: "500" }}>
                Explore our curated collection of stylish clothing and accessories tailored to your unique taste.
              </p>

              <Link to="/products" style={{ display: "inline-block", padding: "16px 36px", fontSize: "14px", borderRadius: "4px", backgroundColor: "#1F4529", color: "#fff", fontWeight: "600", textDecoration: "none", boxShadow: "0 10px 30px rgba(31,69,41,0.25)", transition: "all 0.3s ease", letterSpacing: "1px" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(31,69,41,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(31,69,41,0.25)"; }}
              >
                EXPLORE NOW
              </Link>
            </div>

            {/* ── RIGHT: IMAGE & SHAPES ── */}
            <div className="hero-image" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeUp 1.1s ease-out" }}>
              {/* Background Shape */}
              <div style={{ position: "absolute", top: "5%", right: "5%", width: "80%", height: "90%", backgroundColor: "#6BBE82", borderRadius: "80px 180px 80px 80px" }} />

              {/* Dot Pattern 1 (Top Right) */}
              <div style={{ position: "absolute", top: "20%", right: "0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", opacity: 0.4 }}>
                {[...Array(16)].map((_, i) => <div key={`dot1-${i}`} style={{ width: "6px", height: "6px", backgroundColor: "#1F4529", borderRadius: "50%" }} />)}
              </div>

              {/* Dot Pattern 2 (Bottom Left) */}
              <div style={{ position: "absolute", bottom: "15%", left: "5%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", opacity: 0.4 }}>
                {[...Array(16)].map((_, i) => <div key={`dot2-${i}`} style={{ width: "6px", height: "6px", backgroundColor: "#1F4529", borderRadius: "50%" }} />)}
              </div>

              {/* Main Image Slider */}
              <div style={{ position: "relative", zIndex: 2, height: "100%", width: "80%", borderRadius: "80px 180px 80px 80px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", backgroundColor: "#C2E8CE" }}>
                {heroImages.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Fashion Model ${index + 1}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      opacity: currentSlide === index ? 1 : 0,
                      transition: "opacity 1s ease-in-out"
                    }}
                  />
                ))}

                {/* Slider Dots */}
                <div style={{ position: "absolute", bottom: "24px", left: "0", width: "100%", display: "flex", justifyContent: "center", gap: "8px", zIndex: 10 }}>
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: currentSlide === index ? "#1F4529" : "rgba(255,255,255,0.7)",
                        border: currentSlide === index ? "2px solid #fff" : "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>




      {/* ─── TOP PICKS SECTION ─── */}
      <div style={{ background: "var(--bg-base)", padding: "40px 0" }}>
        <motion.div
          className="container"
          style={{ padding: "0 24px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.5px" }}>
                Trending <span style={{ background: "linear-gradient(to right, #c9a84c, #e8c96e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Now</span>
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "10px", fontWeight: "400", maxWidth: "400px" }}>
                Hand-picked favourites from our latest collection.
              </p>
            </div>

            <Link to="/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 36px", background: "#1a3622", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: "6px", transition: "all 0.3s ease", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2a5235"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a3622"; }}
            >
              View Full Collection
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="product-grid">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : latestProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
              <p style={{ fontSize: "16px" }}>No products available yet.</p>
            </div>
          ) : (
            <div className="product-grid">
              {latestProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {!loading && latestProducts.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 36px", background: "#1a3622", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: "6px", transition: "all 0.3s ease", textDecoration: "none" }} onMouseEnter={e => { e.currentTarget.style.background = "#2a5235"; }} onMouseLeave={e => { e.currentTarget.style.background = "#1a3622"; }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Shop All Products
              </Link>
            </div>
          )}
        </motion.div>
      </div>



      {/* ─── COLLECTIONS ─── */}
      <div style={{ background: "var(--bg-base)", padding: "40px 0" }}>
        <motion.div
          className="container"
          style={{ padding: "0 24px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.5px" }}>
                Shop by <span style={{ background: "linear-gradient(to right, #c9a84c, #e8c96e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Category</span>
              </h2>
            </div>
            <Link to="/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", textDecoration: "none", border: "1px solid var(--border)", background: "var(--bg-card)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              All Products
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Bento grid */}
          <div className="bento-grid">

            {/* Large feature card — Shirts */}
            <Link to="/products" className="category-card bento-large-card" style={{ position: "relative", borderRadius: "24px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
              <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=900&auto=format&fit=crop" alt="Shirts" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)", transition: "opacity 0.3s" }} className="hover-overlay" />
              {/* Top badge */}
              <div style={{ position: "absolute", top: "20px", left: "20px", background: "var(--primary)", color: "#ffffffff", fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 12px", borderRadius: "20px" }}>
                Featured
              </div>
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>Collection</p>
                <h3 style={{ color: "#fff", fontSize: "36px", fontWeight: "900", margin: "0 0 16px", lineHeight: 1 }}>Shirts</h3>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 16px", borderRadius: "30px", color: "#fff", fontSize: "13px", fontWeight: "600" }}>
                  Shop Now <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </Link>

            {/* Hoodies — top right */}
            <Link to="/products" className="category-card" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700&auto=format&fit=crop" alt="Hoodies" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)", transition: "opacity 0.3s" }} className="hover-overlay" />
              <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: "#fff", fontSize: "22px", fontWeight: "800", margin: 0 }}>Hoodies</h3>
                <div className="cat-arrow" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "var(--transition)" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </Link>

            {/* Bottom right — split into 2 */}
            <div className="bento-split-grid">

              {/* Shorts */}
              <Link to="/products" className="category-card" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
                <img src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop" alt="Shorts" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)", transition: "opacity 0.3s" }} className="hover-overlay" />
                <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                  <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 8px" }}>Shorts</h3>
                  <div className="cat-arrow" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "var(--transition)" }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>

              {/* Trousers */}
              <Link to="/products" className="category-card" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
                <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500&auto=format&fit=crop" alt="Trousers" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)", transition: "opacity 0.3s" }} className="hover-overlay" />
                <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                  <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 8px" }}>Trousers</h3>
                  <div className="cat-arrow" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "var(--transition)" }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>





      {/* ─── WHY CHOOSE US ─── */}
      <div style={{ background: "#FCFBF7", padding: "80px 0" }}>
        <motion.div
          className="container"
          style={{ padding: "0 24px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "44px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", marginBottom: "12px", letterSpacing: "-0.5px" }}>
                Why Choose Us
              </h2>
              <div style={{ width: "40px", height: "2px", backgroundColor: "#D4C4A3", marginBottom: "20px" }} />
              <p style={{ fontSize: "17px", color: "#8B867E", fontWeight: "400" }}>
                Fashion You Can Feel Good About
              </p>
            </div>

            <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "14px 36px", background: "#1a3622", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: "6px", transition: "all 0.3s ease", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2a5235" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a3622" }}
            >
              Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="four-col-grid" style={{ gap: "24px" }}>
            {[
              {
                title: "Ethical Production",
                desc: "Our garments are made in fair-trade certified facilities for everyone involved.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3D4A3E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                bgColor: "#E9EBE4"
              },
              {
                title: "Commitment to Innovation",
                desc: "We're always seeking out new ways to improve our sustainability efforts.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A7840" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" />
                    <path d="M12 2v2" /><path d="M4 8h2" /><path d="M18 8h2" /><path d="M5 14l1.5-1.5" /><path d="M19 14l-1.5-1.5" />
                  </svg>
                ),
                bgColor: "#FBF3E7"
              },
              {
                title: "Quality You Can Trust",
                desc: "We take pride in producing high-quality, that stands the test of time.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8D6B52" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15l-3 2 1-4-3-2h4l1-4 1 4h4l-3 2 1 4z" />
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 22l4-2 4 2v-4a10 10 0 0 0-8 0v4z" />
                  </svg>
                ),
                bgColor: "#F8EDE8"
              },
              {
                title: "Sustainable Materials",
                desc: "We source eco-friendly fabrics, such as organic cotton and recycled materials.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#485848" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                    <path d="M2 12a10 10 0 1 0 18-6" />
                  </svg>
                ),
                bgColor: "#E9EBE4"
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: "#fff",
                padding: "48px 32px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                minHeight: "340px"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "28px",
                  backgroundColor: item.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "32px"
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", marginBottom: "20px", lineHeight: 1.25, letterSpacing: "-0.2px" }}>
                  {item.title}
                </h3>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#D4C4A3", marginBottom: "20px" }} />
                <p style={{ fontSize: "15px", color: "#8B867E", lineHeight: 1.7, fontWeight: "400" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ background: "#FCFBF7", padding: "40px 0 80px 0" }}>
        <motion.div
          className="container"
          style={{ padding: "0 24px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "44px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", marginBottom: "12px", letterSpacing: "-0.5px" }}>
                What Our Customers Say
              </h2>
              <div style={{ width: "40px", height: "2px", backgroundColor: "#D4C4A3", marginBottom: "20px" }} />
              <p style={{ fontSize: "17px", color: "#8B867E", fontWeight: "400" }}>
                Real reviews from our lovely community
              </p>
            </div>
            {/* Aggregate rating pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", padding: "14px 28px", background: "#fff", border: "1px solid #D4C4A3", borderRadius: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(5)].map((_, i) => <svg key={i} width="16" height="16" fill="#CBA365" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
              </div>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#1A201C" }}>4.9</span>
              <span style={{ fontSize: "14px", color: "#8B867E", fontWeight: "400" }}>500+ reviews</span>
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="four-col-grid" style={{ gap: "24px" }}>
            {[
              { text: "The fit is absolutely perfect. I've completely replaced my wardrobe with their shirts. Highly recommended for anyone looking for quality.", author: "Ahmed Khan", role: "Verified Buyer", initial: "A", color: "#1A241C" },
              { text: "Fast delivery, elegant packaging, and the trousers are unbelievably comfortable. It's rare to find this level of craftsmanship nowadays.", author: "Usman Ali", role: "Verified Buyer", initial: "U", color: "#C1A78E" },
              { text: "Their customer support is unmatched. They helped me pick the right sizes and the exchange process was seamless. A loyal customer now.", author: "Kamran Shah", role: "Verified Buyer", initial: "K", color: "#849378" },
              { text: "I was blown away by the quality of the fabrics. The attention to detail is evident in every stitch. I'll definitely be buying more.", author: "Fatima Noor", role: "Verified Buyer", initial: "F", color: "#AA836A" }
            ].map((t, idx) => (
              <div key={idx} style={{
                backgroundColor: "#fff",
                padding: "40px 32px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>

                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="16" height="16" fill="#CBA365" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
                </div>

                {/* Review text */}
                <p style={{ fontSize: "15px", color: "#4A4540", lineHeight: 1.7, marginBottom: "28px", fontWeight: "400", flex: 1 }}>
                  "{t.text}"
                </p>

                {/* Separator */}
                <div style={{ width: "100%", height: "1px", backgroundColor: "#EBE3D5", marginBottom: "24px" }} />

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    backgroundColor: t.color,
                    color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: "600", fontFamily: "'Playfair Display', serif"
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#1A201C", lineHeight: 1.2, marginBottom: "4px" }}>{t.author}</div>
                    <div style={{ fontSize: "13px", color: "#8B867E", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#CBA365"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>


      {/* ─── VIP NEWSLETTER ─── */}
      <motion.div
        className="container"
        style={{ padding: "0 24px 80px 24px" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="newsletter-box" style={{
          backgroundColor: "#FCFAF6",
          border: "1px solid #EAE3D7",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          padding: "70px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)"
        }}>
          {/* Subtle side dots patterns */}
          <div style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", color: "#D4C4A3", opacity: 0.6 }}>
            <svg width="24" height="48" viewBox="0 0 24 48" fill="currentColor">
              <circle cx="4" cy="4" r="1.2" /><circle cx="4" cy="14" r="1.2" /><circle cx="4" cy="24" r="1.2" /><circle cx="4" cy="34" r="1.2" /><circle cx="4" cy="44" r="1.2" />
              <circle cx="12" cy="9" r="1.2" /><circle cx="12" cy="19" r="1.2" /><circle cx="12" cy="29" r="1.2" /><circle cx="12" cy="39" r="1.2" />
              <circle cx="20" cy="14" r="1.2" /><circle cx="20" cy="24" r="1.2" /><circle cx="20" cy="34" r="1.2" />
            </svg>
          </div>
          <div style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", color: "#D4C4A3", opacity: 0.6 }}>
            <svg width="24" height="48" viewBox="0 0 24 48" fill="currentColor">
              <circle cx="20" cy="4" r="1.2" /><circle cx="20" cy="14" r="1.2" /><circle cx="20" cy="24" r="1.2" /><circle cx="20" cy="34" r="1.2" /><circle cx="20" cy="44" r="1.2" />
              <circle cx="12" cy="9" r="1.2" /><circle cx="12" cy="19" r="1.2" /><circle cx="12" cy="29" r="1.2" /><circle cx="12" cy="39" r="1.2" />
              <circle cx="4" cy="14" r="1.2" /><circle cx="4" cy="24" r="1.2" /><circle cx="4" cy="34" r="1.2" />
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
            {/* Top Star and Lines */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "24px", color: "#CBA365" }}>
              <div style={{ height: "1px", width: "40px", backgroundColor: "#D4C4A3" }} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
              </svg>
              <div style={{ height: "1px", width: "40px", backgroundColor: "#D4C4A3" }} />
            </div>

            <h2 className="newsletter-title" style={{ fontSize: "46px", fontWeight: "400", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>
              <span style={{ color: "#1A201C" }}>Join Our </span>
              <span style={{ color: "#B59567", fontStyle: "italic" }}>Newsletter</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#5C5854", marginBottom: "44px", lineHeight: 1.6, fontWeight: "400" }}>
              Subscribe to gain early access to new collections, exclusive VIP discounts,<br />and style guides tailored for you.
            </p>

            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "28px" }}>
              <div style={{ position: "relative", flex: "1", minWidth: "280px", maxWidth: "400px" }}>
                <div style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "#B59567" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  style={{ width: "100%", padding: "16px 24px 16px 52px", borderRadius: "10px", border: "1px solid #EAE3D7", background: "#fff", color: "#1A201C", fontSize: "15px", outline: "none", transition: "all 0.3s", boxShadow: "0 2px 10px rgba(0,0,0,0.01)" }}
                  required
                />
              </div>
              <button 
                type="submit" 
                style={{
                  padding: "14px 40px",
                  background: "#1a3622",
                  color: "#fff",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => { e.target.style.background = "#2a5235"; }}
                onMouseLeave={e => { e.target.style.background = "#1a3622"; }}
              >
                SUBSCRIBE
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", color: "#8B867E", fontWeight: "400" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B59567" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
              We respect your privacy. Unsubscribe at any time.
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes kenburns {
            from { transform: scale(1.05); }
            to { transform: scale(1.15); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.4); }
          }
          .category-card:hover .hover-scale { transform: scale(1.1) !important; }
          .category-card:hover .hover-overlay { opacity: 1 !important; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%) !important; }
          .category-card:hover .cat-arrow { background: var(--primary) !important; color: var(--bg-base) !important; transform: translateX(5px); }
          .hover-lift:hover { transform: translateY(-8px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; border-color: rgba(201,168,76,0.3) !important; }
          
          /* Hero Section Responsive */
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-text {
            padding-right: 0px;
          }
          .hero-title {
            font-size: clamp(40px, 10vw, 72px);
          }
          .hero-image {
            height: 400px;
            width: 100%;
          }
          
          @media (min-width: 768px) {
            .hero-image {
              height: 500px;
            }
          }
          
          @media (min-width: 1024px) {
            .hero-grid {
              grid-template-columns: 1fr 1fr;
              gap: 60px;
            }
            .hero-text {
              padding-right: 40px;
            }
            .hero-title {
              font-size: clamp(48px, 6vw, 72px);
            }
            .hero-image {
              height: 600px;
            }
          }
          
          /* Product Grid Responsive */
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
          
          /* Bento Grid Responsive */
          .bento-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-auto-rows: 280px;
            gap: 20px;
          }
          .bento-large-card {
            grid-row: auto;
          }
          .bento-split-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            grid-row: span 2;
          }
          @media (min-width: 768px) {
            .bento-grid {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 280px 280px;
            }
            .bento-large-card {
              grid-row: 1 / 3;
            }
            .bento-split-grid {
              grid-template-columns: 1fr 1fr;
              grid-row: auto;
            }
          }
          
          /* Four Column Grid Responsive (Why Choose Us, etc) */
          .four-col-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 640px) {
            .four-col-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .four-col-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          /* Newsletter Responsive */
          .newsletter-box {
            padding: 40px 24px;
            border-radius: 20px;
          }
          .newsletter-title {
            font-size: 28px;
          }
          .newsletter-form {
            display: flex;
            gap: 12px;
            max-width: 480px;
            margin: 0 auto;
            flex-direction: column;
          }
          .newsletter-btn {
            width: 100%;
          }
          @media (min-width: 640px) {
            .newsletter-box {
              padding: 80px 24px;
              border-radius: 32px;
            }
            .newsletter-title {
              font-size: 40px;
            }
            .newsletter-form {
              flex-direction: row;
            }
            .newsletter-btn {
              width: auto;
            }
          }
        `}
      </style>
    </div>
  );
}
