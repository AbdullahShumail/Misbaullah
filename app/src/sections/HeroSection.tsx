import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    // Parallax on background image
    const parallaxTween = gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(captionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(h1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    return () => {
      parallaxTween.scrollTrigger?.kill();
      parallaxTween.kill();
      tl.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-section relative w-full h-screen overflow-hidden"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/hero-bg-new.webp"
        alt="Misbahullah in laboratory with microscope"
        className="absolute top-0 left-0 w-full h-[130%] object-cover"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15, 36, 64, 0.40) 0%, rgba(15, 36, 64, 0.60) 70%, rgba(27, 58, 92, 0.90) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className="max-w-[700px]">
          <span
            ref={captionRef}
            className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-soft-gold mb-5 opacity-0 translate-y-4"
          >
            SCIENCE EDUCATOR &middot; MICROBIOLOGIST &middot; CURRICULUM DEVELOPER
          </span>

          <h1
            ref={h1Ref}
            className="font-display text-[clamp(44px,6vw,80px)] font-normal text-white leading-[1.05] tracking-[-0.02em] mb-4 opacity-0 translate-y-4"
          >
            Misbahullah
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-lg font-light text-white/85 leading-relaxed mb-8 opacity-0 translate-y-4"
          >
            Science Educator & Certified Microbiologist
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 opacity-0 translate-y-4"
          >
            <a
              href="/cv-misbahullah.pdf"
              download
              className="inline-flex items-center gap-2 font-body text-sm font-medium bg-navy-light text-white rounded-lg px-7 py-3.5 hover:bg-navy hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(27,58,92,0.40)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center font-body text-sm font-medium bg-transparent text-white border-[1.5px] border-white rounded-lg px-7 py-3.5 hover:bg-white/10 hover:border-soft-gold transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-6 h-6 text-white/50 animate-bounce-chevron"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
