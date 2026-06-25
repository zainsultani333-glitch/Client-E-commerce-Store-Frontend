import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "relative",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: isActive ? "700" : "500",
          color: isActive ? "var(--primary)" : "var(--text-secondary)",
          textDecoration: "none",
          transition: "color 0.3s ease",
          display: "block",
        }}
        className="nav-link-custom"
      >
        {label}
        {isActive && (
          <span style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "20px", height: "2px", background: "var(--primary)", borderRadius: "2px" }} />
        )}
      </Link>
    );
  };

  return (
    <>
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "var(--bg-base)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.03)" : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: scrolled ? "8px 0" : "16px 0",
      }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{
                width: "42px", height: "42px",
                background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: "900", color: "#fff",
                boxShadow: "0 4px 15px rgba(201,168,76,0.3)"
              }}>S</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "var(--text-primary)", lineHeight: 1, fontFamily: "'Playfair Display', serif", letterSpacing: "0.5px" }}>
                  Saleem's
                </div>
                <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1.2, marginTop: "2px" }}>
                  Garments
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "var(--bg-card)", padding: "4px 8px", borderRadius: "100px", border: "1px solid var(--border)", marginRight: "16px" }}>
                {navLink("/", "Home")}
                {navLink("/products", "Products")}
                {navLink("/about", "About Us")}
                {navLink("/contact", "Contact Us")}
                {isAdmin && navLink("/admin", "Admin")}
              </div>

              {user && !isAdmin && (
                <Link to="/cart" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", background: "var(--bg-card)", border: "1px solid var(--border)", textDecoration: "none", transition: "all 0.3s", marginRight: "8px" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "inherit"; }}>
                  <svg style={{ width: "20px", height: "20px", color: cartCount > 0 ? "var(--primary)" : "var(--text-secondary)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-2px", right: "-2px",
                      minWidth: "20px", height: "20px",
                      background: "var(--primary)",
                      color: "#fff",
                      borderRadius: "50%",
                      fontSize: "11px",
                      fontWeight: "800",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "2px solid var(--bg-base)",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                    }}>{cartCount}</span>
                  )}
                </Link>
              )}

              {!user ? (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Link to="/login" style={{
                    padding: "10px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                    color: "var(--text-primary)", textDecoration: "none", transition: "all 0.3s ease",
                    border: "1px solid var(--border)", background: "transparent"
                  }} onMouseEnter={e => { e.target.style.background = "var(--bg-card)"; e.target.style.borderColor = "var(--text-muted)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "var(--border)"; }}>Sign In</Link>
                  <Link to="/register" style={{ 
                    padding: "10px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: "700",
                    color: "#000", textDecoration: "none", transition: "all 0.3s ease",
                    background: "var(--primary)", boxShadow: "0 4px 15px rgba(201,168,76,0.3)"
                  }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 20px rgba(201,168,76,0.4)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(201,168,76,0.3)"; }}>
                    Register
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingLeft: "16px", borderLeft: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "40px", height: "40px",
                      background: isAdmin
                        ? "linear-gradient(135deg, var(--primary), var(--primary-light))"
                        : "linear-gradient(135deg, #1f2937, #374151)",
                      borderRadius: "12px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px", fontWeight: "800", color: "#fff",
                      boxShadow: isAdmin ? "0 4px 15px rgba(201,168,76,0.2)" : "0 4px 15px rgba(0,0,0,0.1)"
                    }}>
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", lineHeight: 1.2 }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: "11px", color: isAdmin ? "var(--primary)" : "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
                        {isAdmin ? "Admin" : "Member"}
                      </div>
                    </div>
                  </div>
                  <button onClick={handleLogout} style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--error)"; e.currentTarget.style.borderColor = "var(--error)"; e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)"; }} onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-elevated)"; }} title="Logout">
                    <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <style>
        {`
          .nav-link-custom:hover {
            color: var(--primary) !important;
          }
        `}
      </style>
    </>
  );
}