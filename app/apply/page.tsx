'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Rocket, Phone, GraduationCap, BadgeCheck, CheckCircle, ArrowRight, Lock } from 'lucide-react';

type FormData = {
  name: string;
  phone: string;
  city: string;
  qualification: string;
  interest: 'agent' | 'bima-sakhi' | '';
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  name: '',
  phone: '',
  city: '',
  qualification: '',
  interest: '',
};

const interestLabelMap: Record<Exclude<FormData['interest'], ''>, string> = {
  agent: 'LIC Agent',
  'bima-sakhi': 'Bima Sakhi',
};

const steps = [
  { icon: Phone, title: 'Profile Review Call', copy: 'Get a callback with initial guidance.' },
  { icon: GraduationCap, title: 'Training Roadmap', copy: 'Understand certification and role expectations.' },
  { icon: BadgeCheck, title: 'Structured Start', copy: 'Launch with practical mentoring support.' },
];

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadId, setLeadId] = useState<string>('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

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
    if (!value.trim()) {
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
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
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

  const inputClasses = "w-full rounded-2xl border border-outline-variant/50 bg-white px-5 py-4 text-base outline-none transition-all duration-200 focus:border-primary/60 focus:bg-primary/[0.01] focus:shadow-[0_0_0_4px_rgba(2,83,205,0.08)]";
  const labelClasses = "mb-2 block text-sm font-semibold text-on-surface";

  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:gap-10 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <aside className="w-full lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#f8fbff] via-white to-[#ecf2ff] p-6 md:p-8 shadow-[0_20px_70px_rgba(2,83,205,0.08)]">
              <p className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/15">
                <Rocket className="w-3.5 h-3.5" />
                Application Desk
              </p>
              <h1 className="mt-5 font-headline text-3xl md:text-4xl lg:text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                Start Your LIC Career Application.
              </h1>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-on-surface-variant">
                Submit your profile and our team will connect with you for role alignment, training guidance, and next steps.
              </p>

              <div className="mt-8 space-y-4">
                {steps.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 rounded-2xl bg-white p-4 border border-surface-variant/20">
                      <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-headline text-lg font-bold text-on-surface">{item.title}</p>
                        <p className="text-sm text-on-surface-variant">{item.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Image
                src="/images/mentor/mentor-portrait-2.jpg"
                alt="Subhash Panjla — Your Personal Mentor for Career Guidance"
                width={700}
                height={460}
                className="mt-8 h-48 md:h-52 w-full rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 45vw"
              />
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Application Reviewed By</p>
                <p className="font-headline text-lg font-bold text-on-surface mt-2">Subhash  Panjla</p>
                <p className="text-sm text-on-surface-variant mt-1">Founder & Lead Mentor</p>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-elevation-2">
            {submitStatus === 'success' ? (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-green-900">Application Received</h2>
                    <p className="mt-2 text-green-800">
                      Thank you. Your profile has been submitted successfully.
                      {leadId ? ` Reference ID: ${leadId}` : ''}
                    </p>
                    <p className="mt-1 text-sm text-green-700">A team member should reach out within one business day.</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={openWhatsApp}
                    className="rounded-2xl bg-[#25D366] px-6 py-3 font-headline font-bold text-white flex items-center gap-2"
                  >
                    Continue on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setFormData(initialData);
                      setErrors({});
                      setSubmitStatus('idle');
                      setLeadId('');
                    }}
                    className="rounded-2xl border border-green-300 px-6 py-3 font-headline font-bold text-green-900"
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Application Form</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Please provide accurate details. All fields are required. We use this information only for recruitment communication.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder="Enter your full name"
                      />
                      {errors.name ? <p className="mt-2 text-sm text-error">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number
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
                      />
                      <p className="mt-2 text-xs text-on-surface-variant">{formData.phone.length}/10 digits</p>
                      {errors.phone ? <p className="mt-1 text-sm text-error">{errors.phone}</p> : null}
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
                      />
                      {errors.city ? <p className="mt-2 text-sm text-error">{errors.city}</p> : null}
                    </div>

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
                      >
                        <option value="">Select qualification</option>
                        <option value="10th">10th Pass</option>
                        <option value="12th">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="Professional">Professional Degree</option>
                      </select>
                      {errors.qualification ? <p className="mt-2 text-sm text-error">{errors.qualification}</p> : null}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="interest" className={labelClasses}>
                        Role Interest
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="">Select your preferred role</option>
                        <option value="agent">LIC Agent</option>
                        <option value="bima-sakhi">Bima Sakhi</option>
                      </select>
                      {errors.interest ? <p className="mt-2 text-sm text-error">{errors.interest}</p> : null}
                    </div>
                  </div>

                  {submitStatus === 'error' ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      We could not submit your response right now. Please retry or contact us directly on WhatsApp.
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !canSubmit}
                      className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-primary to-[#1a6fff] px-10 py-5 font-headline text-lg font-bold text-white shadow-[0_6px_24px_rgba(2,83,205,0.35)] hover:shadow-[0_8px_36px_rgba(2,83,205,0.5)] hover:brightness-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Lock className="w-3 h-3" />
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
