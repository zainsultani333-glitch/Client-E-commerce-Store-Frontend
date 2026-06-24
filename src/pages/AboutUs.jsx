import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)" }}>
      <div style={{ padding: "80px 24px", textAlign: "center", background: "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))", borderBottom: "1px solid var(--border)" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "900", color: "var(--primary)", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>About Us</h1>
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Welcome to Saleem's Garments. Since our inception, we have been committed to providing premium quality clothing for the modern Pakistani gentleman. Our collections blend traditional craftsmanship with contemporary designs.
        </p>
      </div>
      <div className="container" style={{ padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary)", marginBottom: "12px" }}>Our Mission</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>To empower men through fashion by offering high-quality garments that exude confidence, style, and cultural pride.</p>
          </div>
          <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary)", marginBottom: "12px" }}>Our Vision</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>To become the leading menswear brand in Pakistan, recognized for our commitment to excellence, sustainable practices, and unmatched customer service.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
