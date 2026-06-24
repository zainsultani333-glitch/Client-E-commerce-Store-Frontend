import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ReceiptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/receipts/${id}`)
      .then(res => { setReceipt(res.data); setLoading(false); })
      .catch(err => { setError(err.response?.data?.message || "Receipt not found"); setLoading(false); });
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "16px" }}>
      <div className="spinner" style={{ width: "48px", height: "48px" }} />
      <p style={{ color: "var(--text-muted)" }}>Loading receipt...</p>
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "60px" }}>❌</div>
      <h2 style={{ fontSize: "22px" }}>{error}</h2>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-print-area, #receipt-print-area * { visibility: visible; }
          #receipt-print-area { position: fixed; top: 0; left: 0; width: 100%; background: #fff !important; color: #000 !important; padding: 20px; }
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <div style={{ minHeight: "calc(100vh - 72px)", background: "var(--bg-base)", padding: "40px 24px" }}>
        <div className="container" style={{ maxWidth: "720px" }}>

          {/* Actions */}
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <button onClick={() => navigate(-1)} className="btn-ghost">← Back</button>
            <button onClick={handlePrint} className="btn-primary">🖨️ Print Receipt</button>
          </div>

          {/* ─── RECEIPT DOCUMENT ─── */}
          <div id="receipt-print-area" style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))", borderBottom: "2px solid rgba(212,163,115,0.3)", padding: "36px 40px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--primary), var(--primary-light), var(--primary))" }} />
              <div style={{ width: "56px", height: "56px", margin: "0 auto 16px", background: "linear-gradient(135deg, var(--primary), var(--primary-light))", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "900", color: "var(--bg-base)" }}>S</div>
              <h1 style={{ fontSize: "24px", fontWeight: "900", color: "var(--text-primary)", marginBottom: "4px", fontFamily: "'Playfair Display', serif" }}>Saleem's Garments</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Official Receipt</p>
              <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "20px", padding: "5px 14px" }}>
                <span style={{ fontSize: "12px", color: "var(--success)", fontWeight: "700" }}>💵 {receipt.paymentMethod || "Cash on Delivery"}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "32px 40px" }}>

              {/* Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "28px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Bill To</div>
                  <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>{receipt.customerName}</div>
                  {receipt.phone && <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "2px" }}>📞 {receipt.phone}</div>}
                  {receipt.customerEmail && <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "2px" }}>✉️ {receipt.customerEmail}</div>}
                  {receipt.address && <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "6px", lineHeight: 1.5 }}>📍 {receipt.address}</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Receipt Info</div>
                  <div style={{ fontFamily: "monospace", fontSize: "13px", color: "var(--primary)", fontWeight: "700", marginBottom: "4px" }}>#{String(receipt._id).slice(-8).toUpperCase()}</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>
                    {new Date(receipt.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {new Date(receipt.createdAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>

              <div className="divider-gold" />

              {/* Items */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Item", "Qty", "Unit Price", "Total"].map((h, i) => (
                      <th key={h} style={{ padding: "10px 0", fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", textAlign: i === 0 ? "left" : i === 1 ? "center" : "right" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {receipt.products.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "14px 0" }}>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>{item.name}</div>
                        {item.category && <div style={{ fontSize: "11px", color: "var(--primary)", marginTop: "2px" }}>{item.category}</div>}
                      </td>
                      <td style={{ textAlign: "center", padding: "14px 0", color: "var(--text-secondary)", fontWeight: "600" }}>{item.quantity}</td>
                      <td style={{ textAlign: "right", padding: "14px 0", color: "var(--text-secondary)", fontSize: "13px" }}>Rs. {item.price.toLocaleString()}</td>
                      <td style={{ textAlign: "right", padding: "14px 0", fontWeight: "700", color: "var(--text-primary)" }}>Rs. {(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total */}
              <div style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    {receipt.products.length} item{receipt.products.length !== 1 ? "s" : ""} · {receipt.products.reduce((s, i) => s + i.quantity, 0)} pieces
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>Grand Total</div>
                  <div style={{ fontSize: "12px", color: "var(--success)", marginTop: "2px" }}>💵 {receipt.paymentMethod || "Cash on Delivery"}</div>
                </div>
                <div style={{ fontSize: "30px", fontWeight: "900", color: "var(--primary)" }}>Rs. {receipt.totalAmount.toLocaleString()}</div>
              </div>

              {/* Footer */}
              <div style={{ textAlign: "center", padding: "16px 0 0", borderTop: "1px solid var(--border)" }}>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>Thank you for shopping at Saleem's Garments! 🛍️</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Keep this receipt for your records. For queries: zainsultani333@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="no-print" style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
            <Link to="/" className="btn-secondary">Continue Shopping</Link>
            <button onClick={handlePrint} className="btn-primary">🖨️ Print Receipt</button>
          </div>
        </div>
      </div>
    </>
  );
}
