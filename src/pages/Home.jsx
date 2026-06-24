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
      {/* ─── CATEGORIES SHOWCASE ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "80px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>Shop by Category</h2>
            <p style={{ color: "var(--text-secondary)" }}>Find exactly what you're looking for</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { name: "Shirts", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop" },
              { name: "Trousers", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop" },
              { name: "Traditional Wear", img: "https://images.unsplash.com/photo-1596541576709-6fa65e90eb82?q=80&w=800&auto=format&fit=crop" }
            ].map((cat) => (
              <Link key={cat.name} to="/products" style={{ position: "relative", height: "320px", borderRadius: "16px", overflow: "hidden", display: "block", textDecoration: "none" }} className="category-card">
                <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="hover-scale" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)" }} />
                <h3 style={{ position: "absolute", bottom: "24px", left: "24px", color: "white", margin: 0, fontSize: "24px", fontWeight: "800", fontFamily: "'Playfair Display', serif" }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── WHY CHOOSE US ─── */}
      <div className="container" style={{ padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", textAlign: "center" }}>
          {[
            { icon: "✨", title: "Premium Quality", desc: "Finest fabrics tailored to perfection" },
            { icon: "🚚", title: "Fast Delivery", desc: "Express shipping nationwide" },
            { icon: "🛡️", title: "Secure Checkout", desc: "100% protected payments" },
            { icon: "🎧", title: "24/7 Support", desc: "Dedicated customer service" }
          ].map((feat) => (
            <div key={feat.title} style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", transition: "all 0.3s ease" }} className="hover-lift">
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{feat.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px", color: "var(--text-primary)" }}>{feat.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "80px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>Customer Reviews</h2>
            <p style={{ color: "var(--text-secondary)" }}>What our clients say about us</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              { text: "The quality of the shirts is outstanding. I've never felt so comfortable and stylish at the same time.", author: "Ahmed Khan", role: "Verified Buyer" },
              { text: "Fast delivery and the packaging was premium. Highly recommend their traditional wear collection!", author: "Usman Ali", role: "Verified Buyer" },
              { text: "Excellent customer service. They helped me find the perfect size for my trousers. Will shop again.", author: "Kamran Shah", role: "Verified Buyer" }
            ].map((t, idx) => (
              <div key={idx} style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "16px", border: "1px solid var(--border)", position: "relative" }}>
                <div style={{ color: "var(--accent)", fontSize: "40px", position: "absolute", top: "16px", right: "24px", opacity: 0.2, fontFamily: "serif" }}>"</div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px", color: "#f59e0b" }}>
                  ⭐⭐⭐⭐⭐
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "24px" }}>"{t.text}"</p>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 2px" }}>{t.author}</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── NEWSLETTER ─── */}
      <div className="container" style={{ padding: "80px 24px" }}>
        <div style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%)", border: "1px solid var(--border)", borderRadius: "24px", padding: "48px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "150px", height: "150px", background: "var(--accent)", filter: "blur(100px)", opacity: 0.15 }} />
          <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "150px", height: "150px", background: "var(--primary)", filter: "blur(100px)", opacity: 0.1 }} />
          
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>Join Our Newsletter</h2>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "32px" }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: "12px", maxWidth: "450px", margin: "0 auto" }}>
              <input type="email" placeholder="Enter your email" className="input" style={{ flex: 1, padding: "14px 20px", borderRadius: "12px" }} required />
              <button type="submit" className="btn-primary" style={{ padding: "14px 28px", borderRadius: "12px" }}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      
      <style>
        {`
          .category-card:hover .hover-scale { transform: scale(1.05); }
          .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        `}
      </style>
    </div>
  );
}
