import { ProductGrid } from './ProductGrid';

export const ProductsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
          ALL PRODUCTS
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Browse our full catalog of handcrafted, durable bags.
        </p>
      </div>

      <ProductGrid />
    </div>
  );
};
