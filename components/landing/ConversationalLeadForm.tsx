'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Lock, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type Interest = 'agent' | 'bima-sakhi' | '';

type FormData = {
  name: string;
  phone: string;
  city: string;
  qualification: string;
  interest: Interest;
};

const initialData: FormData = {
  name: '',
  phone: '',
  city: '',
  qualification: '',
  interest: '',
};

const interestLabels = {
  agent: 'LIC Agent',
  'bima-sakhi': 'Bima Sakhi',
};

const cityOptions = ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar', 'Derabassi', 'Other'];

const errorMessage = (message: string) => (
  <p className="mt-2 flex items-start gap-2 text-sm text-error">
    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
    <span>{message}</span>
  </p>
);

type ConversationalLeadFormProps = {
  whatsappNumber: string;
};

export default function ConversationalLeadForm({ whatsappNumber }: ConversationalLeadFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadId, setLeadId] = useState('');
  const [started, setStarted] = useState(false);

  const progress = ((step + 1) / 3) * 100;

  const whatsappHref = useMemo(() => {
    const role = formData.interest ? interestLabels[formData.interest] : 'LIC career opportunity';
    return `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
      `Hi, I submitted my request${leadId ? ` (${leadId})` : ''} for ${role}. Please guide me for next steps.`
    )}`;
  }, [formData.interest, leadId, whatsappNumber]);

  const updateField = (field: keyof FormData, value: string) => {
    const nextValue = field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData((prev) => ({
      ...prev,
      [field]: nextValue,
    }));

    if (!started && nextValue.trim()) {
      setStarted(true);
      trackEvent('form_start', {
        form_name: 'home_conversational_lead',
      });
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateStep = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 0) {
      if (formData.name.trim().length < 2) {
        nextErrors.name = 'Please enter your full name.';
      }

      if (!/^\d{10}$/.test(formData.phone)) {
        nextErrors.phone = 'Enter a 10 digit mobile number.';
      }
    }

    if (step === 1) {
      if (formData.city.trim().length < 2) {
        nextErrors.city = 'Please enter your city.';
      }

      if (!formData.qualification) {
        nextErrors.qualification = 'Please choose your qualification.';
      }
    }

    if (step === 2 && !formData.interest) {
      nextErrors.interest = 'Please choose one path.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) {
      return;
    }

    trackEvent('form_step_complete', {
      form_name: 'home_conversational_lead',
      step: step + 1,
    });

    setStep((prev) => Math.min(2, prev + 1));
  };

  const submit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    trackEvent('form_submit_attempt', {
      form_name: 'home_conversational_lead',
      interest: formData.interest || 'none',
    });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Could not submit lead');
      }

      const data = await response.json();
      setLeadId(data?.leadId || '');
      setStatus('success');
      trackEvent('form_submit_success', {
        form_name: 'home_conversational_lead',
        interest: formData.interest,
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
      trackEvent('form_submit_error', {
        form_name: 'home_conversational_lead',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <section id="application-form" className="scroll-mt-[var(--site-header-offset)] px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6 md:p-8">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          <h2 className="mt-5 font-headline text-3xl font-extrabold tracking-[0] text-emerald-950 md:text-5xl">
            Your request is received.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-900">
            A team member will contact you within one business day. You can also continue on WhatsApp now.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('cta_click', { location: 'home_form_success', cta_type: 'whatsapp' })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#167C3A] px-5 py-3 font-headline font-bold text-white transition-colors hover:bg-[#126C32]"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setFormData(initialData);
                setErrors({});
                setStatus('idle');
                setStep(0);
                setLeadId('');
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-emerald-300 px-5 py-3 font-headline font-bold text-emerald-950"
            >
              Submit another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="scroll-mt-[var(--site-header-offset)] px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
        <div className="xl:sticky xl:top-[calc(var(--site-header-offset)+1rem)]">
          <p className="text-sm font-bold uppercase text-primary">Apply for callback</p>
          <h2 className="mt-3 font-headline text-2xl font-extrabold leading-[1.08] tracking-[0] text-on-surface md:text-3xl">
            Let&apos;s understand your fit.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-on-surface-variant">
            This feels like onboarding, not a form. Share the basics and the first conversation will focus on role clarity.
          </p>
          <div className="mt-5 rounded-2xl border border-primary/[0.12] bg-white p-4 shadow-[0_14px_34px_rgba(15,24,41,0.06)]">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Your details are used only for recruitment guidance. No pressure. First we explain the role.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/[0.12] bg-white p-4 shadow-[0_20px_54px_rgba(15,24,41,0.08)] md:p-5">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Step {step + 1} of 3
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-primary/[0.08]">
            <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm font-bold text-primary">Step {step + 1} of 3</p>

          <div className="mt-5 min-h-[220px]">
            {step === 0 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="home-name" className="mb-2 block text-xs font-bold text-on-surface">
                    Full name
                  </label>
                  <input
                    id="home-name"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(2,83,205,0.08)]"
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? errorMessage(errors.name) : null}
                </div>

                <div>
                  <label htmlFor="home-phone" className="mb-2 block text-xs font-bold text-on-surface">
                    Phone number
                  </label>
                  <input
                    id="home-phone"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(2,83,205,0.08)]"
                    placeholder="10 digit mobile number"
                    inputMode="numeric"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  <p className="mt-2 text-xs text-on-surface-variant">{formData.phone.length}/10 digits</p>
                  {errors.phone ? errorMessage(errors.phone) : null}
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="home-city" className="mb-2 block text-sm font-bold text-on-surface">
                    City
                  </label>
                  <select
                    id="home-city"
                    value={formData.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(2,83,205,0.08)]"
                    aria-invalid={Boolean(errors.city)}
                  >
                    <option value="">Select your city</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city ? errorMessage(errors.city) : null}
                </div>

                <div>
                  <label htmlFor="home-qualification" className="mb-2 block text-sm font-bold text-on-surface">
                    Qualification
                  </label>
                  <select
                    id="home-qualification"
                    value={formData.qualification}
                    onChange={(event) => updateField('qualification', event.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(2,83,205,0.08)]"
                    aria-invalid={Boolean(errors.qualification)}
                  >
                    <option value="">Select qualification</option>
                    <option value="10th">10th Pass</option>
                    <option value="12th">12th Pass</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Professional">Professional Degree</option>
                  </select>
                  {errors.qualification ? errorMessage(errors.qualification) : null}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <p className="font-headline text-2xl font-bold tracking-[0] text-on-surface">
                  Which path should we discuss first?
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Not final. Pick your best fit now; the mentor can guide you on the call.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'agent' as Interest, label: 'LIC Agent', copy: 'For part-time or full-time advisory growth.' },
                    { value: 'bima-sakhi' as Interest, label: 'Bima Sakhi', copy: 'Women-only path with stipend support subject to norms.' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateField('interest', item.value)}
                      aria-pressed={formData.interest === item.value}
                      className={`min-h-[116px] rounded-2xl border p-4 text-left transition ${
                        formData.interest === item.value
                          ? 'border-primary/[0.45] bg-primary/[0.07]'
                          : 'border-outline-variant/30 bg-white hover:border-primary/25'
                      }`}
                    >
                      <span className="font-headline text-xl font-bold tracking-[0] text-on-surface">
                        {item.label}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-on-surface-variant">
                        {item.copy}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.interest ? errorMessage(errors.interest) : null}
              </div>
            ) : null}
          </div>

          {status === 'error' ? (
            <div aria-live="assertive" className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>We could not submit your response right now. Please retry or use WhatsApp.</span>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-outline-variant/25 pt-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0 || isSubmitting}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-outline-variant/[0.35] px-5 py-3 font-headline font-bold text-on-surface transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-headline font-bold text-white transition hover:brightness-105"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={isSubmitting}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-headline font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Apply for Callback'}
                {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
