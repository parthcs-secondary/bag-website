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
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-white p-3 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#D1B06B]/30">
      {/* Image Wrapper */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-50">
        <img
          src={images[0]}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <span className="rounded-sm bg-[#1A1B1E] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">
          {category}
        </p>
        
        <h3 className="mt-1.5 text-xs font-bold uppercase tracking-widest text-[#1A1B1E]">
          {/* Using a standard anchor tag for now. 
            If you add react-router-dom later, swap this for <Link to={`/products/${slug}`}> 
          */}
            <Link to={`/products/${slug}`} className="focus:outline-none after:absolute after:inset-0">
            {name}
            </Link>
        </h3>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-sm font-bold text-[#1A1B1E]">
            ${price.toFixed(2)}
          </p>
          
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent the anchor tag from triggering navigation
              onAddToCart(product);
            }}
            disabled={!inStock}
            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-none bg-[#1A1B1E] text-white transition-all hover:bg-[#D1B06B] disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-400"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag className="h-4 w-4 stroke-[2.5px]" />
          </button>
        </div>
      </div>
    </article>
  );
};