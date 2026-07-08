import { Link } from 'react-router-dom';

// Declarative definition of our boutique collections
const CATEGORIES = [
  {
    id: 'totes',
    name: 'Daily Totes',
    description: 'Premium office and market carries',
    href: '/categories/tote',
    image: 'https://placehold.co/800x1000/f1f5f9/0f172a?text=Daily+Totes',
    gridClass: 'md:col-span-1',
  },
  {
    id: 'backpacks',
    name: 'Commuter Backpacks',
    description: 'Ergonomic layouts for the modern nomad',
    href: '/categories/backpack',
    image: 'https://placehold.co/800x1000/e2e8f0/0f172a?text=Commuter+Backpacks',
    gridClass: 'md:col-span-1',
  },
  {
    id: 'duffels',
    name: 'Weekender Duffels',
    description: 'High-capacity builds for seamless travel',
    href: '/categories/duffel',
    image: 'https://placehold.co/1200x800/cbd5e1/0f172a?text=Weekender+Duffels',
    gridClass: 'md:col-span-2 lg:col-span-1', // Spans wide on tablets, snaps back to equal columns on large screens
  },
];

export const CategoryGrid = () => {
  return (
    <section aria-labelledby="category-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center sm:text-left">
          <h2 id="category-heading" className="text-2xl font-black tracking-tighter text-slate-900 sm:text-3xl">
            SHOP BY COLLECTION
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Carefully curated categories engineered for specific utilities.
          </p>
        </div>

        {/* Triple Card Grid Matrix */}
        <div className="grid grid-cols-1 gap-y-6 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[450px] ${category.gridClass}`}
            >
              {/* Background Image with Hover Transition Scale */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Visual Gradient Shroud for text legibility */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity group-hover:opacity-90" 
                  aria-hidden="true" 
                />
              </div>

              {/* Text / Context Overlay aligned perfectly to bottom-left */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    <Link to={category.href} className="focus:outline-none after:absolute after:inset-0">
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 font-medium tracking-wide">
                    {category.description}
                  </p>
                </div>
                
                {/* Decorative CTA Arrow that activates on Card Hover */}
                <div className="mt-4 flex items-center text-xs font-semibold text-white tracking-widest uppercase transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Collection →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};