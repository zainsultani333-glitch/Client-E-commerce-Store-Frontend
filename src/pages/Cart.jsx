import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
      <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "100px", lineHeight: 1, marginBottom: "10px" }} className="animate-float">🎉</div>
        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>Your order is placed successfully</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Thank you for shopping with us! Your order will be delivered soon.</p>
        <Link to="/" style={{ padding: "12px 32px", background: "#2F6B4C", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "16px", transition: "var(--transition)" }}>Go Home</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px 24px" }}>
        <div style={{ fontSize: "80px", lineHeight: 1 }} className="animate-float">🛒</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800" }}>Your basket is empty</h2>
        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Browse our collection and add items to your basket</p>
        <Link to="/" className="btn-primary" style={{ padding: "13px 28px" }}>Continue Shopping →</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", padding: "40px 24px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>Shopping Basket</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{cartCount} {cartCount === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={() => { if (window.confirm("Clear all items?")) clearCart(); }} className="btn-ghost" style={{ fontSize: "13px" }}>
            🗑️ Clear All
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: cart.length > 0 ? "1fr 360px" : "1fr", gap: "24px", alignItems: "start" }}>

          {/* ─── CART ITEMS ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cart.map(({ product, qty, size, color }) => (
              <div key={`${product._id}-${size}-${color}`} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px", display: "flex", gap: "16px", alignItems: "center", transition: "var(--transition)" }}>
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} style={{ width: "76px", height: "76px", objectFit: "cover", borderRadius: "10px", border: "1px solid var(--border)", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                ) : (
                  <div style={{ width: "76px", height: "76px", background: "var(--bg-elevated)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>👕</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</h3>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                    {product.category && <span className="badge badge-gold" style={{ display: "inline-block" }}>{product.category}</span>}
                    {size && <span className="badge badge-gray" style={{ display: "inline-block" }}>Size: {size}</span>}
                    {color && <span className="badge badge-gray" style={{ display: "inline-block" }}>Color: {color}</span>}
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "800", color: "var(--primary)" }}>Rs. {product.price.toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(product._id, size, color, qty - 1)}>−</button>
                    <div className="qty-value">{qty}</div>
                    <button className="qty-btn" onClick={() => updateQty(product._id, size, color, qty + 1)}>+</button>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>Rs. {(product.price * qty).toLocaleString()}</div>
                  <button onClick={() => removeFromCart(product._id, size, color)}
                    style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "12px", transition: "var(--transition)", fontFamily: "'Outfit',sans-serif" }}
                    onMouseEnter={e => e.target.style.color = "var(--error)"}
                    onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                  >✕ Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* ─── ORDER SUMMARY + CHECKOUT ─── */}
          <div style={{ position: "sticky", top: "100px" }}>

            {!showCheckout ? (
              /* Summary Card */
              <div style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", padding: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "20px" }}>Order Summary</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {cart.map(({ product, qty, size, color }) => (
                    <div key={`${product._id}-${size}-${color}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>{product.name} {size || color ? `(${[size, color].filter(Boolean).join(", ")})` : ""} × {qty}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: "600", flexShrink: 0 }}>Rs. {(product.price * qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="divider-gold" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>Total</span>
                  <span style={{ fontSize: "22px", fontWeight: "900", color: "var(--primary)" }}>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {/* COD Badge */}
                <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "12px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>💵</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--success)" }}>Cash on Delivery</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Pay when your order arrives</div>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: "15px", fontSize: "15px" }} onClick={() => { if (!user) { navigate("/login"); return; } setShowCheckout(true); }}>
                  🛒 Proceed to Checkout
                </button>
                <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "14px", color: "var(--text-muted)", fontSize: "13px", textDecoration: "none" }}>← Continue Shopping</Link>
              </div>
            ) : (
              /* Checkout Form */
              <div style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <button onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "20px" }}>←</button>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Delivery Details</h3>
                </div>

                <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label>Full Name *</label>
                    <input className="input" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p style={{ color: "var(--error)", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <div className="input-icon">
                      <svg className="icon" style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input className="input" placeholder="0300-0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    {errors.phone && <p style={{ color: "var(--error)", fontSize: "12px", marginTop: "4px" }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label>Email Address</label>
                    <input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label>Delivery Address *</label>
                    <textarea className="input" placeholder="House No., Street, Area, City" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                      style={{ resize: "vertical", minHeight: "80px" }} />
                    {errors.address && <p style={{ color: "var(--error)", fontSize: "12px", marginTop: "4px" }}>{errors.address}</p>}
                  </div>

                  {/* COD Note */}
                  <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>💵</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--success)" }}>Cash on Delivery</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Pay Rs. {cartTotal.toLocaleString()} when your order arrives at your doorstep.</div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Order Total</div>
                      <div style={{ fontSize: "20px", fontWeight: "900", color: "var(--primary)" }}>Rs. {cartTotal.toLocaleString()}</div>
                    </div>
                    <button id="place-order-btn" type="submit" className="btn-primary" style={{ padding: "13px 24px" }} disabled={checking}>
                      {checking ? <><div className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }} /> Placing...</> : "✅ Place Order"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
