import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Dark Capsule Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[900px] px-4">
        <div
          className={`flex items-center justify-between h-[56px] px-2 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-[#1a1a1a]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.08]'
              : 'bg-[#1a1a1a]/60 backdrop-blur-md border border-white/[0.06]'
          }`}
        >
          {/* Left Branding */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-body text-[15px] font-bold text-white tracking-tight pl-5 pr-4 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            Misbahullah
          </a>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-body text-[13px] font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right CTA Button - Desktop */}
          <a
            href="/cv-misbahullah.pdf"
            download
            className="hidden lg:inline-flex items-center font-body text-[12px] font-semibold text-white/90 border border-white/20 rounded-full px-5 py-2 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 flex-shrink-0 mr-1 tracking-wide uppercase"
          >
            Download CV
          </a>

          {/* Mobile: Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/70 p-3 pr-4"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[45] bg-[#1a1a1a]/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 relative">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-white/60 p-2 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-body text-xl font-bold text-white mb-4"
          >
            Misbahullah
          </a>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-lg font-normal text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/cv-misbahullah.pdf"
            download
            className="mt-6 font-body text-sm font-semibold text-white border border-white/25 rounded-full px-8 py-3 hover:bg-white/10 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
