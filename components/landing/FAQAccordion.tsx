'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

type FAQItem = { q: string; a: string };

/** Single-open accordion. Buttons control a labelled region so screen readers track state. */
export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-primary md:py-6"
              >
                <span className="font-headline text-[1.05rem] font-semibold text-content transition-colors group-hover:text-primary md:text-lg">
                  {item.q}
                </span>
                <span
                  className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out ${
                    open ? 'rotate-45 border-primary bg-primary text-white' : 'border-line text-primary group-hover:border-primary-300'
                  }`}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="grid grid-rows-[1fr] pb-6 pr-12"
            >
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-content-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
