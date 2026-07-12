interface SectionLabelProps {
  text: string;
  color?: 'navy' | 'soft-gold';
  className?: string;
}

export default function SectionLabel({ text, color = 'navy', className = '' }: SectionLabelProps) {
  const colorClass = color === 'soft-gold' ? 'text-soft-gold' : 'text-navy-light';

  return (
    <span
      className={`font-mono text-xs uppercase tracking-[0.1em] ${colorClass} ${className}`}
    >
      {text}
    </span>
  );
}
