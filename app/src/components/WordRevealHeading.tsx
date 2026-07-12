import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WordRevealHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function WordRevealHeading({ text, className = '', as: Tag = 'h2' }: WordRevealHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const innerWords = containerRef.current.querySelectorAll('.word-inner');

    const tween = gsap.from(innerWords, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.04,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
