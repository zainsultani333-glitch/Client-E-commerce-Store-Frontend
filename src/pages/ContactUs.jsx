import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)" }}>
      <div style={{ padding: "80px 24px", textAlign: "center", background: "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))", borderBottom: "1px solid var(--border)" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "900", color: "var(--primary)", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Have a question or need assistance? We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>
      <div className="container" style={{ padding: "60px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "start" }}>
        <div style={{ background: "var(--bg-card)", padding: "40px", borderRadius: "20px", boxShadow: "var(--shadow-md)" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "24px" }}>Send us a Message</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>Name</label>
              <input type="text" className="input" placeholder="Your Name" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>Email</label>
              <input type="email" className="input" placeholder="Your Email" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>Message</label>
              <textarea className="input" placeholder="Your Message" rows="5" style={{ resize: "vertical" }}></textarea>
            </div>
            <button className="btn-primary" style={{ padding: "14px" }}>Send Message</button>
          </div>
        </div>
        <div>
          <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", boxShadow: "var(--shadow-md)", marginBottom: "24px" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>Store Address</h4>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>123 Fashion Avenue<br/>Gulberg III, Lahore<br/>Pakistan</p>
          </div>
          <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", boxShadow: "var(--shadow-md)" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>Contact Info</h4>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>Email: zainsultani333@gmail.com<br/>Phone: +92 300 1234567</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
