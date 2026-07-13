import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { CategoryGrid } from './components/layout/CategoryGrid'; // Imported
import { ProductGrid } from './features/products/ProductGrid';
import { ProductsPage } from './features/products/ProductsPage';
import { ProductDetail } from './features/products/ProductDetail';
import { CartDrawer } from './features/cart/CartDrawer';
import { Footer } from './components/layout/Footer';
import { AboutPage } from './features/about/AboutPage';
import { ContactPage } from './features/contact/ContactPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
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
                    
                    {/* Catalog Grid Separator Layout */}
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 border-t border-slate-100">
                      <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                        <div>
                          <h2 className="text-2xl font-black tracking-tighter text-slate-900 sm:text-3xl">
                            LATEST ARRIVALS
                          </h2>
                          <p className="mt-2 text-sm text-slate-500">
                            Explore our newest collection of highly durable, handcrafted bags.
                          </p>
                        </div>
                        <Link
                          to="/products"
                          className="inline-flex items-center justify-center gap-2 self-center text-sm font-bold uppercase tracking-widest text-[#1A1B1E] transition-colors hover:text-[#D1B06B] sm:self-auto"
                        >
                          View All
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <ProductGrid />
                    </div>
                  </>
                } 
              />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
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