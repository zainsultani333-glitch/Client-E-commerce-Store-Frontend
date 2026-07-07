import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import registerIllustration from "../assets/register-3d-illustration.png";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e?.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Left Side: Form */}
        <div className="auth-form-side">
          <div style={{ maxWidth: "360px", width: "100%", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "var(--text-primary)", textAlign: "center", marginBottom: "40px" }}>
              Register
            </h2>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "8px", padding: "12px 16px", marginBottom: "20px",
                color: "#f87171", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="auth-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="auth-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)",
                      padding: "4px", display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >
                    <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPass
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      }
                    </svg>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
                <input type="checkbox" id="terms" style={{ width: "16px", height: "16px", accentColor: "#3b82f6" }} />
                <label htmlFor="terms" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>I agree to terms and conditions</label>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%", height: "48px", borderRadius: "12px",
                  background: "var(--primary)", color: "white", fontSize: "15px", fontWeight: "600",
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image/Branding */}
        <div className="auth-image-side">
          <img 
            src={registerIllustration} 
            alt="Register Illustration" 
            style={{ width: "100%", maxWidth: "340px", marginBottom: "32px", mixBlendMode: "multiply", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }} 
          />
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
            Join the Community
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", maxWidth: "80%", lineHeight: 1.5 }}>
            Create an account to track your orders, save your wishlist, and get exclusive access to premium collections.
          </p>
          
          <div style={{ display: "flex", gap: "8px", marginTop: "32px" }}>
            <div style={{ width: "24px", height: "4px", background: "#e5e7eb", borderRadius: "2px" }} />
            <div style={{ width: "24px", height: "4px", background: "var(--primary)", borderRadius: "2px" }} />
            <div style={{ width: "24px", height: "4px", background: "#e5e7eb", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
