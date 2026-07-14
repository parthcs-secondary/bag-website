import { useState } from 'react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Native mail client routing
    const subject = encodeURIComponent('New Inquiry from AS_Bags Website');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:support@asbags.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="text-3xl font-black tracking-tighter text-slate-900">
        GET IN TOUCH
      </h1>
      <p className="mt-2 text-slate-500">Have a question about our collections? Send us a message.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-900">Name</label>
            <input
              type="text"
              id="name"
              required
              className="mt-2 block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900">Email</label>
            <input
              type="email"
              id="email"
              required
              className="mt-2 block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-900">Message</label>
          <textarea
            id="message"
            rows={5}
            required
            className="mt-2 block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm"
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};