import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import WordRevealHeading from '@/components/WordRevealHeading';
import CertificationCard from '@/components/CertificationCard';
import SkillBar from '@/components/SkillBar';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    title: 'Level 3 International Award in HACCP (Codex Principles)',
    issuer: 'Highfield Qualifications, United Kingdom — May 2026',
    description:
      'Comprehensive certification in Hazard Analysis and Critical Control Points following Codex Alimentarius principles for food manufacturing and safety environments.',
  },
  {
    title: 'Level 3 International Award in Food Safety',
    issuer: 'Highfield Qualifications, United Kingdom — June 2026',
    description:
      'Advanced food safety certification covering hygiene practices, contamination control, and regulatory compliance in manufacturing and educational settings.',
  },
  {
    title: 'Diploma in Information Technology (DIT)',
    issuer: 'KP-Board of Technical & Commerce Education — September 2022',
    description:
      'Professional diploma in IT systems, digital literacy, and technology integration for educational and laboratory documentation.',
  },
];

const TEACHING_SKILLS = [
  { name: 'Science Curriculum Development', proficiency: 95 },
  { name: 'Classroom Management', proficiency: 92 },
  { name: 'Student Assessment & Evaluation', proficiency: 90 },
  { name: 'STEM Education', proficiency: 88 },
  { name: 'Laboratory Safety Instruction', proficiency: 90 },
  { name: 'Nutritional Science Tutoring', proficiency: 85 },
];

const TECHNICAL_SKILLS = [
  { name: 'Food Safety Management', proficiency: 95 },
  { name: 'HACCP Implementation', proficiency: 92 },
  { name: 'Microbiological Testing', proficiency: 95 },
  { name: 'Quality Assurance', proficiency: 90 },
  { name: 'Pathogen Detection', proficiency: 88 },
  { name: 'Laboratory Techniques', proficiency: 90 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (certsRef.current) {
      const cards = certsRef.current.querySelectorAll('.cert-card');
      const cardTween = gsap.from(cards, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: certsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tweens.push(cardTween);
    }

    if (skillsRef.current) {
      const items = skillsRef.current.querySelectorAll('.skill-item');
      const skillTween = gsap.from(items, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tweens.push(skillTween);
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
      id="skills"
      className="py-[72px] md:py-[120px]"
      style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #EDE7DB 100%)' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="EXPERTISE" className="justify-center" />
          <WordRevealHeading
            text="Skills & Certifications"
            className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal mt-4"
          />
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="font-heading text-[22px] font-medium text-charcoal mb-2 flex items-center gap-3">
            <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Professional Certifications
          </h3>
          <p className="font-body text-sm text-charcoal/60 mb-8 ml-9">
            Internationally recognized credentials in food safety and HACCP
          </p>
          <div ref={certsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="cert-card">
                <CertificationCard {...cert} />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <h3 className="font-heading text-[22px] font-medium text-charcoal mb-8 flex items-center gap-3">
            <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Core Competencies
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Teaching Skills */}
            <div>
              <h4 className="font-body text-sm font-medium text-charcoal/70 uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-soft-gold" />
                Teaching & Education
              </h4>
              <div className="space-y-5">
                {TEACHING_SKILLS.map((skill, i) => (
                  <SkillBar key={i} {...skill} index={i} />
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h4 className="font-body text-sm font-medium text-charcoal/70 uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-soft-gold" />
                Laboratory & Research
              </h4>
              <div className="space-y-5">
                {TECHNICAL_SKILLS.map((skill, i) => (
                  <SkillBar key={i} {...skill} index={i + 6} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
