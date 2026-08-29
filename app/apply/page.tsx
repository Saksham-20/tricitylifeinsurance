'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ListOrdered,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import { trackEvent } from '@/lib/analytics';
import { site, telLink, waLink } from '@/lib/site';

type FormData = {
  name: string;
  phone: string;
  city: string;
  qualification: string;
  interest: 'agent' | 'bima-sakhi' | '';
  currentRole: string;
  preferredTime: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  name: '',
  phone: '',
  city: '',
  qualification: '',
  interest: '',
  currentRole: '',
  preferredTime: '',
};

const interestLabelMap: Record<Exclude<FormData['interest'], ''>, string> = {
  agent: 'LIC Agent',
  'bima-sakhi': 'Bima Sakhi',
};

const mentorSupportSteps = [
  {
    icon: Phone,
    title: 'Discussion & document clarity',
    copy: 'We review your profile, explain the LIC agent path, and help you prepare the right paperwork.',
  },
  {
    icon: GraduationCap,
    title: 'IRDAI training & IC38 guidance',
    copy: 'Support for mandatory training slots, study approach, and what to expect in the certification exam.',
  },
  {
    icon: BadgeCheck,
    title: 'Licensed onboarding rhythm',
    copy: 'After you pass IC38, practical mentoring for field activity, reviews, and steady habit building.',
  },
];

const confidencePoints = [
  'Your details are used only for recruitment communication.',
  'Most applicants receive a response within one business day.',
  'You can continue on WhatsApp or phone after submission.',
];

const fieldClass =
  'w-full rounded-xl border border-line-strong bg-surface px-4 py-3.5 text-[0.95rem] text-content outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-content-faint focus:border-primary focus:shadow-[0_0_0_3px_rgba(11,76,203,0.12)]';
const labelClass = 'mb-2 block text-sm font-semibold text-content';

const whatsappHref = waLink('Hi, I want to discuss becoming an LIC agent and the pre-recruitment process.');

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadId, setLeadId] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  useEffect(() => {
    trackEvent('form_view', { form_name: 'lead_application', page: '/apply' });
  }, []);

  const canSubmit = useMemo(
    () =>
      Boolean(
        formData.name && formData.phone.length === 10 && formData.city && formData.qualification && formData.interest
      ),
    [formData]
  );

  const validateField = (name: keyof FormData, value: string) => {
    if (!value.trim() && name !== 'currentRole' && name !== 'preferredTime') {
      return 'This field is required.';
    }

    if (name === 'name' && value.trim().length < 2) return 'Please enter at least 2 characters.';

    if (name === 'phone') {
      if (!/^\d+$/.test(value)) return 'Use digits only.';
      if (value.length !== 10) return 'Phone number must be 10 digits.';
    }

    if (name === 'city' && value.trim().length < 2) return 'City must be at least 2 characters.';

    return '';
  };

  const validateForm = () => {
    const nextErrors: Errors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, String(formData[key]));
      if (error) nextErrors[key] = error;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (!hasStartedForm && nextValue.trim()) {
      setHasStartedForm(true);
      trackEvent('form_start', { form_name: 'lead_application' });
    }

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, nextValue) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));

    if (fieldError) {
      trackEvent('form_field_error', {
        form_name: 'lead_application',
        field_name: name,
        error_type: fieldError,
      });
    }
  };

  const successWhatsAppHref = waLink(
    `Hi, I submitted my application (${leadId || 'pending ID'}) for ${
      formData.interest ? interestLabelMap[formData.interest] : 'LIC opportunity'
    }. Please guide me for next steps.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    trackEvent('form_submit_attempt', {
      form_name: 'lead_application',
      interest: formData.interest || 'none',
    });

    if (!validateForm()) {
      trackEvent('form_submit_blocked', { form_name: 'lead_application' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      const data = await response.json();
      setLeadId(data?.leadId || '');
      setSubmitStatus('success');
      trackEvent('form_submit_success', { form_name: 'lead_application', interest: formData.interest });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      trackEvent('form_submit_error', { form_name: 'lead_application' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (id: string, message: string) => (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-danger">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );

  return (
    <div className="flex flex-col">
      <Section tone="canvas" tight as="div">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Application</p>
            <h1 className="mt-4 text-h1 font-semibold text-content">Apply for LIC career mentorship</h1>
            <p className="mt-5 max-w-prose text-lead text-content-muted">
              Share the basics and get a callback with role clarity — eligibility, documents, IRDAI training, and IC38 —
              from {site.mentor}.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="canvas" as="div" className="pt-0">
        <div className="shell grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-start xl:gap-12">
          {/* ---------- Mentor / trust rail ---------- */}
          <Reveal className="order-2 xl:order-1 xl:sticky xl:top-[calc(var(--site-header-offset)+1.5rem)]">
            <aside className="card p-6 md:p-7">
              <Pill>Your mentor</Pill>
              <h2 className="mt-5 font-headline text-h3 font-semibold text-content">{site.mentor}</h2>
              <p className="mt-2 text-sm font-semibold text-primary">{site.mentorRole}</p>
              <p className="mt-3 text-sm leading-relaxed text-content-muted">
                Recruitment and onboarding support for LIC careers across Chandigarh Tricity — with clear guidance on
                documents, IRDAI training, and IC38.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button
                  href={whatsappHref}
                  variant="whatsapp"
                  size="sm"
                  fullWidth
                  icon={<MessageCircle className="h-4 w-4" aria-hidden />}
                  track={{ location: 'apply_rail', ctaType: 'whatsapp' }}
                >
                  WhatsApp
                </Button>
                <Button
                  href={telLink}
                  variant="secondary"
                  size="sm"
                  fullWidth
                  icon={<PhoneCall className="h-4 w-4" aria-hidden />}
                  track={{ location: 'apply_rail', ctaType: 'call' }}
                >
                  Call now
                </Button>
              </div>

              <ul className="mt-6 space-y-3.5 border-t border-line pt-6 text-sm text-content-muted">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                  <a href={telLink} className="font-semibold text-content hover:underline">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                  <span>
                    Chandigarh, Sector 7 · Mohali, Sector 68 · Active support across Chandigarh Tricity (Chandigarh,
                    Mohali, Panchkula)
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                  <span>{site.hours} · Most queries answered within one business day</span>
                </li>
              </ul>

              <Link
                href="/career-in-lic"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:bg-primary-100"
              >
                <ListOrdered className="h-3.5 w-3.5" aria-hidden />
                Procedure
              </Link>

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-eyebrow font-semibold uppercase text-primary">How we support you</p>
                <ul className="mt-5 space-y-5">
                  {mentorSupportSteps.map(({ icon: Icon, title, copy }) => (
                    <li key={title} className="flex gap-3.5">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-headline font-semibold text-content">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-content-muted">{copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 rounded-2xl border border-line bg-surface-sunken p-5">
                <p className="text-eyebrow font-semibold uppercase text-primary">Application confidence</p>
                <ul className="mt-4 space-y-3 text-sm text-content-muted">
                  {confidencePoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>

          {/* ---------- Form ---------- */}
          <div id="application-form" className="order-1 scroll-anchor xl:order-2">
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {submitStatus === 'success'
                ? 'Application received.'
                : submitStatus === 'error'
                  ? 'Application could not be submitted.'
                  : 'Application form ready.'}
            </div>

            {submitStatus === 'success' ? (
              <div className="rounded-3xl border border-success/25 bg-success-soft p-8 md:p-10">
                <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
                <h2 className="mt-5 text-h2 font-semibold text-content">Application received</h2>
                <p className="mt-4 max-w-prose text-lead text-content-muted">
                  Thank you. Your profile has been received.
                  {leadId ? (
                    <>
                      {' '}
                      Reference ID: <span className="font-semibold text-content">{leadId}</span>
                    </>
                  ) : null}
                </p>
                <p className="mt-2 text-sm text-content-muted">
                  A team member should reach out within one business day.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={successWhatsAppHref}
                    variant="whatsapp"
                    showArrow
                    track={{ location: 'apply_success', ctaType: 'whatsapp' }}
                  >
                    Continue on WhatsApp
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setFormData(initialData);
                      setErrors({});
                      setSubmitStatus('idle');
                      setLeadId('');
                    }}
                  >
                    Submit another response
                  </Button>
                </div>
              </div>
            ) : (
              <div className="card p-6 shadow-lg md:p-8">
                <h2 className="text-h3 font-semibold text-content">Pre-recruitment form</h2>
                <p className="mt-3 text-sm leading-relaxed text-content-muted">
                  This takes around two to three minutes. Required fields help us match the right role; optional fields
                  help us call at a convenient time.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-8" noValidate>
                  <fieldset>
                    <legend className="text-eyebrow font-semibold uppercase text-primary">
                      Step 1 · Personal basics
                    </legend>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Full name
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          placeholder="Enter your full name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name ? fieldError('name-error', errors.name) : null}
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          placeholder="10 digit mobile number"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={`phone-hint${errors.phone ? ' phone-error' : ''}`}
                        />
                        <p id="phone-hint" className="mt-2 text-xs text-content-faint tabular-nums">
                          {formData.phone.length}/10 digits · used only for recruitment updates
                        </p>
                        {errors.phone ? fieldError('phone-error', errors.phone) : null}
                      </div>

                      <div>
                        <label htmlFor="city" className={labelClass}>
                          City
                        </label>
                        <input
                          id="city"
                          name="city"
                          autoComplete="address-level2"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          placeholder="Your current city"
                          aria-invalid={Boolean(errors.city)}
                          aria-describedby={errors.city ? 'city-error' : undefined}
                        />
                        {errors.city ? fieldError('city-error', errors.city) : null}
                      </div>

                      <div>
                        <label htmlFor="currentRole" className={labelClass}>
                          Current occupation <span className="font-normal text-content-faint">(optional)</span>
                        </label>
                        <input
                          id="currentRole"
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          placeholder="e.g. Homemaker, Sales Executive, Student"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="border-t border-line pt-8">
                    <legend className="text-eyebrow font-semibold uppercase text-primary">
                      Step 2 · Qualification and role preference
                    </legend>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="qualification" className={labelClass}>
                          Qualification
                        </label>
                        <select
                          id="qualification"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          aria-invalid={Boolean(errors.qualification)}
                          aria-describedby={errors.qualification ? 'qualification-error' : undefined}
                        >
                          <option value="">Select qualification</option>
                          <option value="10th">10th Pass</option>
                          <option value="12th">12th Pass</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="Professional">Professional Degree</option>
                        </select>
                        {errors.qualification ? fieldError('qualification-error', errors.qualification) : null}
                      </div>

                      <div>
                        <label htmlFor="preferredTime" className={labelClass}>
                          Preferred callback time <span className="font-normal text-content-faint">(optional)</span>
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                        >
                          <option value="">Select preferred time</option>
                          <option value="morning">Morning (10 AM - 1 PM)</option>
                          <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                          <option value="evening">Evening (4 PM - 7 PM)</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="interest" className={labelClass}>
                          Role interest
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={fieldClass}
                          aria-invalid={Boolean(errors.interest)}
                          aria-describedby={`interest-hint${errors.interest ? ' interest-error' : ''}`}
                        >
                          <option value="">Select your preferred role</option>
                          <option value="agent">LIC Agent</option>
                          <option value="bima-sakhi">Bima Sakhi</option>
                        </select>
                        <p id="interest-hint" className="mt-2 text-xs text-content-faint">
                          Not sure? Pick your best fit now. Final role can be discussed on call.
                        </p>
                        {errors.interest ? fieldError('interest-error', errors.interest) : null}
                      </div>
                    </div>
                  </fieldset>

                  {submitStatus === 'error' ? (
                    <p
                      aria-live="assertive"
                      className="flex gap-2 rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm text-danger"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
                      <span>
                        We could not submit your response right now. Please retry or contact us directly on WhatsApp.
                      </span>
                    </p>
                  ) : null}

                  <div className="space-y-4 border-t border-line pt-8">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!canSubmit}
                      loading={isSubmitting}
                      icon={!isSubmitting ? <ArrowRight className="h-4 w-4" aria-hidden /> : undefined}
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit application'}
                    </Button>
                    <p className="flex items-center gap-2 text-xs text-content-faint">
                      <Lock className="h-3.5 w-3.5" aria-hidden />
                      Your data is secure and used only for recruitment purposes.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
