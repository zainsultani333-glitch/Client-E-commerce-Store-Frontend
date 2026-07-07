import { useState } from "react";
import Footer from "../components/Footer";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      await api.post("/contact", formData);
      setStatus({ type: "success", text: "Your message has been sent successfully!" });
      setFormData({ firstName: "", lastName: "", email: "", subject: "Order Inquiry", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.response?.data?.message || "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* ─── HERO BANNER ─── */}
      <div style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#080808" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)" }} />
        {/* Grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 24px 60px" }}>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: "900", color: "#fff", lineHeight: 1.05, marginBottom: "20px" }}>
            Get in <span style={{ color: "var(--primary)" }}>Touch</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8, fontWeight: "300" }}>
            Whether you have a question about an order, styling advice, or need assistance with a return, our dedicated team is here to help.
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="container" style={{ padding: "80px 24px 100px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 0.6 }}
          className="contact-grid"
        >
          
          {/* LEFT: Contact Form */}
          <div className="contact-form-card" style={{ background: "var(--bg-card)", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", position: "relative", overflow: "hidden" }}>
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, var(--primary), transparent)" }} />
            
            <h3 style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px" }}>Send us a Message</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "32px" }}>We typically respond within 24 business hours.</p>
            
            {status.text && (
              <div style={{ padding: "14px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: "600", background: status.type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: status.type === "success" ? "#22c55e" : "#ef4444", border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}` }}>
                {status.text}
              </div>
            )}
            
            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>First Name</label>
                  <input type="text" placeholder="John" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-primary)", fontSize: "15px", outline: "none", transition: "border-color 0.3s", fontFamily: "'Montserrat', sans-serif" }} onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Last Name</label>
                  <input type="text" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-primary)", fontSize: "15px", outline: "none", transition: "border-color 0.3s", fontFamily: "'Montserrat', sans-serif" }} onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Email Address</label>
                <input type="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-primary)", fontSize: "15px", outline: "none", transition: "border-color 0.3s", fontFamily: "'Montserrat', sans-serif" }} onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Subject</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-primary)", fontSize: "15px", outline: "none", transition: "border-color 0.3s", fontFamily: "'Montserrat', sans-serif", cursor: "pointer", appearance: "none" }} onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <option>Order Inquiry</option>
                  <option>Returns & Exchanges</option>
                  <option>Product Information</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Message</label>
                <textarea placeholder="How can we help you?" required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: "100%", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-primary)", fontSize: "15px", outline: "none", transition: "border-color 0.3s", resize: "vertical", fontFamily: "'Montserrat', sans-serif" }} onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}></textarea>
              </div>
              
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "16px", fontSize: "15px", fontWeight: "700", borderRadius: "10px", marginTop: "8px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Sending..." : "Send Message"}
                {!loading && <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
              </button>
            </form>
          </div>

          {/* RIGHT: Contact Info & Hours */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Info Card 1: Headquarters */}
            <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", transition: "transform 0.3s ease" }} className="hover-lift">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(201,168,76,0.15)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px" }}>Headquarters</h4>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "15px", margin: 0 }}>
                123 Fashion Avenue<br />Gulberg III, Lahore<br />Pakistan
              </p>
            </div>

            {/* Info Card 2: Direct Lines */}
            <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", transition: "transform 0.3s ease" }} className="hover-lift">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(59,130,246,0.15)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px" }}>Direct Lines</h4>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "15px", margin: 0 }}>
                Email: <a href="mailto:zainsultani333@gmail.com" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>zainsultani333@gmail.com</a><br />
                Phone: <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>+92 300 1234567</span>
              </p>
            </div>

            {/* Info Card 3: Business Hours */}
            <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", transition: "transform 0.3s ease" }} className="hover-lift">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(34,197,94,0.15)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px" }}>Business Hours</h4>
              <div style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Mon - Fri:</span> <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>9:00 AM - 6:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Saturday:</span> <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>10:00 AM - 4:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sunday:</span> <span style={{ fontWeight: "600", color: "var(--primary)" }}>Closed</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ─── FAQ SECTION ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6 }}
          >
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05 }}>
                Frequently Asked <span style={{ color: "var(--primary)" }}>Questions</span>
              </h2>
            </div>

          <div className="faq-grid">
            {[
              { q: "What is your return policy?", a: "We offer a 14-day return policy for all unworn, unwashed items in their original packaging with tags attached. Sale items are final." },
              { q: "How long does shipping take?", a: "Standard nationwide shipping takes 3-5 business days. Express next-day shipping is available in select major cities." },
              { q: "Do you offer international shipping?", a: "Currently, we only ship within Pakistan. We are working diligently to expand our operations internationally very soon." },
              { q: "How can I track my order?", a: "Once your order is dispatched, you will receive an email and SMS with a tracking link to monitor your delivery in real-time." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "20px", border: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.4 }}>{faq.q}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      
      <style>{`
        .hover-lift:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.08) !important; }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        .contact-form-card {
          padding: 24px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        
        @media (min-width: 640px) {
          .contact-form-card {
            padding: 48px;
          }
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 60px;
          }
          .faq-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
