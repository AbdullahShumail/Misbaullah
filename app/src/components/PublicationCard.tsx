interface PublicationCardProps {
  year: string;
  title: string;
  authors: string;
  journal: string;
  tags: string[];
}

export default function PublicationCard({ year, title, authors, journal, tags }: PublicationCardProps) {
  return (
    <div className="bg-white rounded-xl p-9 shadow-card border-l-4 border-navy publication-card">
      <span className="font-mono text-xs text-soft-gold uppercase block mb-2.5">{year}</span>
      <h4 className="font-heading text-xl font-medium text-charcoal leading-snug mb-3">{title}</h4>
      <p className="font-body text-sm text-charcoal/70 mb-2 italic">{authors}</p>
      <p className="font-body text-sm text-charcoal/65 leading-relaxed mb-4">{journal}</p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[11px] bg-navy/12 text-navy rounded px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
