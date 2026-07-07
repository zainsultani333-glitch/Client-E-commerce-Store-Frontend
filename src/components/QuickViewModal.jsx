import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [added, setAdded] = useState(false);

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => e.stopPropagation();

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!user) { navigate("/login"); return; }
    addToCart(product);
    navigate("/cart");
  };

  const isLowStock = product.quantity > 0 && product.quantity <= 5;
  const isOutOfStock = product.quantity <= 0;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 sm:p-6"
    >
      <div 
        onClick={handleModalClick}
        className="bg-white rounded-[16px] w-full max-w-[900px] flex flex-col md:flex-row relative shadow-2xl overflow-y-auto max-h-[95vh] p-4 gap-6"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors z-10"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 relative bg-[#F5F4F0] rounded-[12px] overflow-hidden flex items-center justify-center min-h-[400px]">
          {product.images && product.images.length > 0 ? (
            <>
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm text-gray-800">
                1 / {product.images.length}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm">No Image</div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-4 pr-4">
          
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            {product.category || "SHIRTS"}
          </div>
          
          <h2 className="text-[32px] md:text-[38px] font-serif text-gray-900 mb-2 tracking-tight capitalize leading-tight">
            {product.name}
          </h2>

          <div className="text-[20px] text-gray-900 mb-2 flex items-center gap-3">
            {product.originalPrice && product.originalPrice > product.price && (
               <span className="line-through text-gray-400 text-lg">
                 Rs. {product.originalPrice.toLocaleString()} PKR
               </span>
            )}
            <span>Rs. {product.price.toLocaleString()} PKR</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-md font-bold">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="text-[13px] text-gray-500 mb-4">
            <a href="#" className="underline underline-offset-2 decoration-gray-300 hover:text-gray-800 transition-colors">Shipping</a> calculated at checkout.
          </p>

          <div className="mb-5">
            {isOutOfStock ? (
              <div className="flex items-center gap-1.5 text-[13px] text-red-600 font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="none"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                Out of stock
              </div>
            ) : isLowStock ? (
              <div className="flex items-center gap-1.5 text-[13px] text-amber-600 font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="none"/><path d="M12 8v4M12 16h.01"/></svg>
                Low stock
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[13px] text-[#15803d] font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#15803d" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="none"/><path d="m9 12 2 2 4-4"/></svg>
                In stock
              </div>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-5">
              <div className="text-[13px] text-gray-900 mb-2">Size</div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[60px] h-9 rounded-md border text-[13px] font-medium transition-all ${
                      selectedSize === size 
                        ? "bg-[#092218] border-[#092218] text-white" 
                        : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <div className="text-[13px] text-gray-900 mb-2">Color</div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 min-w-[100px] h-10 rounded-md border flex items-center justify-center gap-3 text-[13px] font-medium transition-all ${
                      selectedColor === color 
                        ? "bg-[#092218] border-[#092218] text-white" 
                        : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <span 
                      className={`w-4 h-4 shrink-0 rounded-full border ${selectedColor === color ? 'border-white/50' : 'border-gray-200'}`}
                      style={{ backgroundColor: color.toLowerCase() }} 
                    />
                    <span className="capitalize">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <div className="text-[13px] text-gray-900 mb-2">Quantity</div>
            <div className="flex items-center border border-gray-300 rounded-md w-[110px] h-9 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
              </button>
              <span className="flex-1 text-center text-[13px] font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full h-11 rounded-md flex items-center justify-center gap-2 text-[13px] font-medium transition-all ${
                added 
                  ? "bg-[#15803d] text-white" 
                  : isOutOfStock 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-[#092218] text-white hover:bg-[#113a2c]"
              }`}
            >
              {added ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  Added to Cart
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Add to Cart
                </>
              )}
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full h-11 rounded-md flex items-center justify-center gap-2 text-[13px] font-medium transition-all ${
                isOutOfStock 
                  ? "hidden" 
                  : "bg-[#F7F5F0] text-gray-900 hover:bg-[#EFECE5]"
              }`}
            >
              Buy It Now
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-start pt-2 border-t border-gray-100 mb-6">
            <div className="flex items-start gap-1.5 w-1/3 mt-4">
              <svg className="shrink-0 mt-0.5 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
              <div className="text-[10px] text-gray-500 leading-tight">
                <span className="block text-gray-800 font-medium mb-0.5">Estimated delivery</span>
                2-5 business days
              </div>
            </div>
            
            <div className="flex items-start gap-1.5 w-1/3 mt-4">
              <svg className="shrink-0 mt-0.5 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <div className="text-[10px] text-gray-500 leading-tight">
                <span className="block text-gray-800 font-medium mb-0.5">Secure checkout</span>
                100% protected
              </div>
            </div>

            <div className="flex items-start gap-1.5 w-1/3 mt-4">
              <svg className="shrink-0 mt-0.5 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              <div className="text-[10px] text-gray-500 leading-tight">
                <span className="block text-gray-800 font-medium mb-0.5">Easy returns</span>
                7-day returns
              </div>
            </div>
          </div>

          <a 
            href={`/product/${product._id}`}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate(`/product/${product._id}`);
            }}
            className="text-[12px] font-medium text-gray-700 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 flex items-center gap-1 w-fit transition-all"
          >
            View full details 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

