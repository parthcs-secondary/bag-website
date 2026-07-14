import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PromoBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1B1E] my-16 lg:my-24">
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x800/222222/1A1B1E?text=Craftsmanship"
          alt="Craftsmanship"
          className="h-full w-full object-cover object-center opacity-60 mix-blend-overlay"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D1B06B]">
            Exclusive Release
          </span>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
            The Modern Classic
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-gray-300 md:text-base max-w-xl mx-auto">
            Discover our newest collection of meticulously crafted leather goods. Designed to blend timeless aesthetics with modern utility for the everyday journey.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center justify-center border border-[#D1B06B] px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#D1B06B] hover:text-[#1A1B1E]"
            >
              Explore the Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
