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
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)" }}>

      {/* ─── HERO ─── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderBottom: "1px solid rgba(212,163,115,0.15)",
        padding: "80px 24px",
      }}>
        {/* Semi-transparent overlay to ensure text readability */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.6)" }}></div>

        {/* Decorative orbs (now beneath text, above overlay) */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(212,163,115,0.12) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "15%",
          width: "250px", height: "250px",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 1
        }} />

        <div className="container" style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          {/* Label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "40px", background: "var(--accent)" }} />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent)", letterSpacing: "3px", textTransform: "uppercase" }}>
              Premium Collection
            </span>
            <div style={{ height: "1px", width: "40px", background: "var(--accent)" }} />
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: "900",
            lineHeight: 1.05,
            marginBottom: "16px",
            background: "linear-gradient(135deg, #ffffff 0%, var(--accent) 50%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Playfair Display', serif",
          }}>
            Saleem's Garments
          </h1>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            Finest quality shirts, trousers, kurtas and traditional attire —
            crafted for the modern Pakistani gentleman.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "📦", value: products.length, label: "Products" },
              { icon: "⭐", value: "4.9", label: "Rating" },
              { icon: "🚀", value: "Fast", label: "Delivery" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--accent)" }}>
                  {s.icon} {s.value}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <div className="container" style={{ padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>Featured Collection</h2>
          <p style={{ color: "var(--text-secondary)" }}>Discover our newest arrivals</p>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {latestProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        {/* View All Button */}
        {!loading && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/products" className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px", textDecoration: "none", display: "inline-block" }}>
              View All Products →
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
