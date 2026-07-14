import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/UseProducts';
import { ProductCard } from './ProductCard';
import { SITE_CATEGORIES } from '../../data';

export const ProductListingPage = () => {
  const { products, isLoading } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('newest');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryParam]);

  // Derive unique materials from products
  const availableMaterials = useMemo(() => {
    const materials = new Set<string>();
    products.forEach(p => {
      if (p.material) materials.add(p.material);
    });
    return Array.from(materials);
  }, [products]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material) 
        : [...prev, material]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by Material
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    // Sort
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // 'newest' - leave as is or sort by date if we had one
        break;
    }

    return result;
  }, [products, selectedCategories, selectedMaterials, sortOption]);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-sm font-bold tracking-widest uppercase text-[#D1B06B] animate-pulse">
          Loading Collection...
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      
      {/* Page Header */}
      <div className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-[#1A1B1E] sm:text-5xl">
          The Collection
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#888888]">
          Explore our complete range of handcrafted bags. Engineered for utility, designed for the modern journey.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E] mb-4">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-sm border-gray-200 bg-gray-50 py-3 pl-3 pr-10 text-sm focus:border-[#D1B06B] focus:ring-[#D1B06B]"
            >
              <option value="newest">New Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E] mb-4">Categories</h3>
            <div className="space-y-3">
              {SITE_CATEGORIES.map(category => (
                <label key={category.id} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-[#1A1B1E] focus:ring-[#D1B06B]"
                  />
                  <span className="ml-3 text-sm text-[#888888] group-hover:text-[#1A1B1E] transition-colors">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {availableMaterials.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1B1E] mb-4">Materials</h3>
              <div className="space-y-3">
                {availableMaterials.map(material => (
                  <label key={material} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="h-4 w-4 rounded-sm border-gray-300 text-[#1A1B1E] focus:ring-[#D1B06B]"
                    />
                    <span className="ml-3 text-sm text-[#888888] capitalize group-hover:text-[#1A1B1E] transition-colors">
                      {material}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold uppercase tracking-tighter text-[#1A1B1E]">No matches found</h3>
              <p className="mt-2 text-sm text-[#888888]">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedMaterials([]); }}
                className="mt-6 border-b-2 border-[#D1B06B] pb-1 text-xs font-bold uppercase tracking-widest text-[#1A1B1E] hover:text-[#D1B06B] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredAndSortedProducts.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

      </div>
    </div>
  );
};
