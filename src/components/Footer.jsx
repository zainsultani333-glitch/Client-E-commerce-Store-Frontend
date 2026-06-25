export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid rgba(201,168,76,0.15)",
      padding: "48px 24px 24px",
      marginTop: "80px",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: "900", color: "var(--bg-base)",
              }}>S</div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-primary)" }}>Saleem's</div>
                <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>Garments</div>
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.8, maxWidth: "280px" }}>
              Premium quality garments for every occasion. From hoodies and shorts to modern shirts and trousers — crafted with care for the modern gentleman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
              Quick Links
            </h4>
            {["Shop", "New Arrivals", "Shirts", "Hoodies", "Shorts", "Trousers"].map(link => (
              <div key={link} style={{ marginBottom: "10px" }}>
                <a href="/" style={{ color: "var(--text-muted)", fontSize: "13px", textDecoration: "none", transition: "var(--transition)" }}
                  onMouseEnter={e => e.target.style.color = "var(--primary)"}
                  onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                >{link}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
              Contact
            </h4>
            {[
              { icon: "📍", text: "Lahore, Pakistan" },
              { icon: "📞", text: "+92 300 0000000" },
              { icon: "📧", text: "info@saleemgarments.pk" },
              { icon: "🕐", text: "Mon–Sat, 9am–9pm" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <span>{item.icon}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-gold" />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            © {new Date().getFullYear()} Saleem's Garments. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            Made with ❤️ in Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
}