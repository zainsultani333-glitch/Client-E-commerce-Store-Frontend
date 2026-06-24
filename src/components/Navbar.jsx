import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        background: location.pathname === to ? "var(--primary-glow)" : "transparent",
        color: location.pathname === to ? "var(--primary)" : "var(--text-secondary)",
        textDecoration: "none",
        transition: "var(--transition)",
        border: "none",
        cursor: "pointer",
        display: "block",
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(250,249,246,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(139, 94, 60, 0.15)",
      boxShadow: "0 4px 30px rgba(139,94,60,0.1)",
    }}>
      <div className="container" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "40px", height: "40px",
              background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: "800", color: "var(--bg-base)",
            }}>S</div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", lineHeight: 1 }}>
                Saleem's
              </div>
              <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1 }}>
                Garments
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLink("/", "Home")}
            {navLink("/products", "Products")}
            {navLink("/about", "About Us")}
            {navLink("/contact", "Contact us")}

            {isAdmin && navLink("/admin", "Admin Panel")}

            {user && !isAdmin && (
              <Link to="/cart" style={{ position: "relative", display: "flex", alignItems: "center", padding: "8px 14px", textDecoration: "none" }}>
                <svg style={{ width: "22px", height: "22px", color: cartCount > 0 ? "var(--primary)" : "var(--text-secondary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "4px", right: "8px",
                    minWidth: "18px", height: "18px",
                    background: "var(--primary)",
                    color: "var(--bg-base)",
                    borderRadius: "999px",
                    fontSize: "10px",
                    fontWeight: "800",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 4px",
                    animation: "pulse-gold 2s infinite",
                  }}>{cartCount}</span>
                )}
              </Link>
            )}

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "0 8px" }} />

            {!user ? (
              <>
                <Link to="/login" style={{
                  padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "600",
                  color: "var(--text-secondary)", textDecoration: "none", transition: "var(--transition)",
                }}>Sign In</Link>
                <Link to="/register" className="btn-primary" style={{ padding: "9px 20px", fontSize: "13px" }}>
                  Create Account
                </Link>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "34px", height: "34px",
                    background: isAdmin
                      ? "linear-gradient(135deg, var(--primary), var(--primary-light))"
                      : "linear-gradient(135deg, #3b82f6, #6366f1)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "700", color: "#fff",
                  }}>
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", lineHeight: 1 }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: "10px", color: isAdmin ? "var(--primary)" : "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {isAdmin ? "Admin" : "Member"}
                    </div>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-ghost" style={{ fontSize: "13px", padding: "7px 14px" }}>
                  <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}