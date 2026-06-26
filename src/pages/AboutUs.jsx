import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const values = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Uncompromising Quality",
    desc: "Every thread, every stitch is chosen with care. We source the finest fabrics and partner with skilled artisans to produce garments that last a lifetime.",
    color: "#f59e0b",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Customer First",
    desc: "Our customers are the heart of everything we do. We listen, adapt, and constantly improve to make every shopping experience seamless and memorable.",
    color: "#3b82f6",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Timeless Design",
    desc: "We craft collections that transcend trends. Our designs marry traditional Pakistani elegance with clean modern silhouettes built for the contemporary gentleman.",
    color: "#8b5cf6",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trusted Integrity",
    desc: "Honesty and transparency in everything — from pricing to materials. We never cut corners, and we stand behind every product we sell.",
    color: "#22c55e",
  },
];

const team = [
  { name: "Saleem Ahmed", role: "Founder & CEO", initial: "S", bio: "With 15+ years in the fashion industry, Saleem founded this brand to bring premium menswear within reach of every Pakistani gentleman.", color: "#c9a84c" },
  { name: "Tariq Hassan", role: "Head of Design", initial: "T", bio: "Trained in Lahore and London, Tariq leads our creative direction, blending desi heritage with international aesthetics.", color: "#3b82f6" },
  { name: "Aisha Khan", role: "Operations Manager", initial: "A", bio: "Aisha ensures every order leaves our warehouse with perfection. Her attention to detail keeps our delivery promise intact.", color: "#a855f7" },
];

export default function AboutUs() {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", fontFamily: "'Poppins', sans-serif" }}>

      {/* ─── HERO BANNER ─── */}
      <div style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#080808" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center 30%", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)" }} />
        {/* Grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 24px 60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px", padding: "7px 18px", background: "rgba(201,168,76,0.1)", backdropFilter: "blur(12px)", borderRadius: "100px", border: "1px solid rgba(201,168,76,0.3)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "2.5px", textTransform: "uppercase" }}>Est. 2010 · Lahore, Pakistan</span>
          </div>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: "900", color: "#fff", lineHeight: 1.05, marginBottom: "20px" }}>
            Crafted With <span style={{ color: "var(--primary)" }}>Passion</span>,<br />Worn With Pride.
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8, fontWeight: "300" }}>
            We are Saleem's Garments — a Lahore-born menswear brand built on the belief that every man deserves to look and feel extraordinary.
          </p>
        </div>
      </div>

      {/* ─── STATS ROW ─── */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0" }}>
            {[
              { value: "15+", label: "Years in Business" },
              { value: "500+", label: "Happy Customers" },
              { value: "4", label: "Core Collections" },
              { value: "100%", label: "Made with Care" },
            ].map((stat, idx) => (
              <div key={idx} style={{ padding: "36px 24px", textAlign: "center", borderRight: idx < 3 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: "36px", fontWeight: "900", color: "var(--primary)", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "8px", fontWeight: "500" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── OUR STORY ─── */}
      <div style={{ padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            {/* Image */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}>
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" alt="Our Story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Floating card */}
              <div style={{ position: "absolute", bottom: "-24px", right: "-24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "24px 28px", boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)", lineHeight: 1 }}>2010</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>Year Founded</div>
                <div style={{ marginTop: "12px", display: "flex", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="12" height="12" fill="var(--primary)" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>)}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>4.9 Avg. Rating</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>Our Story</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "24px" }}>
                From a Small Workshop<br />to a <span style={{ color: "var(--primary)" }}>Trusted Brand</span>
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: "20px" }}>
                Saleem's Garments was born in 2010 from a small tailoring workshop in Lahore's historic Anarkali Bazaar. What started as a one-man operation has grown into a full-fledged menswear brand trusted by hundreds of customers across Pakistan.
              </p>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: "36px" }}>
                Our founder, Saleem Ahmed, believed that premium quality shouldn't be a luxury only for the few. With that mission in mind, he built a brand that delivers craftsmanship, style, and affordability — all in one.
              </p>
              <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", borderRadius: "10px", background: "var(--primary)", color: "#000", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 25px rgba(201,168,76,0.3)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(201,168,76,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.3)"; }}
              >
                Shop Our Collection
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── OUR VALUES ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>What We Stand For</span>
              <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05 }}>
              Our Core <span style={{ color: "var(--primary)" }}>Values</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {values.map((v) => (
              <div key={v.title} style={{ background: "var(--bg-card)", borderRadius: "20px", border: "1px solid var(--border)", padding: "36px 32px", position: "relative", overflow: "hidden", transition: "all 0.3s ease" }} className="hover-lift">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${v.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />
                <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: `${v.color}15`, color: v.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", border: `1px solid ${v.color}30` }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MEET THE TEAM ─── */}
      <div style={{ padding: "100px 0" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase" }}>The People</span>
              <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1.05 }}>
              Meet the <span style={{ color: "var(--primary)" }}>Team</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {team.map((member) => (
              <div key={member.name} style={{ background: "var(--bg-card)", borderRadius: "20px", border: "1px solid var(--border)", padding: "36px 32px", textAlign: "center", transition: "all 0.3s ease" }} className="hover-lift">
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: `linear-gradient(135deg, ${member.color}22, ${member.color}44)`, border: `3px solid ${member.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "900", color: member.color, margin: "0 auto 20px" }}>
                  {member.initial}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>{member.name}</h3>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>{member.role}</div>
                <div style={{ height: "1px", background: "var(--border)", marginBottom: "16px" }} />
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA BANNER ─── */}
      <div style={{ background: "var(--bg-elevated)", padding: "80px 24px" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)", borderRadius: "28px", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "280px", height: "280px", background: "var(--primary)", filter: "blur(120px)", opacity: 0.12, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "280px", height: "280px", background: "var(--primary)", filter: "blur(120px)", opacity: 0.08, borderRadius: "50%" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Ready to Elevate?</div>
              <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: "900", color: "#fff", marginBottom: "20px", lineHeight: 1.1 }}>
                Discover the Collection
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
                Browse our full range of premium shirts, hoodies, shorts, and trousers — designed for the modern Pakistani gentleman.
              </p>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 36px", borderRadius: "10px", background: "var(--primary)", color: "#000", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 25px rgba(201,168,76,0.35)", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                  Shop Now
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 36px", borderRadius: "10px", color: "rgba(255,255,255,0.8)", fontWeight: "600", fontSize: "15px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .hover-lift:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.08) !important; border-color: rgba(201,168,76,0.25) !important; }
      `}</style>
    </div>
  );
}
