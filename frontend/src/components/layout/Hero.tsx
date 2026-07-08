import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Cinematic Background Image & Soft Light Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/e2e8f0/0f172a?text=Cinematic+Lifestyle+Photo" 
          alt="Premium handcrafted leather and canvas tote bag in a natural, artisan café setting"
          className="h-full w-full object-cover object-center"
        />
        {/* Soft morning light vignette */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] md:bg-white/10" aria-hidden="true" />
      </div>

      {/* Overlaid Content Area */}
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-48 lg:px-8">
        <div className="md:max-w-2xl">
          {/* Stark Typography */}
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
            CRAFTED FOR YOUR <br className="hidden sm:inline" />DAILY JOURNEY.
          </h1>
          
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Artesinal, local bags made durable. Designed to look as good as they last, perfect for modern commutes and mindful travel.
          </p>

          {/* Premium Call to Action */}
          <div className="mt-10">
            <Link
              to="/categories"
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-8 py-4 text-base font-medium text-white transition-all hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] sm:w-auto focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            >
              SHOP LATEST ARRIVALS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};