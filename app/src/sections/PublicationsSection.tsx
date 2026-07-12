import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import WordRevealHeading from '@/components/WordRevealHeading';
import PublicationCard from '@/components/PublicationCard';

gsap.registerPlugin(ScrollTrigger);

const PUBLICATIONS = [
  {
    year: '2017',
    title: 'Analysis of milk collected from milk points for composition, adulterants and microbial quality in District Swat.',
    authors: 'Khan, H., Aziz, I., Misbahullah, M., et al.',
    journal: 'American Scientific Research Journal for Engineering, Technology, and Sciences (ASRJETS), 36(1): 95-108.',
    tags: ['Food Safety', 'Microbiology', 'Dairy Science'],
  },
  {
    year: '2019',
    title: 'Increasing Burden of Hepatitis C in Population of District Peshawar, Khyber Pakhtunkhwa Province of Pakistan.',
    authors: 'Misbahud Din, Anwar, F., Misbahullah, et al.',
    journal: 'Indo American Journal of Pharmaceutical Sciences, 06(08): 14988-14991.',
    tags: ['Public Health', 'Virology', 'Epidemiology'],
  },
];

export default function PublicationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.publication-card');

    const cardTween = gsap.from(cards, {
      y: 30,
      opacity: 0,
      stagger: 0.25,
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
      id="publications"
      className="bg-ivory py-[72px] md:py-[120px]"
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="RESEARCH" className="justify-center" />
          <WordRevealHeading
            text="Publications"
            className="font-heading text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal mt-4"
          />
          <p className="font-body text-base text-charcoal/65 mt-4 max-w-[600px] mx-auto">
            Peer-reviewed contributions to microbiology, food safety, and public health research.
          </p>
        </div>

        {/* Publication Cards */}
        <div ref={cardsRef} className="flex flex-col gap-6">
          {PUBLICATIONS.map((pub, i) => (
            <PublicationCard key={i} {...pub} />
          ))}
        </div>
      </div>
    </section>
  );
}
