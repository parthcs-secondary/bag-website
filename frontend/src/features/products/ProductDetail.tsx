import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/UseProducts';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-sm font-bold tracking-widest uppercase text-[#D1B06B] animate-pulse">
          Loading Collection...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-3xl font-black uppercase text-[#1A1B1E] tracking-tight">Piece Not Found</h2>
        <p className="mt-4 text-sm text-[#888888] tracking-widest uppercase">The requested item could not be located.</p>
        <Link to="/" className="mt-8 inline-block border-b-2 border-[#D1B06B] pb-1 text-sm font-bold uppercase tracking-widest text-[#1A1B1E] transition-colors hover:text-[#D1B06B]">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/" className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] hover:text-[#1A1B1E] transition-colors mb-8 lg:mb-12">
          <ArrowLeft className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-24">
        {/* Left Column: Image Gallery */}
        <motion.div 
          className="relative aspect-[4/5] overflow-hidden bg-gray-50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Right Column: Product Info & Actions */}
        <motion.div 
          className="flex flex-col justify-center py-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D1B06B]">
              {product.category} &nbsp;/&nbsp; {product.material}
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1B1E] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 text-2xl font-medium tracking-tight text-[#1A1B1E]">
              ${product.price.toFixed(2)}
            </p>
          </motion.div>

          <motion.div variants={item} className="mt-8 border-t border-gray-100 pt-8">
            <p className="text-sm leading-relaxed text-[#888888]">
              {product.description}
            </p>

            {(product.features || product.dimensions || product.weight) && (
              <div className="mt-8 space-y-6">
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">Features</h3>
                    <ul className="mt-4 list-inside list-disc text-sm text-[#888888] space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(product.dimensions || product.weight) && (
                  <div className="grid grid-cols-2 gap-4">
                    {product.dimensions && (
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">Dimensions</h3>
                        <p className="mt-2 text-sm text-[#888888]">{product.dimensions}</p>
                      </div>
                    )}
                    {product.weight && (
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E]">Weight</h3>
                        <p className="mt-2 text-sm text-[#888888]">{product.weight}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="group relative flex w-full items-center justify-center overflow-hidden bg-[#1A1B1E] px-8 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#D1B06B] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span className="relative flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
                {product.inStock ? 'Add to Bag' : 'Out of Stock'}
              </span>
            </button>
            <p className="text-center text-[10px] uppercase tracking-widest text-[#888888]">
              Complimentary Shipping Worldwide
            </p>
          </motion.div>

          {/* E-commerce Trust Indicators */}
          <motion.div variants={item} className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-100 pt-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-6 w-6 text-[#1A1B1E] mb-3" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1B1E]">Lifetime Warranty</h4>
              <p className="mt-1 text-xs text-[#888888]">Guaranteed forever.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="h-6 w-6 text-[#1A1B1E] mb-3" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1B1E]">Free Shipping</h4>
              <p className="mt-1 text-xs text-[#888888]">On all global orders.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="h-6 w-6 text-[#1A1B1E] mb-3" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1B1E]">30-Day Returns</h4>
              <p className="mt-1 text-xs text-[#888888]">Hassle-free exchanges.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </article>
  );
};