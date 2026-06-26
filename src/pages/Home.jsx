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

      {/* ─── MODERN HERO SECTION ─── */}
      <div style={{
        position: "relative",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}>
        {/* Background Image with Parallax-like feel */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          opacity: 0.5,
          transform: "scale(1.05)",
          animation: "kenburns 20s ease-out infinite alternate",
        }} />

        {/* Gradient Overlay for depth */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", paddingTop: "60px" }}>
          <div style={{ animation: "fadeUp 1s ease-out" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px", padding: "8px 16px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }} />
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#fff", letterSpacing: "2px", textTransform: "uppercase" }}>
                New Season Arrivals
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: "900",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}>
              Elevate Your <br />
              <span style={{ color: "var(--primary)", fontStyle: "italic" }}>Style</span>
            </h1>

            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.6, fontWeight: "300" }}>
              Discover our exclusive collection of shirts, hoodies, shorts, and trousers. Precision tailored for the modern gentleman.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/products" className="btn-primary" style={{ padding: "18px 40px", fontSize: "16px", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700", boxShadow: "0 10px 25px rgba(201,168,76,0.3)" }}>
                Shop Collection
              </Link>
              <Link to="/products" style={{ padding: "18px 40px", fontSize: "16px", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", textDecoration: "none", transition: "var(--transition)" }} onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "#fff"; }} onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}>
                Explore Categories
              </Link>
            </div>
          </div>
        </div>


      </div>



      {/* ─── FEATURED PRODUCTS ─── */}
      <div className="container" style={{ padding: "100px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ maxWidth: "500px" }}>
            <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Top Picks</div>
            <h2 style={{ fontSize: "40px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
              Trending Now
            </h2>
          </div>
          <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", textDecoration: "none", borderBottom: "2px solid var(--primary)", paddingBottom: "4px", transition: "var(--transition)" }} onMouseEnter={e => e.target.style.color = "var(--primary)"} onMouseLeave={e => e.target.style.color = "var(--text-primary)"}>
            View Entire Collection <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "32px" }}>
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "32px" }}>
            {latestProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ─── CATEGORIES SHOWCASE ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Collections</div>
            <h2 style={{ fontSize: "40px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
              Shop by Category
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {[
              { name: "Shirts", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop" },
              { name: "Hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
              { name: "Shorts", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop" },
              { name: "Trousers", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop" }
            ].map((cat, idx) => (
              <Link key={cat.name} to="/products" className="category-card" style={{ position: "relative", height: idx === 1 || idx === 2 ? "380px" : "420px", marginTop: idx === 1 || idx === 2 ? "40px" : "0", borderRadius: "20px", overflow: "hidden", display: "block", textDecoration: "none", boxShadow: "var(--shadow-md)" }}>
                <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} className="hover-scale" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)", transition: "opacity 0.3s ease" }} className="hover-overlay" />
                <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <h3 style={{ color: "white", margin: 0, fontSize: "28px", fontWeight: "800", fontFamily: "'Playfair Display', serif" }}>{cat.name}</h3>
                  <div className="cat-arrow" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "var(--transition)" }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            ))}
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
      <div style={{ background: "var(--bg-elevated)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Testimonials</div>
            <h2 style={{ fontSize: "40px", fontWeight: "900", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
              The Word on the Street
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {[
              { text: "The fit is absolutely perfect. I've completely replaced my wardrobe with their shirts. Highly recommended for anyone looking for quality.", author: "Ahmed Khan", role: "Verified Buyer" },
              { text: "Fast delivery, elegant packaging, and the trousers are unbelievably comfortable. It's rare to find this level of craftsmanship nowadays.", author: "Usman Ali", role: "Verified Buyer" },
              { text: "Their customer support is unmatched. They helped me pick the right sizes and the exchange process was seamless. A loyal customer now.", author: "Kamran Shah", role: "Verified Buyer" }
            ].map((t, idx) => (
              <div key={idx} style={{ background: "var(--bg-card)", padding: "40px", borderRadius: "24px", border: "1px solid var(--border)", position: "relative", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ color: "var(--primary)", opacity: 0.1, position: "absolute", top: "24px", right: "32px" }}>
                  <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "24px", color: "var(--primary)" }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                </div>
                <p style={{ fontSize: "16px", color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.7, marginBottom: "32px", position: "relative", zIndex: 1 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "var(--primary)" }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 4px", color: "var(--text-primary)" }}>{t.author}</h4>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>{t.role}</p>
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
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -10px); }
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
