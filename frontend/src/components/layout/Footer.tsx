import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 py-12 text-slate-400 sm:py-16" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Brand & Newsletter Capture */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-white">
              LOCAL<span className="font-light text-slate-500">BAG.</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs">
              Handcrafted, durable carry goods designed for your daily journey and mindful travel.
            </p>
            
            <form className="mt-6 flex max-w-md gap-x-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Subscribe to our newsletter"
                className="min-w-0 flex-auto rounded-md border-0 bg-slate-900 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join
              </button>
            </form>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h3>
            <ul role="list" className="mt-4 space-y-3 text-sm">
              <li><Link to="/categories/tote" className="hover:text-white transition-colors">Totes</Link></li>
              <li><Link to="/categories/backpack" className="hover:text-white transition-colors">Backpacks</Link></li>
              <li><Link to="/categories/duffel" className="hover:text-white transition-colors">Duffels</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul role="list" className="mt-4 space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Local Bag Co. All rights reserved.</p>
          <div className="flex gap-x-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};