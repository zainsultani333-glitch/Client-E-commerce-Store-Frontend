import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* ── LEFT: TEXT ── */}
            <div style={{ paddingRight: "40px", animation: "fadeUp 0.9s ease-out" }}>
              <h1 style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#1F4529", lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-1px" }}>
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
            <div style={{ position: "relative", height: "600px", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeUp 1.1s ease-out" }}>
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
      <div style={{ background: "var(--bg-base)", padding: "70px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Top Picks</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.5px" }}>
                Trending <span style={{ background: "linear-gradient(to right, #c9a84c, #e8c96e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Now</span>
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "10px", fontWeight: "400", maxWidth: "400px" }}>
                Hand-picked favourites from our latest collection.
              </p>
            </div>

            <Link to="/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", textDecoration: "none", border: "1px solid var(--border)", background: "var(--bg-card)", transition: "all 0.3s ease", letterSpacing: "0.3px" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.background = "var(--primary-glow)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "var(--bg-card)"; }}
            >
              View Full Collection
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Product grid */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : latestProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
              <p style={{ fontSize: "16px" }}>No products available yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
              {latestProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {!loading && latestProducts.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Link to="/products" className="btn-primary" style={{ padding: "16px 48px", fontSize: "15px", borderRadius: "10px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Shop All Products
              </Link>
            </div>
          )}
        </div>
      </div>



      {/* ─── COLLECTIONS ─── */}
      <div style={{ background: "var(--bg-base)", padding: "70px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Collections</span>
              </div>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "280px 280px", gap: "20px" }}>

            {/* Large feature card — Shirts */}
            <Link to="/products" className="category-card" style={{ gridRow: "1 / 3", position: "relative", borderRadius: "24px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
              <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=900&auto=format&fit=crop" alt="Shirts" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)", transition: "opacity 0.3s" }} className="hover-overlay" />
              {/* Top badge */}
              <div style={{ position: "absolute", top: "20px", left: "20px", background: "var(--primary)", color: "#000", fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 12px", borderRadius: "20px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

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
        </div>
      </div>





      {/* ─── WHY CHOOSE US ─── */}
      <div style={{ background: "#F5F6F8", padding: "80px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "36px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#111827", marginBottom: "8px" }}>
                Why Choose Us
              </h2>
              <p style={{ fontSize: "16px", color: "#6B7280" }}>
                Fashion You Can Feel Good About
              </p>
            </div>

            <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 24px", fontSize: "14px", fontWeight: "600", color: "#374151", border: "1px solid #D1D5DB", borderRadius: "30px", textDecoration: "none", transition: "all 0.3s", backgroundColor: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F3F4F6" }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent" }}
            >
              Learn More ↗
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              {
                title: "Ethical Production",
                desc: "Our garments are made in fair-trade certified facilities for all involved.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
                bgColor: "#DBEAFE"
              },
              {
                title: "Commitment to Innovation",
                desc: "We're always seeking out new ways to improve our sustainability efforts.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.84 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>,
                bgColor: "#CCFBF1"
              },
              {
                title: "Quality You Can Trust",
                desc: "We take pride in producing high-quality, that stands the test of time.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
                bgColor: "#FCE7F3"
              },
              {
                title: "Sustainable Materials",
                desc: "We source eco-friendly fabrics, such as organic cotton and recycled materials.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M21 12a9 9 0 1 0-9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21v-5h5"></path></svg>,
                bgColor: "#EDE9FE"
              }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", padding: "40px 24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", backgroundColor: item.bgColor, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#111827", marginBottom: "12px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.6, fontWeight: "400" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ background: "#F5F6F8", padding: "80px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "36px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#111827", marginBottom: "8px" }}>
                What Our Customers Say
              </h2>
              <p style={{ fontSize: "16px", color: "#6B7280" }}>
                Real reviews from our lovely community
              </p>
            </div>
            {/* Aggregate rating pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "12px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" fill="#EAB308" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
              </div>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#111827" }}>4.9</span>
              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: "400" }}>· 500+ reviews</span>
            </div>
          </div>

          {/* Testimonial grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { text: "The fit is absolutely perfect. I've completely replaced my wardrobe with their shirts. Highly recommended for anyone looking for quality.", author: "Ahmed Khan", role: "Verified Buyer", product: "Premium Shirts", initial: "A", color: "#3b82f6" },
              { text: "Fast delivery, elegant packaging, and the trousers are unbelievably comfortable. It's rare to find this level of craftsmanship nowadays.", author: "Usman Ali", role: "Verified Buyer", product: "Classic Trousers", initial: "U", color: "#a855f7" },
              { text: "Their customer support is unmatched. They helped me pick the right sizes and the exchange process was seamless. A loyal customer now.", author: "Kamran Shah", role: "Verified Buyer", product: "Signature Hoodie", initial: "K", color: "#22c55e" },
              { text: "I was blown away by the quality of the fabrics. The attention to detail is evident in every stitch. I'll definitely be buying more.", author: "Fatima Noor", role: "Verified Buyer", product: "Summer Collection", initial: "F", color: "#eab308" }
            ].map((t, idx) => (
              <div key={idx} style={{
                backgroundColor: "#fff",
                padding: "32px 24px",
                borderRadius: "16px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }} className="hover-lift">
                
                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" fill="#EAB308" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
                </div>

                {/* Review text */}
                <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.7, marginBottom: "24px", fontWeight: "400", flex: 1 }}>
                  "{t.text}"
                </p>

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto", borderTop: "1px solid #F3F4F6", paddingTop: "20px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: `${t.color}22`,
                    color: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: "700"
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", lineHeight: 1.2 }}>{t.author}</div>
                    <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ─── VIP NEWSLETTER ─── */}
      <div className="container" style={{ padding: "70px 24px 80px" }}>
        <div style={{
          background: "linear-gradient(135deg, #111 0%, #222 100%)",
          borderRadius: "32px",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
        }}>
          {/* Abstract background shapes */}
          <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "300px", height: "300px", background: "var(--primary)", filter: "blur(150px)", opacity: 0.15, borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "300px", height: "300px", background: "#fff", filter: "blur(150px)", opacity: 0.05, borderRadius: "50%" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>The Inner Circle</div>
            <h2 style={{ fontSize: "40px", fontWeight: "900", marginBottom: "24px", fontFamily: "'Playfair Display', serif", color: "#fff" }}>Join Our Newsletter</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginBottom: "40px", lineHeight: 1.6 }}>Subscribe to gain early access to new collections, exclusive VIP discounts, and style guides tailored for you.</p>

            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap" }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: "250px", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "15px", outline: "none", backdropFilter: "blur(10px)" }} required />
              <button type="submit" className="btn-primary" style={{ padding: "18px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>Subscribe</button>
            </form>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "16px" }}>We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>

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
        `}
      </style>
    </div>
  );
}
