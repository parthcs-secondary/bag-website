import { useProducts } from '../../hooks/UseProducts';
import { ProductCard } from './ProductCard'
import { useCart } from '../../context/CartContext';

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
      
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
};