import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import WordRevealHeading from '@/components/WordRevealHeading';

gsap.registerPlugin(ScrollTrigger);

const TEACHING_CREDENTIALS = [
  {
    badge: 'POSTGRADUATE',
    degree: 'Master of Education (Science Education)',
    institution: 'Allama Iqbal Open University',
    period: 'Spring 2018',
    description: 'Specialized training in science pedagogy, curriculum development, and instructional strategies for STEM education at the primary and secondary levels.',
  },
  {
    badge: 'UNDERGRADUATE',
    degree: 'Bachelor of Education',
    institution: 'Allama Iqbal Open University',
    period: 'Spring 2015',
    description: 'Comprehensive foundation in educational theory, classroom management, student assessment, and pedagogical best practices.',
  },
  {
    badge: 'CERTIFICATE',
    degree: 'Certificate of Teaching',
    institution: 'Allama Iqbal Open University',
    period: 'Autumn 2013',
    description: 'Professional teaching certification covering lesson planning, instructional delivery, and student evaluation methodologies.',
  },
  {
    badge: 'CERTIFICATE',
    degree: 'Primary Teaching Certificate',
    institution: 'Allama Iqbal Open University',
    period: 'Spring 2011',
    description: 'Foundation-level teaching credential focused on early childhood and primary-level instruction, classroom engagement, and foundational literacy and numeracy.',
  },
];

const SCIENTIFIC_DEGREES = [
  {
    badge: 'POSTGRADUATE',
    degree: 'M.Phil in Microbiology',
    institution: 'Kohat University of Science & Technology (KUST)',
    period: '2020',
    description: 'Advanced research in applied microbiology, pathogen detection, food safety analysis, and quality control methodologies.',
  },
  {
    badge: 'UNDERGRADUATE',
    degree: 'BS in Microbiology',
    institution: 'University of Swat, Pakistan',
    period: '2017',
    description: 'Comprehensive study of microbial physiology, immunology, virology, molecular biology, and practical laboratory training.',
  },
];

interface CredentialCardProps {
  badge: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

function CredentialCard({ badge, degree, institution, period, description }: CredentialCardProps) {
  return (
    <div className="credential-card bg-white rounded-xl p-8 shadow-card border-l-4 border-navy">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-block font-mono text-[11px] uppercase bg-navy/15 text-navy rounded px-2.5 py-1">
          {badge}
        </span>
        <span className="font-mono text-[11px] text-charcoal/50">{period}</span>
      </div>
      <h3 className="font-heading text-xl font-medium text-charcoal mb-1">{degree}</h3>
      <p className="font-body text-sm text-charcoal/70 mb-3">{institution}</p>
      <p className="font-body text-sm text-charcoal/65 leading-relaxed">{description}</p>
    </div>
  );
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.credential-card');

    const cardTween = gsap.from(cards, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      cardTween.scrollTrigger?.kill();
      cardTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-[72px] md:py-[120px]"
      style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #EDE7DB 100%)' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="EDUCATION & QUALIFICATIONS" className="justify-center" />
          <WordRevealHeading
            text="Academic Foundation"
            className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal mt-4"
          />
        </div>

        <div ref={cardsRef} className="space-y-16">
          {/* Teaching Credentials */}
          <div>
            <h3 className="font-heading text-[22px] font-medium text-charcoal mb-2 flex items-center gap-3">
              <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              Teaching Credentials
            </h3>
            <p className="font-body text-sm text-charcoal/60 mb-8 ml-9">
              Over a decade of formal teaching qualifications from Allama Iqbal Open University
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEACHING_CREDENTIALS.map((edu, i) => (
                <CredentialCard key={i} {...edu} />
              ))}
            </div>
          </div>

          {/* Scientific Degrees */}
          <div>
            <h3 className="font-heading text-[22px] font-medium text-charcoal mb-2 flex items-center gap-3">
              <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              Scientific Degrees
            </h3>
            <p className="font-body text-sm text-charcoal/60 mb-8 ml-9">
              Advanced academic qualifications in microbiological sciences
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SCIENTIFIC_DEGREES.map((edu, i) => (
                <CredentialCard key={i} {...edu} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
