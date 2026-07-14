import { useProducts } from '../../hooks/UseProducts';
import { ProductCard } from './ProductCard'
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
export const ProductGrid = () => {
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center" aria-live="polite">
        <span className="text-slate-500 font-medium animate-pulse">Loading catalog...</span>
      </div>
    );
  }

  return (
    <section aria-labelledby="catalog-heading" className="py-8">
      {/* sr-only ensures accessibility without breaking visual design */}
      <h2 id="catalog-heading" className="sr-only">Product Catalog</h2>
      
      <motion.ul 
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {products.map((product) => (
          <motion.li 
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <ProductCard product={product} onAddToCart={addToCart} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};