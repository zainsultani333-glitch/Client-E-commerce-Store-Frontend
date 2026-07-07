import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, cartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [checking, setChecking] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!form.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!user) { navigate("/login"); return; }
    setChecking(true);
    try {
      const res = await api.post("/receipts", {
        customerName: form.name,
        customerEmail: form.email,
        phone: form.phone,
        address: form.address,
        paymentMethod: "Cash on Delivery",
        products: cart.map(item => ({
          productId: item.product._id,
          name: item.product.name + (item.size ? ` - Size ${item.size}` : "") + (item.color ? ` - Color ${item.color}` : ""),
          category: item.product.category || "",
          quantity: item.qty,
          price: item.product.price,
        })),
        totalAmount: cartTotal,
      });
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "100px", lineHeight: 1, marginBottom: "10px" }} className="animate-float">🎉</div>
        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>Your order is placed successfully</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Thank you for shopping with us! Your order will be delivered soon.</p>
        <Link to="/" style={{ padding: "12px 32px", background: "#2F6B4C", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "16px", transition: "var(--transition)" }}>Go Home</Link>
      </div>
      <Footer />
    </>
  );
}

  if (cart.length === 0) {
    return (
      <>
        <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px 24px" }}>
        <div style={{ fontSize: "80px", lineHeight: 1 }} className="animate-float">🛒</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800" }}>Your basket is empty</h2>
        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Browse our collection and add items to your basket</p>
        <Link to="/" className="btn-primary" style={{ padding: "13px 28px" }}>Continue Shopping →</Link>
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <div style={{ minHeight: "calc(100vh - 72px)", backgroundColor: "#FCFAF6", padding: "60px 24px" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <h1 style={{ fontSize: "44px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Shopping Basket</h1>
              <p style={{ color: "#8B867E", fontSize: "16px", margin: 0 }}>{cartCount} {cartCount === 1 ? "item" : "items"}</p>
            </div>
            <button onClick={() => { if (window.confirm("Clear all items?")) clearCart(); }} style={{ background: "transparent", border: "1px solid #EAE3D7", padding: "10px 20px", borderRadius: "10px", fontSize: "14px", color: "#5C5854", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.backgroundColor="#f4f0e6"} onMouseLeave={e => e.target.style.backgroundColor="transparent"}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Clear All
            </button>
          </div>

          <div className={`cart-grid ${cart.length > 0 ? "has-items" : ""}`}>
            {/* ─── CART ITEMS ─── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {cart.map(({ product, qty, size, color }) => (
                <div key={`${product._id}-${size}-${color}`} className="cart-item-card" style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "24px", display: "flex", gap: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #EAE3D7", transition: "all 0.3s ease" }}>
                  
                  {/* Image */}
                  <div style={{ width: "130px", height: "140px", flexShrink: 0, borderRadius: "16px", overflow: "hidden", backgroundColor: "#f4f3ef" }}>
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>👕</div>
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                      <div>
                        <h3 style={{ fontSize: "24px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", margin: "0 0 16px" }}>{product.name}</h3>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          {product.category && <span style={{ padding: "6px 12px", backgroundColor: "#FCFAF6", border: "1px solid #EAE3D7", borderRadius: "20px", fontSize: "11px", fontWeight: "600", color: "#5C5854", textTransform: "uppercase", letterSpacing: "0.5px" }}>{product.category}</span>}
                          {size && <span style={{ padding: "6px 12px", backgroundColor: "#FCFAF6", border: "1px solid #EAE3D7", borderRadius: "20px", fontSize: "11px", fontWeight: "600", color: "#5C5854", textTransform: "uppercase", letterSpacing: "0.5px" }}>Size: {size}</span>}
                          {color && <span style={{ padding: "6px 12px", backgroundColor: "#FCFAF6", border: "1px solid #EAE3D7", borderRadius: "20px", fontSize: "11px", fontWeight: "600", color: "#5C5854", textTransform: "uppercase", letterSpacing: "0.5px" }}>Color: {color}</span>}
                        </div>
                      </div>

                      {/* Qty Control */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #EAE3D7", borderRadius: "10px", padding: "4px", backgroundColor: "#FCFAF6" }}>
                        <button onClick={() => updateQty(product._id, size, color, qty - 1)} style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "#8B867E", fontSize: "18px", cursor: "pointer" }}>−</button>
                        <div style={{ width: "32px", textAlign: "center", fontSize: "15px", fontWeight: "600", color: "#1A201C" }}>{qty}</div>
                        <button onClick={() => updateQty(product._id, size, color, qty + 1)} style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "#8B867E", fontSize: "18px", cursor: "pointer" }}>+</button>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "24px", flexWrap: "wrap", gap: "16px" }}>
                      <div style={{ fontSize: "20px", fontWeight: "600", color: "#2C3B2E" }}>Rs. {product.price.toLocaleString()}</div>
                      
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#1A201C" }}>Rs. {(product.price * qty).toLocaleString()}</div>
                        <button onClick={() => removeFromCart(product._id, size, color)} style={{ background: "none", border: "none", color: "#8B867E", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px", padding: 0 }} onMouseEnter={e => e.target.style.color="#e11d48"} onMouseLeave={e => e.target.style.color="#8B867E"}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          <span style={{ textDecoration: "underline" }}>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* ─── ORDER SUMMARY + CHECKOUT ─── */}
            <div style={{ position: "sticky", top: "100px" }}>
              {!showCheckout ? (
                /* Summary Card */
                <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #EAE3D7", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", margin: "0 0 24px" }}>Order Summary</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                    {cart.map(({ product, qty, size, color }) => (
                      <div key={`${product._id}-${size}-${color}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                        <span style={{ color: "#8B867E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{product.name} {size || color ? `(${[size, color].filter(Boolean).join(", ")})` : ""} × {qty}</span>
                        <span style={{ color: "#1A201C", fontWeight: "600", flexShrink: 0 }}>Rs. {(product.price * qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ width: "100%", height: "1px", backgroundColor: "#EAE3D7", marginBottom: "24px" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#1A201C" }}>Total</span>
                    <span style={{ fontSize: "32px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#2C3B2E" }}>Rs. {cartTotal.toLocaleString()}</span>
                  </div>

                  {/* COD Badge */}
                  <div style={{ backgroundColor: "#F5F8F4", border: "1px solid #E2EBE0", borderRadius: "12px", padding: "16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "24px", borderRadius: "4px", backgroundColor: "#3B755F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>💵</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#2C3B2E", marginBottom: "4px" }}>Cash on Delivery</div>
                      <div style={{ fontSize: "12px", color: "#8B867E" }}>Pay when your order arrives</div>
                    </div>
                  </div>

                  <button style={{ width: "100%", padding: "18px", fontSize: "15px", fontWeight: "600", color: "#fff", backgroundColor: "#3D4A3E", border: "none", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.3s ease" }} onClick={() => { if (!user) { navigate("/login"); return; } setShowCheckout(true); }} onMouseEnter={e => e.target.style.backgroundColor="#2f3a2f"} onMouseLeave={e => e.target.style.backgroundColor="#3D4A3E"}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    Proceed to Checkout
                  </button>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "24px 0" }}>
                    <div style={{ height: "1px", flex: 1, backgroundColor: "#EAE3D7" }} />
                    <span style={{ fontSize: "12px", color: "#8B867E" }}>or</span>
                    <div style={{ height: "1px", flex: 1, backgroundColor: "#EAE3D7" }} />
                  </div>

                  <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#8B867E", fontSize: "14px", fontWeight: "500", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color="#1A201C"} onMouseLeave={e => e.target.style.color="#8B867E"}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                /* Checkout Form */
                <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #EAE3D7", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                    <button onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", color: "#8B867E", cursor: "pointer", fontSize: "20px" }}>←</button>
                    <h3 style={{ fontSize: "20px", fontWeight: "400", fontFamily: "'Playfair Display', serif", color: "#1A201C", margin: 0 }}>Delivery Details</h3>
                  </div>

                  <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1A201C", marginBottom: "8px" }}>Full Name *</label>
                      <input placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #EAE3D7", outline: "none", fontSize: "14px", color: "#1A201C" }} />
                      {errors.name && <p style={{ color: "#e11d48", fontSize: "12px", marginTop: "6px" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1A201C", marginBottom: "8px" }}>Phone Number *</label>
                      <input placeholder="0300-0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #EAE3D7", outline: "none", fontSize: "14px", color: "#1A201C" }} />
                      {errors.phone && <p style={{ color: "#e11d48", fontSize: "12px", marginTop: "6px" }}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1A201C", marginBottom: "8px" }}>Email Address</label>
                      <input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #EAE3D7", outline: "none", fontSize: "14px", color: "#1A201C" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1A201C", marginBottom: "8px" }}>Delivery Address *</label>
                      <textarea placeholder="House No., Street, Area, City" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                        style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #EAE3D7", outline: "none", fontSize: "14px", color: "#1A201C", resize: "vertical", minHeight: "80px" }} />
                      {errors.address && <p style={{ color: "#e11d48", fontSize: "12px", marginTop: "6px" }}>{errors.address}</p>}
                    </div>

                    <div style={{ borderTop: "1px solid #EAE3D7", paddingTop: "24px", marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "13px", color: "#8B867E" }}>Order Total</div>
                        <div style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "#2C3B2E" }}>Rs. {cartTotal.toLocaleString()}</div>
                      </div>
                      <button id="place-order-btn" type="submit" disabled={checking} style={{ padding: "14px 28px", backgroundColor: "#3D4A3E", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "background-color 0.3s" }}>
                        {checking ? "Placing..." : "✅ Place Order"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .cart-grid.has-items {
            grid-template-columns: 1fr 400px;
          }
        }
        @media (max-width: 640px) {
          .cart-item-card {
            flex-direction: column !important;
          }
          .cart-item-card > div:first-child {
            width: 100% !important;
            height: 240px !important;
          }
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
}
