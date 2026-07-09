export const AboutPage = () => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl">
          CRAFTING THE JOURNEY.
        </h1>
        <p className="mt-4 text-lg text-slate-500">Established 2026. Designed for the modern nomad.</p>
      </header>

      <div className="space-y-16 text-slate-600">
        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="text-2xl font-bold text-slate-900 mb-4">Our History</h2>
          <p className="leading-relaxed">
            AS_Bags began in a small workshop with a singular goal: to build a bag that outlasts its owner. Frustrated by the disposable nature of modern fast fashion, we returned to raw, durable materials—heavyweight canvas, full-grain leather, and reinforced stitching. What started as a local experiment quickly grew into a trusted brand for commuters and travelers globally.
          </p>
        </section>

        <section aria-labelledby="vision-heading" className="border-l-4 border-slate-900 pl-6">
          <h2 id="vision-heading" className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
          <p className="leading-relaxed">
            To eliminate the compromise between aesthetic elegance and rugged utility. We envision a world where your daily carry is the only bag you need, seamlessly transitioning from the boardroom to the backcountry without hesitation.
          </p>
        </section>

        <section aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <ul className="list-disc pl-5 space-y-2 leading-relaxed">
            <li><strong>Sustainability through Durability:</strong> Building products that prevent landfill waste by simply never breaking.</li>
            <li><strong>Ethical Sourcing:</strong> Partnering exclusively with tanneries and textile mills that adhere to strict environmental and labor standards.</li>
            <li><strong>Functional Minimalism:</strong> Designing out the noise. Every pocket, zipper, and strap serves a deliberate structural or organizational purpose.</li>
          </ul>
        </section>
      </div>
    </article>
  );
};