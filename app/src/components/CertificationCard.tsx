interface CertificationCardProps {
  title: string;
  issuer: string;
  description: string;
}

export default function CertificationCard({ title, issuer, description }: CertificationCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-card border-t-[3px] border-soft-gold">
      <svg className="w-8 h-8 text-navy mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M19.5 10.5c0 1.5-.5 2.5-1.5 3.5L12 20l-6-6c-1-1-1.5-2-1.5-3.5a7.5 7.5 0 1115 0z" />
      </svg>
      <h4 className="font-heading text-lg font-medium text-charcoal mb-2 leading-snug">{title}</h4>
      <p className="font-body text-sm text-charcoal/65 mb-3">{issuer}</p>
      <p className="font-body text-sm text-charcoal/65 leading-relaxed">{description}</p>
    </div>
  );
}
