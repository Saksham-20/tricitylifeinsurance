import Link from 'next/link';
import { MessageCircle, PhoneCall, Clock3, MapPin, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want to discuss LIC career opportunities.')}`;

  return (
    <main className="pb-28 pt-20 lg:pb-0 lg:pt-32">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/10 bg-white p-8 shadow-[0_20px_60px_rgba(15,24,41,0.08)] md:p-12">
          <p className="section-tag">Contact & Support</p>
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Talk to our recruitment support team
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Reach out for role clarity, eligibility guidance, and onboarding steps. We typically respond within one business day.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Now
            </a>
            <a href="tel:+918872364673" className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 px-6 py-3 font-headline font-bold text-primary transition-all duration-200 hover:scale-[1.01]">
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
            <Link href="/apply" className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 px-6 py-3 font-headline font-bold text-primary transition-all duration-200 hover:scale-[1.01]">
              Apply for Callback
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 pb-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-outline-variant/30 bg-white p-6">
            <Clock3 className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-headline text-xl font-bold text-on-surface">Response timeline</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Most profile discussions are scheduled within one business day.</p>
          </article>
          <article className="rounded-2xl border border-outline-variant/30 bg-white p-6">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-headline text-xl font-bold text-on-surface">Service area</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Chandigarh, Mohali, and Panchkula candidates are supported actively.</p>
          </article>
          <article className="rounded-2xl border border-outline-variant/30 bg-white p-6">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-headline text-xl font-bold text-on-surface">Privacy assurance</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Your details are used only for recruitment communication and role guidance.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
