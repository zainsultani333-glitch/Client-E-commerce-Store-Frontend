import { Link } from 'react-router-dom';

const FooterIcons = {
  Location: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Clock: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
};

export default function Footer() {
  return (
    <footer style={{
      background: "#0a0a0a",
      color: "#fff",
      padding: "40px 24px 20px",
      marginTop: "40px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "30px", marginBottom: "30px" }}>

          {/* Brand */}
          <div style={{ paddingRight: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", fontWeight: "900", color: "#000",
                boxShadow: "0 4px 15px rgba(201,168,76,0.2)"
              }}>S</div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "900", color: "#fff", fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>Saleem's</div>
                <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>Garments</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.6 }}>
              Elevating the modern gentleman's wardrobe with precision-tailored shirts, hoodies, shorts, and trousers. Quality you can feel, style you can see.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
              Collections
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Shop All", "New Arrivals", "Shirts", "Hoodies", "Shorts", "Trousers"].map(link => (
                <Link key={link} to="/products" style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", transition: "all 0.3s ease", display: "inline-block", width: "fit-content" }}
                  onMouseEnter={e => { e.target.style.color = "var(--primary)"; e.target.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.6)"; e.target.style.transform = "translateX(0)"; }}
                >{link}</Link>
              ))}
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
              Support
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Contact Us", "Shipping & Returns", "Size Guide", "FAQs", "Privacy Policy"].map(link => (
                <Link key={link} to="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", transition: "all 0.3s ease", display: "inline-block", width: "fit-content" }}
                  onMouseEnter={e => { e.target.style.color = "var(--primary)"; e.target.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.6)"; e.target.style.transform = "translateX(0)"; }}
                >{link}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: <FooterIcons.Location />, text: "123 Fashion Avenue, Lahore, Pakistan" },
                { icon: <FooterIcons.Phone />, text: "+92 300 1234567" },
                { icon: <FooterIcons.Mail />, text: "info@saleemgarments.pk" },
                { icon: <FooterIcons.Clock />, text: "Mon–Sat: 9:00 AM – 9:00 PM" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "rgba(255,255,255,0.6)", transition: "color 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
                  <span style={{ color: "var(--primary)", marginTop: "2px", transform: "scale(0.9)" }}>{item.icon}</span>
                  <span style={{ fontSize: "13px", lineHeight: 1.4 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", marginBottom: "16px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>
            © {new Date().getFullYear()} Saleem's Garments. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
             {/* Social Icons Placeholder */}
             <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Facebook</div>
             <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Instagram</div>
             <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Twitter</div>
          </div>
        </div>
      </div>
    </footer>
  );
}