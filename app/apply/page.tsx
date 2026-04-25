'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import {
  Rocket,
  Phone,
  GraduationCap,
  BadgeCheck,
  CheckCircle,
  ArrowRight,
  Lock,
  ShieldCheck,
  MessageCircle,
  PhoneCall,
  MapPin,
  Clock3,
  ListOrdered,
  AlertCircle,
} from 'lucide-react';

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

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadId, setLeadId] = useState<string>('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
    'Hi, I want to discuss becoming an LIC agent and the pre-recruitment process.'
  )}`;

  useEffect(() => {
    trackEvent('form_view', {
      form_name: 'lead_application',
      page: '/apply',
    });
  }, []);

  const canSubmit = useMemo(() => {
    return formData.name && formData.phone.length === 10 && formData.city && formData.qualification && formData.interest;
  }, [formData]);

  const validateField = (name: keyof FormData, value: string) => {
    if (!value.trim() && name !== 'currentRole' && name !== 'preferredTime') {
      return 'This field is required.';
    }

    if (name === 'name' && value.trim().length < 2) {
      return 'Please enter at least 2 characters.';
    }

    if (name === 'phone') {
      if (!/^\d+$/.test(value)) {
        return 'Use digits only.';
      }
      if (value.length !== 10) {
        return 'Phone number must be 10 digits.';
      }
    }

    if (name === 'city' && value.trim().length < 2) {
      return 'City must be at least 2 characters.';
    }

    return '';
  };

  const validateForm = () => {
    const nextErrors: Errors = {};

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, String(formData[key]));
      if (error) {
        nextErrors[key] = error;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === 'phone') {
      nextValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (!hasStartedForm && nextValue.trim()) {
      setHasStartedForm(true);
      trackEvent('form_start', {
        form_name: 'lead_application',
      });
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

  const openWhatsApp = () => {
    trackEvent('cta_click', {
      location: 'apply_success',
      cta_type: 'whatsapp',
    });
    const message = encodeURIComponent(
      `Hi, I submitted my application (${leadId || 'pending ID'}) for ${formData.interest ? interestLabelMap[formData.interest] : 'LIC opportunity'}. Please guide me for next steps.`
    );
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    trackEvent('form_submit_attempt', {
      form_name: 'lead_application',
      interest: formData.interest || 'none',
    });

    if (!validateForm()) {
      trackEvent('form_submit_blocked', {
        form_name: 'lead_application',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      setLeadId(data?.leadId || '');
      setSubmitStatus('success');
      trackEvent('form_submit_success', {
        form_name: 'lead_application',
        interest: formData.interest,
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      trackEvent('form_submit_error', {
        form_name: 'lead_application',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-outline-variant/50 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary/60 focus:bg-primary/[0.01] focus:shadow-[0_0_0_3px_rgba(2,83,205,0.08)]';
  const labelClasses = 'mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant';
  const fieldError = (message: string) => (
    <p className="mt-2 flex items-start gap-2 text-sm text-error">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </p>
  );

  return (
    <main className="pb-28 lg:pb-0">
      <h1 className="sr-only">Apply for LIC career mentorship and callback</h1>
      <section className="px-6 pb-10 md:px-10 md:pb-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
          <aside className="order-2 flex w-full flex-col gap-5 xl:sticky xl:top-[calc(var(--site-header-offset)+1rem)] xl:order-1 xl:self-start">
            <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-[#f8fbff] via-white to-[#ecf2ff] p-5 shadow-[0_18px_54px_rgba(2,83,205,0.07)] md:p-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <Rocket className="w-3.5 h-3.5" />
                Your mentor
              </p>
              <h2 className="mt-4 font-headline text-2xl font-extrabold leading-tight tracking-tight text-on-surface md:text-3xl">
                Subhash Panjla
              </h2>
              <p className="mt-2 text-sm font-semibold text-primary">LIC Development Officer &amp; Lead Mentor</p>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Recruitment and onboarding support for LIC careers across Chandigarh Tricity—with clear guidance on documents, IRDAI training, and IC38.
              </p>

              <div className="mt-5 rounded-2xl border border-primary/20 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Contact</p>
                <p className="mt-2 font-headline text-lg font-bold text-on-surface">Reach the mentor</p>
                <p className="text-sm text-on-surface-variant">WhatsApp, phone, or submit the form on the right.</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#167C3A] px-4 py-3 text-center font-headline text-sm font-bold text-white transition-colors hover:bg-[#126C32]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+918872364673"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-primary/25 px-4 py-3 font-headline text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call now
                  </a>
                </div>
                <Link
                  href="/#lic-agent-procedure"
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm transition-all hover:brightness-105"
                >
                  <ListOrdered className="h-3.5 w-3.5 text-white" aria-hidden />
                  Procedure
                </Link>
                <p className="mt-4 flex items-start gap-2 text-sm text-on-surface-variant">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <a href="tel:+918872364673" className="font-semibold text-on-surface hover:underline">
                    +91 88723 64673
                  </a>
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm text-on-surface-variant">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>
                    Chandigarh, Sector 7 · Mohali, Sector 68 · Active support across Chandigarh Tricity (Chandigarh, Mohali, Panchkula)
                  </span>
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm text-on-surface-variant">
                  <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Mon–Sat, 10:00 AM – 6:00 PM · Most queries answered within one business day</span>
                </p>
                <p className="mt-4 rounded-xl bg-primary/5 p-3 text-xs leading-relaxed text-on-surface-variant">
                  Your details are used only for recruitment communication and role guidance — not for unrelated marketing.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">How we support you</p>
                {mentorSupportSteps.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-surface-variant/20 bg-white p-3">
                      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-headline text-base font-bold text-on-surface">{item.title}</p>
                        <p className="text-sm text-on-surface-variant">{item.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-primary/15 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Application confidence</p>
                <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Your details are used only for recruitment communication.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Most applicants receive a response within one business day.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span>You can continue on WhatsApp or phone after submission.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <section
            id="application-form"
            className="order-1 rounded-3xl border border-outline-variant/30 bg-white p-5 shadow-[0_18px_54px_rgba(15,24,41,0.08)] md:p-6 xl:order-2"
          >
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {submitStatus === 'success' ? 'Application received.' : submitStatus === 'error' ? 'Application could not be submitted.' : 'Application form ready.'}
            </div>
            {submitStatus === 'success' ? (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-0.5 h-8 w-8 flex-shrink-0 text-green-600" />
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-green-900">Application received</h2>
                    <p className="mt-2 text-green-800">
                      Thank you. Your profile has been received.
                      {leadId ? ` Reference ID: ${leadId}` : ''}
                    </p>
                    <p className="mt-1 text-sm text-green-700">A team member should reach out within one business day.</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="flex items-center gap-2 rounded-2xl bg-[#167C3A] px-6 py-3 font-headline font-bold text-white transition-colors hover:bg-[#126C32]"
                  >
                    Continue on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialData);
                      setErrors({});
                      setSubmitStatus('idle');
                      setLeadId('');
                    }}
                    className="rounded-2xl border border-green-300 px-6 py-3 font-headline font-bold text-green-900"
                  >
                    Submit another response
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Application</p>
                <h2 className="mt-2 font-headline text-2xl font-extrabold tracking-tight text-on-surface md:text-3xl">Pre-recruitment form</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  This takes around two to three minutes. Required fields help us match the right role; optional fields help us call at a convenient time.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                  <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Step 1: Personal basics</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder="Enter your full name"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name ? fieldError(errors.name) : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder="10 digit mobile number"
                        inputMode="numeric"
                        aria-invalid={Boolean(errors.phone)}
                      />
                      <p className="mt-2 text-xs text-on-surface-variant">{formData.phone.length}/10 digits</p>
                      <p className="mt-1 text-xs text-on-surface-variant">We use this only for recruitment updates.</p>
                      {errors.phone ? fieldError(errors.phone) : null}
                    </div>

                    <div>
                      <label htmlFor="city" className={labelClasses}>
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder="Your current city"
                        aria-invalid={Boolean(errors.city)}
                      />
                      {errors.city ? fieldError(errors.city) : null}
                    </div>
                    <div>
                      <label htmlFor="currentRole" className={labelClasses}>
                        Current occupation (optional)
                      </label>
                      <input
                        id="currentRole"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder="e.g. Homemaker, Sales Executive, Student"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Step 2: Qualification and role preference</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="qualification" className={labelClasses}>
                        Qualification
                      </label>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClasses} appearance-none`}
                        aria-invalid={Boolean(errors.qualification)}
                      >
                        <option value="">Select qualification</option>
                        <option value="10th">10th Pass</option>
                        <option value="12th">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="Professional">Professional Degree</option>
                      </select>
                      {errors.qualification ? fieldError(errors.qualification) : null}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="interest" className={labelClasses}>
                        Role interest
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClasses} appearance-none`}
                        aria-invalid={Boolean(errors.interest)}
                      >
                        <option value="">Select your preferred role</option>
                        <option value="agent">LIC Agent</option>
                        <option value="bima-sakhi">Bima Sakhi</option>
                      </select>
                      <p className="mt-2 text-xs text-on-surface-variant">Not sure? Pick your best fit now. Final role can be discussed on call.</p>
                      {errors.interest ? fieldError(errors.interest) : null}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="preferredTime" className={labelClasses}>
                        Preferred callback time (optional)
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (10 AM - 1 PM)</option>
                        <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  {submitStatus === 'error' ? (
                    <div aria-live="assertive" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>We could not submit your response right now. Please retry or contact us directly on WhatsApp.</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !canSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[#1a6fff] px-8 py-4 font-headline text-base font-bold text-white shadow-[0_6px_24px_rgba(2,83,205,0.28)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(2,83,205,0.42)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit application'}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </button>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Lock className="h-3 w-3" />
                      <span>Your data is secure and used only for recruitment purposes.</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
