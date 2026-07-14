// import { Link } from 'react-router-dom';


// // Duffel Bag
// // Tote Bag
// // Clutch
// // Barrel Bag
// // Pouch Bag
// // Tiffin Bag

// const CATEGORIES = [
//   {
//     id: 'totes',
//     name: 'Daily Totes',
//     description: 'Premium office and market carries',
//     href: '/categories/tote',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'totes',
//     name: 'Daily Totes',
//     description: 'Premium office and market carries',
//     href: '/categories/tote',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'totes',
//     name: 'Daily Totes',
//     description: 'Premium office and market carries',
//     href: '/categories/tote',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'totes',
//     name: 'Daily Totes',
//     description: 'Premium office and market carries',
//     href: '/categories/tote',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'totes',
//     name: 'Daily Totes',
//     description: 'Premium office and market carries',
//     href: '/categories/tote',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'Clutch',
//     name: 'Clutch Bags',
//     description: 'Ergonomic layouts for the modern nomad',
//     href: '/categories/clutch',
//     image: '/images/white-bag.png',
//     gridClass: 'md:col-span-1',
//   },
//   {
//     id: 'duffels',
//     name: 'Weekender Duffels',
//     description: 'High-capacity builds for seamless travel',
//     href: '/categories/duffel',
//     image: '/images/orange-bag.png',
//     gridClass: 'md:col-span-2 lg:col-span-1',
//   },
//   {
//     id: 'Barrel',
//     name: 'Barrel Bags',
//     description: 'High-capacity builds for seamless travel',
//     href: '/categories/barrel',
//     image: '/images/white-bag.png',
//     gridClass: 'md:col-span-2 lg:col-span-1',
//   },
//   {
//     id: 'Tiffin',
//     name: 'Tiffin Bags',
//     description: 'High-capacity builds for seamless travel',
//     href: '/categories/tiffin',
//     image: '/images/white-bag.png',
//     gridClass: 'md:col-span-2 lg:col-span-1',
//   },
//   {
//     id: 'Pouch',
//     name: 'Pouch Bags',
//     description: 'High-capacity builds for seamless travel',
//     href: '/categories/pouch',
//     image: '/images/white-bag.png',
//     gridClass: 'md:col-span-2 lg:col-span-1',
//   },
// ];

// export const CategoryGrid = () => {
//   return (
//     <section aria-labelledby="category-heading" className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
//         {/* Section Header */}
//         <div className="mb-10 text-center sm:text-left">
//           <h2 id="category-heading" className="text-2xl font-black tracking-tight text-[#1A1B1E] uppercase sm:text-3xl">
//             Shop by Collection
//           </h2>
//           <p className="mt-2 text-sm text-[#888888] uppercase tracking-widest">
//             Carefully curated pieces engineered for utility.
//           </p>
//         </div>

//         {/* Triple Card Grid Matrix */}
//         <div className="grid grid-cols-1 gap-y-6 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
//           {CATEGORIES.map((category) => (
//             <div
//               key={category.id}
//               className={`group relative overflow-hidden rounded-sm bg-gray-100 aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[480px] ${category.gridClass}`}
//             >
//               <div className="absolute inset-0">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
//                   loading="lazy"
//                 />
//                 <div 
//                   className="absolute inset-0 group-hover:opacity-95" 
//                 //   className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E]/90 via-[#1A1B1E]/20 to-transparent transition-opacity group-hover:opacity-95" 
//                   aria-hidden="true" 
//                 />
//               </div>

//               <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
//                 <div>
//                   <h3 className="text-xl font-bold tracking-tight text-white uppercase">
//                     <Link to={category.href} className="focus:outline-none after:absolute after:inset-0">
//                       {category.name}
//                     </Link>
//                   </h3>
//                   <p className="mt-2 text-xs text-gray-300 font-medium tracking-wide">
//                     {category.description}
//                   </p>
//                 </div>
                
//                 <div className="mt-6 flex items-center text-xs font-bold text-[#D1B06B] tracking-widest uppercase transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
//                   Explore Collection &rarr;
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SITE_CATEGORIES } from '../../data';

export const CategoryGrid = () => {
  return (
    <section aria-labelledby="category-heading" className="bg-white">
      <div className="mx-auto max-w-7xl py-12 sm:py-16">
        
        {/* Section Header */}
        <motion.div 
          className="mb-8 px-4 sm:px-6 lg:px-8 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 id="category-heading" className="text-xl font-black tracking-tight text-[#1A1B1E] uppercase sm:text-2xl">
            Shop by Collection
          </h2>
          <p className="mt-2 text-xs text-[#888888] uppercase tracking-widest">
            Carefully curated pieces engineered for utility.
          </p>
        </motion.div>

        {/* Horizontal Scrollable Section */}
        <motion.div 
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-8 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
          {SITE_CATEGORIES.map((category, index) => (
            <motion.div
              key={`${category.href}-${index}`}
              variants={{
                hidden: { opacity: 0, x: 50 },
                show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              // Reduced sizes: narrower width and shorter height for a more compact look
              className="group relative flex-none w-[70vw] sm:w-[260px] md:w-[300px] h-[340px] md:h-[400px] overflow-hidden rounded-sm bg-gray-100 snap-start"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E]/95 via-[#1A1B1E]/20 to-transparent transition-opacity group-hover:opacity-95" 
                  aria-hidden="true" 
                />
              </div>

              {/* Reduced padding (p-5) to match the smaller card footprint */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                    <Link to={category.href} className="focus:outline-none after:absolute after:inset-0">
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[11px] text-gray-300 font-medium tracking-wide">
                    {category.description}
                  </p>
                </div>
                
                <div className="mt-4 flex items-center text-[10px] font-bold text-[#D1B06B] tracking-widest uppercase transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Collection &rarr;
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};