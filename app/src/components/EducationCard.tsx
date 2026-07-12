interface EducationCardProps {
  badge: string;
  degree: string;
  institution: string;
  description: string;
}

export default function EducationCard({ badge, degree, institution, description }: EducationCardProps) {
  return (
    <div className="bg-white rounded-xl p-10 shadow-card border-l-4 border-navy education-card">
      <span className="inline-block font-mono text-[11px] uppercase bg-navy/15 text-navy rounded px-2.5 py-1 mb-4">
        {badge}
      </span>
      <h3 className="font-heading text-2xl font-medium text-charcoal mb-2">{degree}</h3>
      <p className="font-body text-base text-charcoal/70 mb-4">{institution}</p>
      <p className="font-body text-sm text-charcoal/65 leading-relaxed">{description}</p>
    </div>
  );
}
