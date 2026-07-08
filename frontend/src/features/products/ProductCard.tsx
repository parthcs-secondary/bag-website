import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { name, slug, price, images, category, inStock } = product;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      {/* Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-slate-50">
        <img
          src={images[0]}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
            <span className="rounded-sm bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {category}
        </p>
        
        <h3 className="mt-1 text-sm font-semibold text-slate-900">
          {/* Using a standard anchor tag for now. 
            If you add react-router-dom later, swap this for <Link to={`/products/${slug}`}> 
          */}
            <Link to={`/products/${slug}`} className="focus:outline-none after:absolute after:inset-0">
            {name}
            </Link>
        </h3>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">
            ${price.toFixed(2)}
          </p>
          
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent the anchor tag from triggering navigation
              onAddToCart(product);
            }}
            disabled={!inStock}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:bg-slate-200 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag className="h-4 w-4 stroke-[2.5px]" />
          </button>
        </div>
      </div>
    </article>
  );
};