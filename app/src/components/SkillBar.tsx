import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  proficiency: number;
  index: number;
}

export default function SkillBar({ name, proficiency, index }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const tween = gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${proficiency}%`,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.08,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [proficiency, index]);

  return (
    <div className="skill-item">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-sm font-medium text-charcoal">{name}</span>
        <span className="font-mono text-[11px] text-charcoal/50">{proficiency}%</span>
      </div>
      <div className="w-full h-1.5 bg-mist rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-navy rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
