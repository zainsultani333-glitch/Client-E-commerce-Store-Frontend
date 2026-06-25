import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const CATEGORIES = ["All", "Shirts", "Hoodies", "Shorts", "Trousers"];

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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    api.get("/products")
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)" }}>
      {/* ─── PAGE HEADER ─── */}
      <div style={{ padding: "40px 24px", textAlign: "center", background: "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))", borderBottom: "1px solid var(--border)" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "900", color: "var(--primary)", marginBottom: "8px", fontFamily: "'Playfair Display', serif" }}>Our Products</h1>
        <p style={{ color: "var(--text-secondary)" }}>Browse our complete collection of premium garments.</p>
      </div>

      {/* ─── CATEGORY PILLS ─── */}
      <div style={{
        position: "sticky", top: "72px", zIndex: 50,
        background: "rgba(250,249,246,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 24px",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {/* Categories */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "var(--transition)",
                  fontFamily: "'Poppins', sans-serif",
                  background: selectedCategory === cat ? "linear-gradient(135deg, var(--primary), var(--primary-light))" : "transparent",
                  color: selectedCategory === cat ? "var(--bg-base)" : "var(--text-secondary)",
                  border: `1px solid ${selectedCategory === cat ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
            style={{ width: "auto", padding: "8px 14px", fontSize: "13px" }}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* ─── SEARCH + GRID ─── */}
      <div className="container" style={{ padding: "32px 24px" }}>
        {/* Search */}
        <div style={{ marginBottom: "28px", maxWidth: "480px" }}>
          <div className="input-icon">
            <svg className="icon" style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="product-search"
              type="text"
              className="input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Showing <span style={{ color: "var(--primary)", fontWeight: "700" }}>{sorted.length}</span> products
            {searchTerm && <> matching "<span style={{ color: "var(--text-secondary)" }}>{searchTerm}</span>"</>}
          </p>
          {(searchTerm || selectedCategory !== "All") && (
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              style={{ fontSize: "13px", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            background: "var(--bg-card)", borderRadius: "20px",
            border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>No products found</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Try different search terms or categories</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="btn-primary"
              style={{ marginTop: "20px" }}
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {sorted.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
