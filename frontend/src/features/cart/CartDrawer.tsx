import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-[#1A1B1E]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-6 sm:px-6">
            <h2 className="text-xl font-black tracking-tighter text-[#1A1B1E] uppercase flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Bag ({cartCount})
            </h2>
            <button
              onClick={onClose}
              className="text-[#888888] hover:text-[#1A1B1E] transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-12 w-12 text-gray-200 stroke-[1.5]" />
                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-[#1A1B1E]">Your bag is empty</p>
                <p className="mt-2 text-xs text-[#888888]">Discover our latest arrivals to get started.</p>
                <button
                  onClick={onClose}
                  className="mt-8 border-b-2 border-[#D1B06B] pb-1 text-xs font-bold uppercase tracking-widest text-[#1A1B1E] transition-colors hover:text-[#D1B06B]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-50">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center mix-blend-multiply" />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between font-bold text-[#1A1B1E] uppercase tracking-wider text-sm">
                      <h3 className="line-clamp-1 pr-2">{item.name}</h3>
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-[#D1B06B]">{item.material}</p>

                    {/* Quantity & Actions Bar */}
                    <div className="flex flex-1 items-end justify-between mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-[#888888] hover:text-[#1A1B1E] hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-[#1A1B1E] text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-[#888888] hover:text-[#1A1B1E] hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-bold uppercase tracking-widest text-[#888888] hover:text-[#1A1B1E] transition-colors border-b border-transparent hover:border-[#1A1B1E]"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sticky Checkout Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-6 sm:px-6">
              <div className="flex justify-between font-bold text-[#1A1B1E] uppercase tracking-wider text-base">
                <p>Subtotal</p>
                <p>₹{cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-[#888888]">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="group flex w-full items-center justify-center bg-[#1A1B1E] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#D1B06B]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};