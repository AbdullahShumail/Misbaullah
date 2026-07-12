import { useState, type FormEvent } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setFormState('loading');

    try {
      const response = await fetch('https://formspree.io/f/xnqevjdr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 4000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClasses =
    'w-full h-12 px-4 border-[1.5px] border-mist rounded-lg font-body text-[15px] text-charcoal placeholder:text-charcoal/40 focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.15)] outline-none transition-all duration-200';

  const textareaClasses =
    'w-full h-[140px] px-4 py-3.5 border-[1.5px] border-mist rounded-lg font-body text-[15px] text-charcoal placeholder:text-charcoal/40 focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.15)] outline-none transition-all duration-200 resize-vertical';

  const getButtonContent = () => {
    switch (formState) {
      case 'loading':
        return (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-loader" />
            Sending...
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Message Sent!
          </span>
        );
      case 'error':
        return 'Failed to send. Please try again.';
      default:
        return 'Send Message';
    }
  };

  const getButtonClasses = () => {
    const base = 'w-full h-[50px] rounded-lg font-body text-sm font-medium text-white transition-all duration-200 ';
    switch (formState) {
      case 'loading':
        return base + 'bg-navy/80 cursor-wait';
      case 'success':
        return base + 'bg-navy-light hover:bg-navy-light';
      case 'error':
        return base + 'bg-[#C45B4A] hover:bg-[#C45B4A]';
      default:
        return base + 'bg-navy hover:bg-navy-light hover:-translate-y-0.5 active:translate-y-0';
    }
  };

  return (
    <div className="bg-white rounded-xl p-10 shadow-form">
      <h3 className="font-heading text-[22px] font-medium text-charcoal mb-6">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-body text-[13px] font-medium text-charcoal/70 mb-1.5">Your Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputClasses}
            disabled={formState === 'loading'}
          />
          {errors.name && <p className="font-body text-xs text-[#C45B4A] mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-body text-[13px] font-medium text-charcoal/70 mb-1.5">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClasses}
            disabled={formState === 'loading'}
          />
          {errors.email && <p className="font-body text-xs text-[#C45B4A] mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-body text-[13px] font-medium text-charcoal/70 mb-1.5">Subject</label>
          <input
            type="text"
            placeholder="What is this regarding?"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className={inputClasses}
            disabled={formState === 'loading'}
          />
        </div>

        <div>
          <label className="block font-body text-[13px] font-medium text-charcoal/70 mb-1.5">Message</label>
          <textarea
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={textareaClasses}
            disabled={formState === 'loading'}
          />
          {errors.message && <p className="font-body text-xs text-[#C45B4A] mt-1">{errors.message}</p>}
        </div>

        <button type="submit" className={getButtonClasses()} disabled={formState === 'loading'}>
          {getButtonContent()}
        </button>

        <p className="font-body text-xs text-charcoal/50 mt-3">
          Your information will not be shared with third parties.
        </p>
      </form>
    </div>
  );
}
