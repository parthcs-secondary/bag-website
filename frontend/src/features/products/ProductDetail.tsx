import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/UseProducts';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();

  // Find the specific product based on the URL slug
  const product = products.find((p) => p.slug === slug);

  if (isLoading) {
    return <div className="py-20 text-center animate-pulse text-slate-500">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-slate-600 hover:text-slate-900 underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12">
        {/* Left Column: Image Gallery */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            {product.category} • {product.material}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-6 prose prose-slate text-slate-600">
            <p>{product.description}</p>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8 flex-1">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="flex w-full items-center justify-center rounded-md bg-slate-900 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Bag' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};