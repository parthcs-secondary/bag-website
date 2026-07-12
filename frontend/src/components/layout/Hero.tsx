import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1B1E] min-h-[80vh] sm:min-h-[600px] flex items-center">
      {/* Structural Image Layer */}
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero-desktop.jpg" type="image/jpg" />
          <img
            src="/images/hero-desktop.jpg"
            alt="Handcrafted FYBERCOMPANY collection"
            className="h-full w-full object-cover object-center opacity-80"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        {/* Hardware-accelerated gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1B1E]/95 via-[#1A1B1E]/60 to-transparent" aria-hidden="true" />
      </div>

      {/* Content Overlay Layer */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 md:py-48 lg:px-8">
        <div className="md:max-w-2xl">
          <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-6xl">
            CRAFTED FOR YOUR <br className="hidden sm:inline" />DAILY JOURNEY.
          </h1>
          
          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Artisanal, luxury bags made durable. Designed to look as good as they last, perfect for modern commutes and mindful travel.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-sm bg-white px-8 py-4 text-sm font-bold tracking-widest uppercase text-[#1A1B1E] transition-all hover:bg-[#D1B06B] hover:text-white hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D1B06B] focus:ring-offset-2 focus:ring-offset-[#1A1B1E]"
            >
              Shop Latest Arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};