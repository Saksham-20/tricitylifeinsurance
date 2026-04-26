'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  q: string;
  a: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f6f8fc] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Questions</p>
          <h2 className="mt-3 font-headline text-xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-3xl">
            Clear answers before you decide.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
            The first conversation is for clarity. These answers help you arrive with less doubt.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const open = openIndex === index;

            return (
              <div key={item.q} className="border-b border-outline-variant/25 bg-transparent">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-headline text-base font-bold tracking-[0] text-on-surface md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
