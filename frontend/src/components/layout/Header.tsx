import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onOpenCart: () => void;
}

// Keep navigation declarative and DRY
const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export const Header = ({ onOpenCart }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 stroke-[1.5px]" />
            ) : (
              <Menu className="h-6 w-6 stroke-[1.5px]" />
            )}
          </button>
        </div>

        {/* Center/Left: Logo */}
        <div className="flex flex-1 justify-center md:justify-start">
          <Link 
            to="/" 
            className="text-xl font-black tracking-tighter text-slate-900 transition-opacity hover:opacity-80"
          >
            LOCAL<span className="font-light text-slate-500">BAG.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-x-8">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  isActive ? 'text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4' : 'text-slate-500'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart Action */}
        <div className="flex items-center justify-end md:flex-1">
          <button
            onClick={onOpenCart}
            className="group relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            aria-label="Open shopping cart"
          >
            <ShoppingBag className="h-5 w-5 stroke-[2px] transition-transform group-hover:scale-110" />
            
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`border-b border-slate-200 bg-white md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-1 px-4 pb-4 pt-2 sm:px-6">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};