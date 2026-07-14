import { motion } from 'framer-motion';

export const AboutPage = () => {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-[#1A1B1E]">
        <img
          src="https://placehold.co/1920x600/222222/1A1B1E?text=The+Atelier"
          alt="Manufacturing Atelier"
          className="h-full w-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
              About Us
            </h1>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D1B06B]">
              Welcome to FyberCompany
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12 text-base leading-relaxed text-[#888888]"
        >
          <section className="space-y-6">
            <p className="text-lg font-medium text-[#1A1B1E] leading-relaxed">
              Welcome to FyberCompany.com, where exceptional quality meets dedicated craftsmanship. We are a premier manufacturing company focused on a single, enduring goal: creating premium, high-durability bags designed to seamlessly complement your lifestyle.
            </p>
            <p>
              Every piece we produce is a testament to our commitment to excellence, engineered to deliver both functional reliability and timeless style.
            </p>
            <p>
              At the heart of our operations is a dedicated manufacturing unit where tradition meets precision. We build our bags with absolute effort and care—utilizing machinery for structural perfection, while ensuring every single bag is proudly handmade. This meticulous, hands-on approach allows us to maintain rigorous quality control, ensuring that every stitch, seam, and detail is built to last.
            </p>
            <p>
              Driven by innovation, we are continuously evolving. We are actively expanding our manufacturing horizons, developing new designs, and preparing to introduce next-generation carrying solutions to our collection.
            </p>
            <p className="text-center text-lg font-bold uppercase tracking-widest text-[#1A1B1E] py-8 border-y border-gray-100">
              We don’t just manufacture bags; we craft dependable companions for your daily journeys.
            </p>
          </section>

          <section className="rounded-sm bg-gray-50 p-8 sm:p-12 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gray-200" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1B06B]">Our Vision</h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <p className="text-center text-base font-medium leading-relaxed text-[#1A1B1E]">
              To be a premier global destination for high-quality bag manufacturing, recognized for our seamless blend of artisanal craftsmanship and modern durability. We strive to continuously innovate and expand our product lines, empowering individuals with reliable, masterfully crafted carrying solutions that stand the test of time.
            </p>
          </section>
        </motion.div>
      </div>
    </article>
  );
};