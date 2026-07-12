import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'teaching' | 'laboratory';

const TEACHING_EXPERIENCE = [
  {
    period: 'MARCH 2016 – PRESENT',
    role: 'Primary School Teacher',
    organization: 'Government Primary Schools Swat, District Government KP Provincial',
    responsibilities: [
      'Instruct foundational subjects including general science and biology to classes of 40 or more students',
      'Completed over 10 years of continuous government teaching service delivering curriculum in alignment with provincial educational standards',
      'Administer 4 quarterly assessments per academic year to quantify student academic progress and adapt lesson plans',
      'Maintain classroom safety and manage environments for primary-level science demonstrations',
    ],
  },
  {
    period: '2019 – PRESENT',
    role: 'Part-Time Tutor (Food, Health & Nutrition)',
    organization: 'Freelance / Distance Learning Education',
    responsibilities: [
      'Instruct and mentor students in Course 484 (Food & Nutrition) and Course 485 (Health & Nutrition)',
      'Develop and deliver targeted curriculum focusing on nutritional science, food safety standards, and public health guidelines',
      'Assess student assignments, provide quantitative feedback, and bridge the gap between theoretical microbiology and practical health applications',
    ],
  },
];

const LABORATORY_EXPERIENCE = [
  {
    period: 'MARCH 2017 – APRIL 2019',
    role: 'Microbiologist',
    organization: 'Shifa Clinical Lab, Swat, Pakistan',
    responsibilities: [
      'Conducted microbiological analyses on 200+ monthly samples, including isolation and enumeration of microorganisms',
      'Prepared and calibrated 15+ critical laboratory instruments daily to maintain analytical precision',
      'Documented findings and generated 50+ monthly compliance reports adhering to quality assurance standard operating procedures',
    ],
  },
  {
    period: 'MARCH 2016 – OCTOBER 2018',
    role: 'Microbiology Intern',
    organization: 'Veterinary Research and Disease Investigation Center, Balogram Swat, Pakistan',
    responsibilities: [
      'Processed 150+ routine samples weekly, performing bacterial culturing and pathogen testing',
      'Participated in 5 active disease surveillance projects employing rigorous hygiene and contamination prevention protocols',
      'Assisted in 3 major experiments focusing on etiology and pathogenesis, contributing to a 20% improvement in reproducible laboratory outcomes',
    ],
  },
];

interface ExperienceCardProps {
  period: string;
  role: string;
  organization: string;
  responsibilities: string[];
}

function ExperienceCard({ period, role, organization, responsibilities }: ExperienceCardProps) {
  return (
    <div className="experience-card bg-white rounded-xl p-8 shadow-card border-l-4 border-soft-gold">
      <span className="font-mono text-xs text-navy uppercase tracking-[0.08em] block mb-3">
        {period}
      </span>
      <h4 className="font-heading text-xl font-medium text-charcoal mb-1">{role}</h4>
      <p className="font-body text-sm text-charcoal/60 mb-5">{organization}</p>
      <ul className="space-y-3">
        {responsibilities.map((resp, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-navy rounded-sm mt-2 flex-shrink-0" />
            <span className="font-body text-sm text-charcoal/75 leading-relaxed">{resp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<TabType>('teaching');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.experience-card');

    const cardTween = gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      cardTween.scrollTrigger?.kill();
      cardTween.kill();
    };
  }, [activeTab]);

  const currentData = activeTab === 'teaching' ? TEACHING_EXPERIENCE : LABORATORY_EXPERIENCE;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section bg-ivory py-[72px] md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel text="PROFESSIONAL EXPERIENCE" className="justify-center" />
          <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal mt-4 mb-6">
            Career Journey
          </h2>
          <p className="font-body text-base text-charcoal/65 max-w-[600px] mx-auto">
            Dual-track career spanning over 10 years in education and hands-on laboratory research.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-mist rounded-lg p-1">
            <button
              onClick={() => setActiveTab('teaching')}
              className={`font-body text-sm font-medium rounded-md px-6 py-2.5 transition-all duration-300 ${
                activeTab === 'teaching'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                Teaching
              </span>
            </button>
            <button
              onClick={() => setActiveTab('laboratory')}
              className={`font-body text-sm font-medium rounded-md px-6 py-2.5 transition-all duration-300 ${
                activeTab === 'laboratory'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                Laboratory
              </span>
            </button>
          </div>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentData.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
