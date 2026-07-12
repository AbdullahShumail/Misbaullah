import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import WordRevealHeading from '@/components/WordRevealHeading';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tweens: gsap.core.Tween[] = [];

    // Image clip-path wipe
    if (imageRef.current) {
      const imageTween = gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0% 0 100%)' },
        {
          clipPath: 'inset(0 0% 0 0%)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
      tweens.push(imageTween);
    }

    // Text fade-in
    if (textRef.current) {
      const textItems = textRef.current.querySelectorAll('.fade-in-item');
      const textTween = gsap.from(textItems, {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tweens.push(textTween);
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
      id="about"
      className="bg-ivory py-[72px] md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-start">
          {/* Text Column */}
          <div ref={textRef}>
            <div className="fade-in-item">
              <SectionLabel text="ABOUT ME" />
            </div>

            <WordRevealHeading
              text="Bridging Science Education & Microbiological Research"
              className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal leading-[1.15] mt-4 mb-7"
            />

            <p className="fade-in-item font-body text-base text-charcoal/80 leading-relaxed mb-5">
              Educator and Microbiologist with over 10 years of teaching service in the Khyber
              Pakhtunkhwa Provincial Government. I hold a Master of Education (Science Education), a
              Master of Philosophy in Microbiology, and multiple teaching certifications from Allama
              Iqbal Open University.
            </p>

            <p className="fade-in-item font-body text-base text-charcoal/80 leading-relaxed mb-5">
              I integrate scientific laboratory experience and safety protocols into foundational
              science education, alongside specialized tutoring in food and health nutrition. My
              approach combines quantitative assessment strategies, curriculum alignment, and rigorous
              academic standards to primary and secondary education environments.
            </p>

            <p className="fade-in-item font-body text-base text-charcoal/80 leading-relaxed mb-7">
              With professional certifications in HACCP (Level 3, Codex Principles) and Food Safety
              (Level 3) from Highfield UK, I bring a unique dual perspective spanning both the
              classroom and the laboratory.
            </p>

            {/* Contact Pills */}
            <div className="fade-in-item flex flex-wrap gap-3 mb-8">
              <span className="bg-mist text-charcoal font-body text-sm rounded-full px-4 py-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-navy-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Al Jubail, KSA
              </span>
              <a
                href="mailto:misbahullahullah@gmail.com?subject=Inquiry:%20Science%20Educator%20%26%20Microbiologist%20Opportunity"
                className="bg-mist text-charcoal font-body text-sm rounded-full px-4 py-2 hover:text-navy transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-navy-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                misbahullahullah@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/misbahullah"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mist text-charcoal font-body text-sm rounded-full px-4 py-2 hover:text-navy transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-navy-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                linkedin.com/in/misbahullah
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="fade-in-item inline-flex items-center gap-2 font-body text-sm font-medium text-navy hover:underline group"
            >
              Send Message
              <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
          </div>

          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <img
              src="/about-portrait-new.jpg"
              alt="Misbahullah professional portrait"
              className="w-full rounded-xl object-cover aspect-[3/4] shadow-card-hover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
