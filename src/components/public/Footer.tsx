import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, MessageCircle, Lock } from 'lucide-react';
import { SiteContent } from '../../types/cms';
import { getWhatsAppUrl } from '../../utils/formatters';

interface FooterProps {
  cms: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ cms }) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(
    cms.company.whatsapp,
    'Assalam-o-Alaikum, I would like to consult with an AM Property agent.'
  );

  return (
    <footer className="bg-navy-950 text-slate-400 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-gold-400">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-white">AM Property</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              DHA & LDA authorized real estate consultancy in Lahore. Transparent title verifications and high-yield investments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-white font-bold text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/buy" className="hover:text-white transition-colors">Properties for Sale</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Executive Rentals</Link></li>
              <li><Link to="/commercial" className="hover:text-white transition-colors">Commercial Plazas & Shops</Link></li>
              <li><Link to="/buy?category=plot" className="hover:text-white transition-colors">DHA & Bahria Plots</Link></li>
            </ul>
          </div>

          {/* Areas */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-white font-bold text-sm mb-3">Lahore Areas</h4>
            <ul className="space-y-2">
              <li><Link to="/buy?area=DHA+Phase+6" className="hover:text-white transition-colors">DHA Phase 5 & 6</Link></li>
              <li><Link to="/commercial" className="hover:text-white transition-colors">Gulberg III & MM Alam</Link></li>
              <li><Link to="/buy?area=Bahria+Town" className="hover:text-white transition-colors">Bahria Town Lahore</Link></li>
              <li><Link to="/buy?area=DHA+Phase+7" className="hover:text-white transition-colors">DHA Phase 7 & 8</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-serif text-white font-bold text-sm mb-3">Lahore Office</h4>
            <p className="text-slate-400 flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{cms.company.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <a href={`tel:${cms.company.phone}`} className="hover:text-white">{cms.company.phoneDisplay}</a>
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {currentYear} {cms.company.name}. Registered Real Estate Consultancy.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gold-400 hover:text-gold-300 flex items-center gap-1 font-semibold">
              <Lock className="w-3 h-3" />
              <span>Admin CMS Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
