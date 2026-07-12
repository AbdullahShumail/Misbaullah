export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-navy-dark py-10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-[13px] text-white/50">
          &copy; 2024 Misbahullah. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'About', href: '#about' },
            { label: 'Experience', href: '#experience' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-[13px] text-white/50 hover:text-white/85 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
