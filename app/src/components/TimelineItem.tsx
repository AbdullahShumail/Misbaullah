interface TimelineItemProps {
  period: string;
  role: string;
  organization: string;
  responsibilities: string[];
  index: number;
}

export default function TimelineItem({ period, role, organization, responsibilities, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`timeline-item relative flex items-start ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } flex-row mb-12 last:mb-0`}
    >
      {/* Content Card */}
      <div
        className={`lg:w-[420px] w-full ${
          isLeft ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'
        } pl-12 lg:pl-0`}
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <span className="font-mono text-xs text-soft-gold uppercase tracking-[0.08em] block mb-2">
            {period}
          </span>
          <h4 className="font-heading text-xl font-medium text-white mb-1">{role}</h4>
          <p className="font-body text-sm text-white/60 mb-4">{organization}</p>
          <ul className="space-y-2">
            {responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-navy-light rounded-sm mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-white/75 leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dot */}
      <div
        className={`timeline-dot absolute top-6 w-3.5 h-3.5 bg-navy-light rounded-full border-[3px] border-white z-10 ${
          isLeft ? 'lg:left-1/2 lg:-translate-x-1/2' : 'lg:left-1/2 lg:-translate-x-1/2'
        } left-5 -translate-x-1/2`}
      />
    </div>
  );
}
