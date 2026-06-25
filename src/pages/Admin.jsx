import { useEffect, useState, useContext, useRef } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import DashboardCharts from "../components/DashboardCharts";

const CATEGORIES = ["Shirts", "Hoodies", "Shorts", "Trousers"];
const emptyForm = { name: "", description: "", price: "", quantity: "", category: "Shirts", sizes: "", colors: "", images: [], cloudinaryIds: [] };

/* ─── TOAST ─── */
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast">
      <div className={`toast-inner toast-${type}`}>
        <span>{type === "success" ? "✅" : "❌"}</span>
        <span style={{ flex: 1 }}>{msg}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "18px" }}>×</button>
      </div>
    </div>
  );
}

/* ─── MULTI-IMAGE UPLOAD ─── */
function MultiImageUpload({ images, cloudinaryIds, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const uploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange([...images, res.data.url], [...cloudinaryIds, res.data.cloudinaryId]);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const newImages = [...images];
    const newIds = [...cloudinaryIds];
    newImages.splice(index, 1);
    newIds.splice(index, 1);
    onChange(newImages, newIds);
  };

  return (
    <div>
      <label>Product Images</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "4px" }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ position: "relative", width: "80px", height: "80px" }}>
            <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border)" }} alt="" />
            <button type="button" onClick={() => handleRemove(idx)} style={{ position: "absolute", top: "-6px", right: "-6px", background: "rgba(239,68,68,1)", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>×</button>
          </div>
        ))}
        <div onClick={() => inputRef.current?.click()} style={{ width: "80px", height: "80px", border: "2px dashed var(--border)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "var(--bg-elevated)", transition: "var(--transition)" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
          {uploading ? <div className="spinner" style={{ width: "16px", height: "16px" }} /> : <span style={{ fontSize: "24px", color: "var(--text-muted)" }}>+</span>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { uploadFile(e.target.files[0]); e.target.value = ''; }} />
    </div>
  );
}

/* ─── PRODUCT MODAL ─── */
function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? { ...product, price: String(product.price), quantity: String(product.quantity), sizes: product.sizes?.join(", ") || "", colors: product.colors?.join(", ") || "", images: product.images || [], cloudinaryIds: product.cloudinaryIds || [] } : emptyForm);
  const [saving, setSaving] = useState(false);
  const isEdit = !!product?._id;

  const handleImagesChange = (imgs, ids) => setForm(f => ({ ...f, images: imgs, cloudinaryIds: ids }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.price === "" || form.quantity === "") { alert("Name, price, and quantity are required"); return; }
    setSaving(true);
    try {
      const sizesArray = form.sizes.split(",").map(s => s.trim()).filter(Boolean);
      const colorsArray = form.colors.split(",").map(c => c.trim()).filter(Boolean);
      const payload = { ...form, price: Number(form.price), quantity: Number(form.quantity), sizes: sizesArray, colors: colorsArray };
      if (isEdit) {
        const res = await api.put(`/products/${product._id}`, payload);
        onSave(res.data, "edit");
      } else {
        const res = await api.post("/products", payload);
        onSave(res.data, "add");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: "580px" }}>
        <div className="modal-header">
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>{isEdit ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "24px", lineHeight: 1 }}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <MultiImageUpload images={form.images} cloudinaryIds={form.cloudinaryIds} onChange={handleImagesChange} />
            <div>
              <label>Product Name *</label>
              <input className="input" placeholder="e.g. White Oxford Shirt" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label>Price (Rs.) *</label>
                <input className="input" type="number" min="0" placeholder="1500" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div>
                <label>Quantity *</label>
                <input className="input" type="number" min="0" placeholder="50" value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })} required />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label>Sizes (comma separated)</label>
                <input className="input" placeholder="e.g. S, M, L, XL" value={form.sizes}
                  onChange={e => setForm({ ...form, sizes: e.target.value })} />
              </div>
              <div>
                <label>Colors (comma separated)</label>
                <input className="input" placeholder="e.g. Red, Blue, Black" value={form.colors}
                  onChange={e => setForm({ ...form, colors: e.target.value })} />
              </div>
            </div>
            <div>
              <label>Category</label>
              <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label>Description</label>
              <textarea className="input" placeholder="Brief product description..." value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ resize: "vertical", minHeight: "80px" }} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── RECEIPT MODAL ─── */
function ReceiptModal({ products, onClose }) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([{ productId: "", name: "", price: 0, category: "", qty: 1 }]);
  const [saving, setSaving] = useState(false);

  const addItem = () => setItems([...items, { productId: "", name: "", price: 0, category: "", qty: 1 }]);
  const removeItem = (idx) => items.length > 1 && setItems(items.filter((_, i) => i !== idx));

  const selectProduct = (idx, productId) => {
    const p = products.find(pr => pr._id === productId);
    if (p) {
      const updated = [...items];
      updated[idx] = { productId: p._id, name: p.name, price: p.price, category: p.category || "", qty: updated[idx].qty };
      setItems(updated);
    }
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) { alert("Customer name is required"); return; }
    const validItems = items.filter(i => i.productId && i.qty > 0);
    if (validItems.length === 0) { alert("Add at least one product"); return; }
    setSaving(true);
    try {
      const res = await api.post("/receipts", {
        customerName, customerEmail, phone, address,
        paymentMethod: "Cash on Delivery",
        products: validItems.map(i => ({ productId: i.productId, name: i.name, category: i.category, quantity: i.qty, price: i.price })),
        totalAmount: total,
      });
      onClose();
      navigate(`/receipt/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating receipt");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: "660px" }}>
        <div className="modal-header">
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>🧾 Create Receipt</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "24px" }}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label>Customer Name *</label>
                <input className="input" placeholder="Ali Ahmed" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
              </div>
              <div>
                <label>Phone</label>
                <input className="input" placeholder="0300-0000000" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div>
                <label>Email</label>
                <input className="input" type="email" placeholder="ali@email.com" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
              </div>
              <div>
                <label>Address</label>
                <input className="input" placeholder="House, Street, City" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ margin: 0 }}>Products</label>
                <button type="button" onClick={addItem} className="btn-success" style={{ fontSize: "12px", padding: "5px 12px" }}>+ Add Row</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 70px 90px auto", gap: "8px", alignItems: "center" }}>
                    <select className="input" style={{ fontSize: "13px", padding: "9px 12px" }} value={item.productId} onChange={e => selectProduct(idx, e.target.value)}>
                      <option value="">Select product</option>
                      {products.map(p => <option key={p._id} value={p._id}>{p.name} — Rs.{p.price.toLocaleString()}</option>)}
                    </select>
                    <input className="input" type="number" min="1" placeholder="Qty" style={{ fontSize: "13px", padding: "9px 10px" }}
                      value={item.qty} onChange={e => { const u = [...items]; u[idx].qty = parseInt(e.target.value) || 1; setItems(u); }} />
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--primary)", textAlign: "right", padding: "9px 0" }}>
                      Rs.{(item.price * item.qty).toLocaleString()}
                    </div>
                    <button type="button" onClick={() => removeItem(idx)} className="btn-danger" style={{ padding: "9px", minWidth: "36px" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--bg-elevated)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(201,168,76,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Payment Method</div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--success)" }}>💵 Cash on Delivery</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Grand Total</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "var(--primary)" }}>Rs. {total.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Generating..." : "Generate Receipt"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── DASHBOARD SECTION ─── */
function DashboardSection({ products, receipts, onGoTo }) {
  const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const lowStock = products.filter(p => p.quantity <= 5);
  const totalRevenue = receipts.reduce((s, r) => s + r.totalAmount, 0);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Welcome back! Here's what's happening at your store.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {[
          { icon: "📦", label: "Total Products", value: products.length, sub: "Items in store", click: () => onGoTo("products") },
          { icon: "💰", label: "Inventory Value", value: `Rs. ${totalValue.toLocaleString()}`, sub: "Total stock value" },
          { icon: "🧾", label: "Total Orders", value: receipts.length, sub: "All time orders", click: () => onGoTo("receipts") },
          { icon: "📈", label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, sub: "From all orders" },
          { icon: "⚠️", label: "Low Stock", value: lowStock.length, sub: "Need restocking", alert: lowStock.length > 0 },
        ].map((s) => (
          <div key={s.label} className="stat-card" onClick={s.click} style={{ cursor: s.click ? "pointer" : "default", borderColor: s.alert && s.value > 0 ? "rgba(245,158,11,0.3)" : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div className="stat-icon">{s.icon}</div>
              {s.alert && s.value > 0 && <span className="badge badge-gold">Alert</span>}
            </div>
            <div className="stat-value" style={{ color: s.alert && s.value > 0 ? "#f59e0b" : undefined }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <DashboardCharts products={products} receipts={receipts} />

      {/* Recent Orders */}
      {receipts.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Recent Orders</h2>
            <button onClick={() => onGoTo("receipts")} style={{ fontSize: "13px", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>View all →</button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {receipts.slice(0, 5).map(r => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: "600" }}>{r.customerName}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{r.phone || "—"}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.products.length} items</td>
                    <td style={{ fontWeight: "700", color: "var(--primary)" }}>Rs. {r.totalAmount.toLocaleString()}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      {new Date(r.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PRODUCTS SECTION ─── */
function ProductsSection({ products, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px" }}>Products</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{products.length} products in store</p>
        </div>
        <button className="btn-primary" onClick={onAdd}>+ Add Product</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div className="input-icon" style={{ flex: 1, minWidth: "200px" }}>
          <svg className="icon" style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input" style={{ width: "auto" }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        {filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{products.length === 0 ? "No products yet" : "No results found"}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
              {products.length === 0 ? "Add your first product to get started" : "Try a different search"}
            </p>
            {products.length === 0 && <button className="btn-primary" onClick={onAdd}>+ Add Product</button>}
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p._id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{idx + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border)", flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />
                      ) : (
                        <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>👕</div>
                      )}
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>{p.name}</div>
                        {p.description && <div style={{ fontSize: "12px", color: "var(--text-muted)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</div>}
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-gold">{p.category || "Other"}</span></td>
                  <td style={{ fontWeight: "700", color: "var(--primary)" }}>Rs. {p.price.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.quantity > 5 ? "badge-green" : p.quantity > 0 ? "badge-gold" : "badge-red"}`}>
                      {p.quantity > 0 ? `${p.quantity} pcs` : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button className="btn-ghost" style={{ padding: "7px 14px", fontSize: "13px" }} onClick={() => onEdit(p)}>✏️ Edit</button>
                      <button className="btn-danger" style={{ padding: "7px 14px" }} onClick={() => onDelete(p._id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── RECEIPTS SECTION ─── */
function ReceiptsSection({ receipts, onNewReceipt }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px" }}>Receipts</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{receipts.length} orders processed</p>
        </div>
        <button className="btn-primary" onClick={onNewReceipt}>🧾 New Receipt</button>
      </div>
      <div className="table-wrapper">
        {receipts.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🧾</div>
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>No receipts yet</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>Create your first receipt</p>
            <button className="btn-primary" onClick={onNewReceipt}>🧾 Create Receipt</button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r, idx) => (
                <tr key={r._id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: "600" }}>{r.customerName}</div>
                    {r.customerEmail && <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{r.customerEmail}</div>}
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{r.phone || "—"}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "12px", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.address || "—"}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{r.products.length} items</td>
                  <td style={{ fontWeight: "700", color: "var(--primary)" }}>Rs. {r.totalAmount.toLocaleString()}</td>
                  <td><span className="badge badge-green">💵 COD</span></td>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {new Date(r.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button className="btn-ghost" style={{ fontSize: "13px", padding: "7px 14px" }} onClick={() => navigate(`/receipt/${r._id}`)}>
                        🖨️ View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── USERS SECTION ─── */
function UsersSection({ users, onDelete }) {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px" }}>Users</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{users.length} registered users</p>
        </div>
      </div>
      <div className="table-wrapper">
        {users.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>👥</div>
            <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>No users yet</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>Users will appear here when they register</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Joined</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u._id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{idx + 1}</td>
                  <td style={{ fontWeight: "600" }}>{u.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === "admin" ? "badge-gold" : "badge-green"}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {new Date(u.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      {u.role !== "admin" ? (
                        <button className="btn-danger" style={{ padding: "7px 14px" }} onClick={() => onDelete(u._id)}>🗑️ Delete</button>
                      ) : (
                        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Admin</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN ADMIN PAGE ─── */
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("dashboard");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    try {
      const [pRes, rRes, uRes] = await Promise.all([api.get("/products"), api.get("/receipts"), api.get("/users")]);
      setProducts(pRes.data);
      setReceipts(rRes.data);
      setUsers(uRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handleSave = (product, action) => {
    if (action === "add") setProducts(prev => [product, ...prev]);
    else setProducts(prev => prev.map(p => p._id === product._id ? product : p));
    setShowProductModal(false);
    setEditProduct(null);
    showToast(`Product ${action === "add" ? "added" : "updated"} successfully!`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      setDeleteId(null);
      showToast("Product deleted!");
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      showToast("User deleted!");
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed", "error");
    }
  };

  if (loading) {
    return (
      <AdminLayout activeSection="dashboard" onSectionChange={() => {}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "16px" }}>
          <div className="spinner" style={{ width: "48px", height: "48px" }} />
          <p style={{ color: "var(--text-muted)" }}>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection={section} onSectionChange={setSection}>
      {section === "dashboard" && (
        <DashboardSection products={products} receipts={receipts} onGoTo={setSection} />
      )}
      {section === "products" && (
        <ProductsSection
          products={products}
          onAdd={() => setShowProductModal(true)}
          onEdit={p => { setEditProduct(p); setShowProductModal(true); }}
          onDelete={id => setDeleteId(id)}
        />
      )}
      {section === "receipts" && (
        <ReceiptsSection receipts={receipts} onNewReceipt={() => setShowReceiptModal(true)} />
      )}
      {section === "users" && (
        <UsersSection users={users} onDelete={handleDeleteUser} />
      )}

      {/* Modals */}
      {(showProductModal || editProduct) && (
        <ProductModal product={editProduct} onClose={() => { setShowProductModal(false); setEditProduct(null); }} onSave={handleSave} />
      )}
      {showReceiptModal && (
        <ReceiptModal products={products} onClose={() => setShowReceiptModal(false)} />
      )}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: "400px" }}>
            <div className="modal-header">
              <h3 style={{ fontSize: "17px", fontWeight: "700" }}>🗑️ Delete Product</h3>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                Are you sure? This will permanently delete the product and its image from Cloudinary.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" style={{ padding: "10px 20px" }} onClick={() => handleDelete(deleteId)}>Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}