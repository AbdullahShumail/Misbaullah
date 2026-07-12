interface ContactDetailProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

export default function ContactDetail({ icon, text, href }: ContactDetailProps) {
  const content = (
    <div className="flex items-center gap-4 group">
      <span className="text-navy-light flex-shrink-0">{icon}</span>
      <span className="font-body text-[15px] text-white/85 group-hover:text-soft-gold transition-colors duration-300">
        {text}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
