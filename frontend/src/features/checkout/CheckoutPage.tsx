import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Lock, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create order on backend
      // Amount must be in paise/cents (smallest currency unit). 
      // Note: Razorpay mostly uses INR. If using USD, ensure your Razorpay account supports it.
      const amountInPaise = Math.round(cartTotal * 100);
      
      const res = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise, currency: 'INR' })
      });
      
      const order = await res.json();
      
      if (!res.ok) {
        throw new Error(order.error || 'Failed to create order');
      }

      // 2. Open Razorpay modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "FyberCompany",
        description: "Premium Bag Purchase",
        order_id: order.order_id,
        handler: async function (response: any) {
          try {
            // 3. Verify signature on backend
            const verifyRes = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
              clearCart();
              alert('Payment verified successfully! Thank you for your purchase.');
              navigate('/');
            } else {
              alert('Payment verification failed. Invalid signature.');
            }
          } catch (err) {
            console.error('Verification Error:', err);
            alert('An error occurred during payment verification.');
          }
        },
        theme: {
          color: "#1A1B1E"
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response.error);
        alert('Payment failed: ' + response.error.description);
      });

      rzp.open();
    } catch (err) {
      console.error('Checkout Error:', err);
      alert('Checkout failed. Please ensure the backend server is running on port 5000.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-[#1A1B1E] sm:text-4xl">
          Your Bag is Empty
        </h2>
        <p className="mt-4 text-sm tracking-widest text-[#888888] uppercase">
          Cannot proceed to checkout.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="mt-8 border-b-2 border-[#D1B06B] pb-1 text-xs font-bold uppercase tracking-widest text-[#1A1B1E] transition-colors hover:text-[#D1B06B]"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-12 border-b border-gray-100 pb-8 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-[#1A1B1E] sm:text-5xl">
          Checkout
        </h1>
        <p className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
          <Lock className="h-3 w-3" /> Secure Encrypted Payment via Razorpay
        </p>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
        {/* Left Column: Form */}
        <div className="flex-1">
          <form onSubmit={handleCheckout} className="space-y-12">
            
            {/* Contact Info */}
            <section>
              <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">First name</label>
                    <input type="text" id="firstName" required placeholder="First name" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">Last name</label>
                    <input type="text" id="lastName" required placeholder="Last name" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">Address</label>
                  <input type="text" id="address" required placeholder="Address" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="sr-only">City</label>
                    <input type="text" id="city" required placeholder="City" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="sr-only">ZIP / Postal code</label>
                    <input type="text" id="zip" required placeholder="ZIP Code" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#1A1B1E] focus:outline-none" />
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#1A1B1E] px-8 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#D1B06B] disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-24 bg-gray-50 p-8 border border-gray-100">
            <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">
              Order Summary
            </h2>
            
            <div className="space-y-6 border-b border-gray-200 pb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 border border-gray-200 bg-white">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover mix-blend-multiply" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1B1E] text-[10px] text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1B1E]">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#888888]">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-[#888888]">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Taxes</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-[#1A1B1E] uppercase tracking-wider">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#888888]">
              <ShieldCheck className="h-4 w-4" />
              Guaranteed Safe Checkout
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
