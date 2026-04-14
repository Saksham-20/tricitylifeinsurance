'use client';

import Image from 'next/image';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210';
    const message = encodeURIComponent('Hi, I want to explore LIC agent recruitment opportunities in Tricity. Can you share more details?');
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0 px-6 md:px-10">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#f8fbff] to-white p-7 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact Desk</p>
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">Join Tricity&apos;s Top Agents</h1>
          <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
            Ready to start your LIC career? Connect with our team to discuss recruitment, earnings potential, and your first steps to unlimited income.
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-outline-variant/30 bg-white p-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/mentor/mentor-portrait-2.jpg"
                alt="Subhash Panjla profile photo"
                width={110}
                height={110}
                className="h-24 w-24 rounded-2xl object-cover"
                sizes="96px"
              />
              <div>
                <p className="font-headline text-2xl font-bold text-on-surface">Subhash Chand Panjla</p>
                <p className="text-sm text-primary font-semibold">Founder & Lead Mentor</p>
                <p className="text-xs text-on-surface-variant mt-0.5">25+ Years LIC Advisory Experience</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 font-headline text-lg font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)] transition-all duration-200"
          >
            Contact on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <section className="rounded-[2rem] border border-outline-variant/35 bg-white p-7 shadow-elevation-2 md:p-10">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Contact Information</h2>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-headline text-xl font-bold text-on-surface">Phone</p>
                <p className="text-on-surface-variant">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-headline text-xl font-bold text-on-surface">Location</p>
                <p className="text-on-surface-variant">Chandigarh, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-headline text-xl font-bold text-on-surface">Office Hours</p>
                <p className="text-on-surface-variant">Monday to Saturday, 10:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Image src="/images/events/event-award-1.jpg" alt="Team interaction moment" width={620} height={460} className="h-40 w-full rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            <Image src="/images/events/event-audience.jpg" alt="Team group at event" width={620} height={460} className="h-40 w-full rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        </section>
      </div>
    </main>
  );
}
