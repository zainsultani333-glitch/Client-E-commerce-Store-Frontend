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
  useEffect(() => {
    api.get("/products")
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const latestProducts = products.slice(0, 4);

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", overflowX: "hidden" }}>

      {/* ─── HERO SECTION ─── */}
      <div style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#080808",
      }}>
        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "0", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Subtle grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "120px 24px 80px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* ── LEFT: TEXT ── */}
            <div style={{ animation: "fadeUp 0.9s ease-out" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "32px", padding: "8px 18px", background: "rgba(201,168,76,0.08)", backdropFilter: "blur(12px)", borderRadius: "100px", border: "1px solid rgba(201,168,76,0.3)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 10px var(--primary)", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "2.5px", textTransform: "uppercase" }}>New Season 2026</span>
              </div>

              {/* Heading */}
              <h1 style={{ fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: "900", lineHeight: 1.05, marginBottom: "28px", color: "#fff" }}>
                Dress Like<br />
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{ color: "var(--primary)" }}>You Mean</span>
                </span><br />
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: "300", fontStyle: "italic" }}>Business.</span>
              </h1>

              {/* Divider */}
              <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, var(--primary), transparent)", borderRadius: "2px", marginBottom: "28px" }} />

              {/* Subtext */}
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", maxWidth: "440px", lineHeight: 1.8, marginBottom: "44px", fontWeight: "300" }}>
                Precision-crafted shirts, hoodies, shorts &amp; trousers for the modern Pakistani gentleman. Every stitch tells a story.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "56px" }}>
                <Link to="/products" className="btn-primary" style={{ padding: "16px 36px", fontSize: "15px", borderRadius: "10px", letterSpacing: "0.5px", fontWeight: "700", boxShadow: "0 8px 30px rgba(201,168,76,0.35)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Shop Now
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link to="/about" style={{ padding: "16px 36px", fontSize: "15px", borderRadius: "10px", fontWeight: "600", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", textDecoration: "none", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                >
                  Our Story
                </Link>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
                {[
                  { value: "500+", label: "Happy Customers" },
                  { value: "4", label: "Collections" },
                  { value: "100%", label: "Premium Quality" },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontSize: "28px", fontWeight: "900", color: "var(--primary)", lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px", fontWeight: "500", letterSpacing: "0.5px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: IMAGE COLLAGE ── */}
            <div style={{ position: "relative", height: "620px", animation: "fadeUp 1.1s ease-out" }}>
              {/* Main large image */}
              <div style={{ position: "absolute", top: 0, left: "10%", right: 0, height: "75%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" alt="Premium fashion" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
              </div>

              {/* Secondary image */}
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "52%", height: "42%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", border: "3px solid rgba(255,255,255,0.06)" }}>
                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop" alt="Fashion collection" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Floating badge — new arrival */}
              <div style={{ position: "absolute", top: "18px", left: 0, background: "linear-gradient(135deg, var(--primary), #b8943e)", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(201,168,76,0.4)", zIndex: 10 }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(0,0,0,0.7)", letterSpacing: "1.5px", textTransform: "uppercase" }}>New Drop</div>
                <div style={{ fontSize: "18px", fontWeight: "900", color: "#000", lineHeight: 1.1 }}>SS '26</div>
              </div>

              {/* Floating rating card */}
              <div style={{ position: "absolute", bottom: "60px", right: "-10px", background: "rgba(20,20,20,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", padding: "14px 18px", borderRadius: "16px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", zIndex: 10, minWidth: "160px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "6px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="13" height="13" fill="var(--primary)" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
                </div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff" }}>4.9 / 5 Rating</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>500+ verified reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* ─── TOP PICKS SECTION ─── */}
      <div style={{ background: "var(--bg-base)", padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Top Picks</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0 }}>
                Trending <span style={{ color: "var(--primary)" }}>Now</span>
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "12px", fontWeight: "400", maxWidth: "400px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "28px" }}>
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : latestProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
              <p style={{ fontSize: "16px" }}>No products available yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "28px" }}>
              {latestProducts.map((product) => (
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
      <div style={{ background: "var(--bg-base)", padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "56px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Collections</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0 }}>
                Shop by <span style={{ color: "var(--primary)" }}>Category</span>
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



      {/* ─── BRAND PROMISE / WHY CHOOSE US ─── */}
      <div className="container" style={{ padding: "100px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "40px" }}>
          {[
            { icon: <Icons.Quality />, title: "Premium Quality", desc: "Expertly crafted using the finest fabrics for unparalleled comfort and longevity." },
            { icon: <Icons.Delivery />, title: "Express Delivery", desc: "Fast, reliable shipping directly to your doorstep, anywhere in the country." },
            { icon: <Icons.Secure />, title: "Secure Checkout", desc: "Your data is protected. We use bank-level encryption for all transactions." },
            { icon: <Icons.Support />, title: "24/7 Support", desc: "Our dedicated team is always here to assist you with any questions." }
          ].map((feat) => (
            <div key={feat.title} style={{ padding: "32px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }} className="hover-lift">
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: "var(--primary)", filter: "blur(60px)", opacity: 0.1 }} />
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px", color: "var(--text-primary)" }}>{feat.title}</h3>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

        <div className="container" style={{ padding: "0 24px" }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Customer Reviews</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05, margin: 0 }}>
                What Our <span style={{ color: "var(--primary)" }}>Customers</span> Say
              </h2>
            </div>
            {/* Aggregate rating pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "12px 20px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" fill="var(--primary)" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
              </div>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>4.9</span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "400" }}>· 500+ reviews</span>
            </div>
          </div>

          {/* Testimonial grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              { text: "The fit is absolutely perfect. I've completely replaced my wardrobe with their shirts. Highly recommended for anyone looking for quality.", author: "Ahmed Khan", role: "Verified Buyer", product: "Premium Shirts", initial: "A", color: "#3b82f6" },
              { text: "Fast delivery, elegant packaging, and the trousers are unbelievably comfortable. It's rare to find this level of craftsmanship nowadays.", author: "Usman Ali", role: "Verified Buyer", product: "Classic Trousers", initial: "U", color: "#a855f7" },
              { text: "Their customer support is unmatched. They helped me pick the right sizes and the exchange process was seamless. A loyal customer now.", author: "Kamran Shah", role: "Verified Buyer", product: "Signature Hoodie", initial: "K", color: "#22c55e" }
            ].map((t, idx) => (
              <div key={idx} style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "var(--shadow-sm)"
              }} className="hover-lift">
                {/* Decorative top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${t.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />

                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" fill="var(--primary)" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
                </div>

                {/* Quote mark */}
                <div style={{ fontSize: "64px", lineHeight: 0.7, color: "var(--primary)", opacity: 0.12, fontWeight: "900", marginBottom: "16px", fontFamily: "Georgia, serif" }}>"</div>

                {/* Review text */}
                <p style={{ fontSize: "15px", color: "var(--text-primary)", lineHeight: 1.75, marginBottom: "28px", fontWeight: "400" }}>
                  {t.text}
                </p>

                {/* Divider */}
                <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}22, ${t.color}44)`,
                      border: `2px solid ${t.color}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", fontWeight: "800", color: t.color
                    }}>
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", lineHeight: 1.2 }}>{t.author}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{t.role}</div>
                    </div>
                  </div>
                  {/* Product tag */}
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", background: "var(--bg-elevated)", padding: "4px 10px", borderRadius: "20px", border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                    {t.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ─── VIP NEWSLETTER ─── */}
      <div className="container" style={{ padding: "100px 24px" }}>
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
