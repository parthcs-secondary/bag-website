import { Link } from 'react-router-dom';
import { SITE_CATEGORIES } from '../../data';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#1A1B1E] py-16 text-gray-400" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Brand & Newsletter Capture */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="group flex w-fit items-center gap-3 text-xl font-black tracking-widest text-white transition-opacity hover:opacity-80"
            >
              <Logo className="h-10 w-12 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span>FYBERCOMPANY</span>
                <span className="text-[9px] font-medium tracking-[0.3em] text-[#D1B06B]">EST. 2026</span>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Handcrafted, luxury carry goods designed for your daily journey and mindful travel.
            </p>
            
            <form className="mt-8 flex max-w-md gap-x-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Subscribe to our newsletter"
                className="min-w-0 flex-auto rounded-sm border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#D1B06B] sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-sm bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#1A1B1E] shadow-sm transition-colors hover:bg-[#D1B06B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1B06B]"
              >
                Join
              </button>
            </form>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Shop</h3>
            <ul role="list" className="mt-6 space-y-4 text-sm">
              {SITE_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={category.href} className="transition-colors hover:text-[#D1B06B]">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Company</h3>
            <ul role="list" className="mt-6 space-y-4 text-sm">
              <li><Link to="/about" className="transition-colors hover:text-[#D1B06B]">Our Story</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-[#D1B06B]">Contact</Link></li>
              <li><Link to="/shipping" className="transition-colors hover:text-[#D1B06B]">Shipping & Returns</Link></li>
            </ul>
          </div>
          
        </div>

        {/* Copyright & Legal */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#888888] md:flex-row">
          <p>&copy; {new Date().getFullYear()} FYBERCOMPANY. All rights reserved.</p>
          <div className="flex gap-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};