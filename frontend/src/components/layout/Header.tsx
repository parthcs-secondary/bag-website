import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Logo } from '../ui/Logo';
import { SITE_CATEGORIES } from '../../data';

const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Collection', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export const Header = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden p-2 -ml-2 text-[#1A1B1E] hover:text-[#D1B06B] transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex flex-1 justify-center md:justify-start">
          <Link to="/" className="group flex items-center gap-3 text-xl font-black tracking-widest text-[#1A1B1E] hover:opacity-80">
            <Logo className="h-10 w-12 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col text-left">
              <span>FYBERCOMPANY</span>
              <span className="text-[9px] font-medium tracking-[0.3em] text-[#888888]">EST. 2026</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:gap-x-8 items-center">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            
            if (item.name === 'Collection') {
              return (
                <div key={item.name} className="group relative py-8">
                  <Link
                    to={item.href}
                    className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#D1B06B] ${
                      isActive 
                        ? 'text-[#D1B06B] underline decoration-[#D1B06B] decoration-2 underline-offset-4' 
                        : 'text-[#1A1B1E]/70'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full hidden w-56 group-hover:block">
                    <div className="flex flex-col rounded-sm bg-white p-4 shadow-xl border border-gray-100 gap-y-1">
                      {SITE_CATEGORIES.map((category) => (
                        <Link 
                          key={category.id} 
                          to={category.href} 
                          className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#1A1B1E] transition-colors hover:bg-gray-50 hover:text-[#D1B06B]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#D1B06B] ${
                  isActive 
                    ? 'text-[#D1B06B] underline decoration-[#D1B06B] decoration-2 underline-offset-4' 
                    : 'text-[#1A1B1E]/70'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Cart Action */}
        <div className="flex items-center justify-end md:flex-1">
          <button onClick={onOpenCart} className="relative p-2 -mr-2 text-[#1A1B1E] hover:text-[#D1B06B] transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#D1B06B] text-[9px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {/* This was missing. It renders absolutely below the header when state is true. */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden">
          <nav className="flex flex-col px-4 py-6 space-y-2">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-4 text-sm font-bold tracking-widest uppercase transition-colors rounded-sm ${
                  location.pathname === item.href 
                    ? 'text-[#D1B06B] bg-gray-50' 
                    : 'text-[#1A1B1E] hover:text-[#D1B06B] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};