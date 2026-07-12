import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import ContactForm from '@/components/ContactForm';
import ContactDetail from '@/components/ContactDetail';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (leftRef.current) {
      const leftTween = gsap.from(leftRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tweens.push(leftTween);
    }

    if (rightRef.current) {
      const rightTween = gsap.from(rightRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tweens.push(rightTween);
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-navy py-[72px] md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column — Contact Info */}
          <div ref={leftRef}>
            <SectionLabel text="GET IN TOUCH" color="soft-gold" />
            <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-white mt-4 mb-6">
              Let's Connect
            </h2>
            <p className="font-body text-base text-white/75 leading-relaxed mb-10">
              I welcome professional inquiries about teaching positions, curriculum development
              collaborations, laboratory consulting, and microbiology research. Feel free to reach out.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <ContactDetail
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                }
                text="Al Jubail, Eastern Province, Kingdom of Saudi Arabia"
              />
              <ContactDetail
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                }
                text="+92 346 242 3269"
                href="tel:+923462423269"
              />
              <ContactDetail
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
                text="misbahullahullah@gmail.com"
                href="mailto:misbahullahullah@gmail.com?subject=Inquiry:%20Science%20Educator%20%26%20Microbiologist%20Opportunity"
              />
              <ContactDetail
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                text="linkedin.com/in/misbahullah"
                href="https://linkedin.com/in/misbahullah"
              />
            </div>

            {/* Download CV Button */}
            <a
              href="/cv-misbahullah.pdf"
              download
              className="inline-flex items-center gap-2 font-body text-sm font-medium bg-navy-light text-white rounded-lg px-7 py-3.5 hover:bg-navy hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(27,58,92,0.35)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full CV
            </a>
          </div>

          {/* Right Column — Contact Form */}
          <div ref={rightRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
