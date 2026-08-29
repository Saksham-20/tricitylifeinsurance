'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { waLink } from '@/lib/site';

type Interest = 'agent' | 'bima-sakhi' | '';

type FormData = {
  name: string;
  phone: string;
  city: string;
  qualification: string;
  interest: Interest;
};

const initialData: FormData = { name: '', phone: '', city: '', qualification: '', interest: '' };

const interestLabels = { agent: 'LIC Agent', 'bima-sakhi': 'Bima Sakhi' };

const cityOptions = ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar', 'Derabassi', 'Other'];

const qualificationOptions = [
  { value: '10th', label: '10th Pass' },
  { value: '12th', label: '12th Pass' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Post Graduate', label: 'Post Graduate' },
  { value: 'Professional', label: 'Professional Degree' },
];

const stepTitles = ['Your basics', 'Where and what', 'Preferred path'];

const fieldClass =
  'w-full rounded-xl border border-line-strong bg-surface px-4 py-3.5 text-[0.95rem] text-content outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-content-faint focus:border-primary focus:shadow-[0_0_0_3px_rgba(11,76,203,0.12)]';
const labelClass = 'mb-2 block text-sm font-semibold text-content';

const FieldError = ({ id, message }: { id: string; message: string }) => (
  <p id={id} className="mt-2 flex items-start gap-2 text-sm text-danger">
    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
    <span>{message}</span>
  </p>
);

/** Three-step conversational lead capture on the home page. */
export default function ConversationalLeadForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadId, setLeadId] = useState('');
  const [started, setStarted] = useState(false);

  const whatsappHref = useMemo(() => {
    const role = formData.interest ? interestLabels[formData.interest] : 'LIC career opportunity';
    return waLink(
      `Hi, I submitted my request${leadId ? ` (${leadId})` : ''} for ${role}. Please guide me for next steps.`,
      whatsappNumber
    );
  }, [formData.interest, leadId, whatsappNumber]);

  const updateField = (field: keyof FormData, value: string) => {
    const nextValue = field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [field]: nextValue }));

    if (!started && nextValue.trim()) {
      setStarted(true);
      trackEvent('form_start', { form_name: 'home_conversational_lead' });
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 0) {
      if (formData.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
      if (!/^\d{10}$/.test(formData.phone)) nextErrors.phone = 'Enter a 10 digit mobile number.';
    }

    if (step === 1) {
      if (formData.city.trim().length < 2) nextErrors.city = 'Please enter your city.';
      if (!formData.qualification) nextErrors.qualification = 'Please choose your qualification.';
    }

    if (step === 2 && !formData.interest) nextErrors.interest = 'Please choose one path.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    trackEvent('form_step_complete', { form_name: 'home_conversational_lead', step: step + 1 });
    setStep((prev) => Math.min(2, prev + 1));
  };

  const submit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setStatus('idle');
    trackEvent('form_submit_attempt', {
      form_name: 'home_conversational_lead',
      interest: formData.interest || 'none',
    });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Could not submit lead');

      const data = await response.json();
      setLeadId(data?.leadId || '');
      setStatus('success');
      trackEvent('form_submit_success', { form_name: 'home_conversational_lead', interest: formData.interest });
    } catch (error) {
      console.error(error);
      setStatus('error');
      trackEvent('form_submit_error', { form_name: 'home_conversational_lead' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <Section id="application-form" tone="canvas">
        <div className="shell-narrow">
          <div className="rounded-3xl border border-success/25 bg-success-soft p-7 md:p-10">
            <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
            <h2 className="mt-5 text-h2 font-semibold text-content">Your request is received.</h2>
            <p className="mt-4 max-w-prose text-lead text-content-muted">
              A team member will contact you within one business day. You can also continue on WhatsApp now.
              {leadId ? (
                <>
                  {' '}
                  Reference ID: <span className="font-semibold text-content">{leadId}</span>
                </>
              ) : null}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                icon={<MessageCircle className="h-4 w-4" />}
                track={{ location: 'home_form_success', ctaType: 'whatsapp' }}
              >
                Continue on WhatsApp
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setFormData(initialData);
                  setErrors({});
                  setStatus('idle');
                  setStep(0);
                  setLeadId('');
                }}
              >
                Submit another response
              </Button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="application-form" tone="canvas">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <Reveal className="lg:sticky lg:top-[calc(var(--site-header-offset)+2rem)]">
          <p className="eyebrow">Apply for callback</p>
          <h2 className="mt-4 text-h2 font-semibold text-content">Let&apos;s understand your fit.</h2>
          <p className="mt-4 max-w-prose text-lead text-content-muted">
            This feels like onboarding, not a form. Share the basics and the first conversation will focus on role
            clarity.
          </p>
          {/* Trust signals sit beside the form — the point of highest hesitation. */}
          <ul className="mt-8 space-y-4 border-t border-line pt-8">
            {[
              { icon: Lock, text: 'Your details are used only for recruitment guidance. No unrelated marketing.' },
              { icon: Clock, text: 'Most applicants receive a response within one business day.' },
              { icon: ShieldCheck, text: 'No pressure. The first conversation explains the role before anything else.' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-sm leading-relaxed text-content-muted">
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card p-6 shadow-lg md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-headline font-semibold text-content">{stepTitles[step]}</p>
              <p className="text-sm font-semibold text-content-muted tabular-nums">Step {step + 1} of 3</p>
            </div>
            <div className="mt-3 flex gap-1.5" role="presentation">
              {stepTitles.map((title, index) => (
                <span
                  key={title}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    index <= step ? 'bg-primary' : 'bg-line'
                  }`}
                />
              ))}
            </div>
            <p aria-live="polite" className="sr-only">
              Step {step + 1} of 3: {stepTitles[step]}
            </p>

            <div className="mt-7 min-h-[16rem]">
              {step === 0 ? (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="home-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="home-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className={fieldClass}
                      placeholder="Enter your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'home-name-error' : undefined}
                    />
                    {errors.name ? <FieldError id="home-name-error" message={errors.name} /> : null}
                  </div>

                  <div>
                    <label htmlFor="home-phone" className={labelClass}>
                      Phone number
                    </label>
                    <input
                      id="home-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className={fieldClass}
                      placeholder="10 digit mobile number"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={`home-phone-hint${errors.phone ? ' home-phone-error' : ''}`}
                    />
                    <p id="home-phone-hint" className="mt-2 text-xs text-content-faint tabular-nums">
                      {formData.phone.length}/10 digits · used only for recruitment updates
                    </p>
                    {errors.phone ? <FieldError id="home-phone-error" message={errors.phone} /> : null}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="home-city" className={labelClass}>
                      City
                    </label>
                    <select
                      id="home-city"
                      name="city"
                      value={formData.city}
                      onChange={(event) => updateField('city', event.target.value)}
                      className={fieldClass}
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? 'home-city-error' : undefined}
                    >
                      <option value="">Select your city</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city ? <FieldError id="home-city-error" message={errors.city} /> : null}
                  </div>

                  <div>
                    <label htmlFor="home-qualification" className={labelClass}>
                      Qualification
                    </label>
                    <select
                      id="home-qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={(event) => updateField('qualification', event.target.value)}
                      className={fieldClass}
                      aria-invalid={Boolean(errors.qualification)}
                      aria-describedby={errors.qualification ? 'home-qualification-error' : undefined}
                    >
                      <option value="">Select qualification</option>
                      {qualificationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.qualification ? (
                      <FieldError id="home-qualification-error" message={errors.qualification} />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <fieldset>
                  <legend className="font-headline text-h4 font-semibold text-content">
                    Which path should we discuss first?
                  </legend>
                  <p className="mt-2 text-sm text-content-muted">
                    Not final. Pick your best fit now; the mentor can guide you on the call.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { value: 'agent' as Interest, label: 'LIC Agent', copy: 'For part-time or full-time advisory growth.' },
                      {
                        value: 'bima-sakhi' as Interest,
                        label: 'Bima Sakhi',
                        copy: 'Women-only path with stipend support subject to norms.',
                      },
                    ].map((item) => {
                      const selected = formData.interest === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => updateField('interest', item.value)}
                          aria-pressed={selected}
                          className={`cursor-pointer rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                            selected
                              ? 'border-primary bg-primary-50 shadow-sm'
                              : 'border-line bg-surface hover:border-primary-200 hover:bg-primary-50/50'
                          }`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-headline font-semibold text-content">{item.label}</span>
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                                selected ? 'border-primary bg-primary' : 'border-line-strong'
                              }`}
                              aria-hidden
                            >
                              {selected ? <CheckCircle2 className="h-4 w-4 text-white" /> : null}
                            </span>
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-content-muted">{item.copy}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.interest ? <FieldError id="home-interest-error" message={errors.interest} /> : null}
                </fieldset>
              ) : null}
            </div>

            {status === 'error' ? (
              <p
                aria-live="assertive"
                className="mt-5 flex gap-2 rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm text-danger"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
                <span>We could not submit your response right now. Please retry or use WhatsApp.</span>
              </p>
            ) : null}

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={step === 0 || isSubmitting}
                icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
              >
                Back
              </Button>
              {step < 2 ? (
                <Button onClick={goNext} showArrow>
                  Continue
                </Button>
              ) : (
                <Button onClick={submit} loading={isSubmitting} showArrow>
                  Apply for callback
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
