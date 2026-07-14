import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Hero } from './components/layout/Hero';
import { CategoryGrid } from './components/layout/CategoryGrid'; // Imported
import { ProductGrid } from './features/products/ProductGrid';
import { ProductDetail } from './features/products/ProductDetail';
import { ProductListingPage } from './features/products/ProductListingPage';
import { PromoBanner } from './components/layout/PromoBanner';
import { CartDrawer } from './features/cart/CartDrawer';
import { Footer } from './components/layout/Footer';
import { AboutPage } from './features/about/AboutPage';
import { ContactPage } from './features/contact/ContactPage';
import { CheckoutPage } from './features/checkout/CheckoutPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-screen bg-brand-white text-brand-black font-sans flex flex-col">
          <Header onOpenCart={() => setIsCartOpen(true)} />
          
          <main className="flex-1 w-full">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <Hero />
                    
                    {/* The New Collection Grid sits cleanly right here */}
                    <CategoryGrid />
                    
                    <PromoBanner />
                    
                    {/* Catalog Grid Separator Layout */}
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                      <div className="mb-10 text-center sm:text-left">
                        <h2 className="text-xl font-black tracking-tight text-[#1A1B1E] uppercase sm:text-2xl">
                          LATEST ARRIVALS
                        </h2>
                        <p className="mt-2 text-xs text-[#888888] uppercase tracking-widest">
                          Explore our newest collection of highly durable, handcrafted bags.
                        </p>
                      </div>
                      <ProductGrid />
                    </div>
                  </>
                } 
              />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;