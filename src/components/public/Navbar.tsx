import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { SiteContent } from '../../types/cms';
import { getWhatsAppUrl } from '../../utils/formatters';

interface NavbarProps {
  cms: SiteContent;
  onOpenSubmitProperty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cms, onOpenSubmitProperty }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Buy', path: '/buy' },
    { label: 'Rent', path: '/rent' },
    { label: 'Commercial', path: '/commercial' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const whatsappLink = getWhatsAppUrl(
    cms.company.whatsapp,
    'Assalam-o-Alaikum, I am inquiring from the AM Property & Consultancy website.'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all">
      {/* Sleek Top Banner */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              DHA & LDA Authorized • Lahore
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a 
              href={`tel:${cms.company.phone}`}
              className="hidden sm:inline hover:text-white transition-colors text-[11px]"
            >
              {cms.company.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium text-[11px]"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>

            <span className="text-navy-800">•</span>

            {/* Admin Access Pill */}
            <Link
              to="/admin"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 transition-all font-semibold text-[10px]"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar - Clean and Borderless */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-navy-950 block leading-tight">
              AM Property
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
              & Consultancy • Lahore
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'text-navy-950 bg-slate-100 font-bold'
                    : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenSubmitProperty}
            className="text-xs font-bold px-3.5 py-1.5 rounded-full text-slate-700 hover:text-navy-950 hover:bg-slate-100 transition-colors"
          >
            List Property
          </button>

          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-navy-950 hover:bg-navy-900 transition-colors shadow-sm"
          >
            Contact Agent
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSubmitProperty(); }}
              className="w-full py-2 rounded-lg bg-gold-50 text-gold-900 text-xs font-bold text-center"
            >
              List Your Property
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-lg bg-navy-950 text-white text-xs font-bold text-center"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
