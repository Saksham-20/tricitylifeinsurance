import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';

const eligibilityCriteria = [
  'Age: Minimum 18 years',
  'Education: 10th pass and above',
  'Communication and interest in sales',
];

/**
 * LIC agent path — styled to match home FAQ / two-column sections. Anchor: #lic-agent-procedure
 */
export default function LicAgentProcedureSection() {
  return (
    <section
      id="lic-agent-procedure"
      className="scroll-mt-[var(--site-header-offset)] px-6 md:px-10"
      aria-labelledby="lic-agent-procedure-heading"
    >
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-primary/15 bg-white p-6 md:p-8">
        <FadeInOnScroll>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div>
              <h2
                id="lic-agent-procedure-heading"
                className="font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl"
              >
                Becoming an LIC agent
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                IRDAI training and IC38 are part of the path. Review eligibility, then apply when you are ready.
              </p>

              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Eligibility</p>
                <ul className="mt-2 space-y-2 text-sm text-on-surface-variant">
                  {eligibilityCriteria.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/apply#application-form"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-headline text-sm font-bold text-white shadow-sm transition-all hover:brightness-105"
                >
                  Open application form
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-5 md:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Step-by-step</p>
              <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-on-surface-variant">
                <li>
                  <span className="font-headline font-bold text-on-surface">1.</span>{' '}
                  Contact and pre-recruitment form —{' '}
                  <Link href="/apply#application-form" className="font-semibold text-primary underline-offset-2 hover:underline">
                    open application
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-headline font-bold text-on-surface">2.</span> Documents: education proof, PAN, address proof, two photos, bank/cheque details (as advised).
                </li>
                <li>
                  <span className="font-headline font-bold text-on-surface">3.</span> IRDAI training (25 hours, online or offline).
                </li>
                <li>
                  <span className="font-headline font-bold text-on-surface">4.</span> IRDAI IC38 exam (MCQ); pass to obtain your license.
                </li>
              </ol>

              <details className="mt-4 rounded-xl border border-outline-variant/35 bg-white/80 p-3 text-sm">
                <summary className="cursor-pointer font-semibold text-on-surface outline-none">
                  Full document checklist
                </summary>
                <ul className="mt-2 list-inside list-disc space-y-1 text-on-surface-variant">
                  <li>Educational certificate (10th / 12th or above marksheet)</li>
                  <li>PAN card</li>
                  <li>Address proof (Aadhaar / Voter ID / Driving License)</li>
                  <li>Two passport-size photographs</li>
                  <li>Cancelled cheque / bank details</li>
                </ul>
              </details>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
