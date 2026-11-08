import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  TrendingUp, 
  Key, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { SiteContent } from '../../types/cms';
import { InquiryModal } from '../../components/public/InquiryModal';

interface ServicesPageProps {
  cms: SiteContent;
  onOpenSubmitProperty: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ cms, onOpenSubmitProperty }) => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-navy-950 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-950 font-bold">Our Services</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700 block mb-1">
            Real Estate Expertise
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
            Consultancy Services Tailored for Growth & Security
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            From verified title acquisitions in DHA Lahore to institutional commercial plaza leasing and remote overseas Pakistani portfolio management.
          </p>
        </div>
      </div>

      {/* Services Detailed Cards - Clean, Borderless, No Harsh Shadows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cms.services.map((service, index) => (
          <div
            key={service.id}
            className="flex flex-col justify-between space-y-5 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-navy-950 text-navy-950 group-hover:text-gold-400 flex items-center justify-center transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">0{index + 1}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">{service.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{service.description}</p>

              <div className="space-y-2 pt-2">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Inquire for {service.title}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow / 4-Step Process Section - Clean Minimal Layout */}
      <div className="pt-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">The AM Methodology</span>
          <h3 className="font-serif text-2xl font-bold text-navy-950">How We Protect & Grow Your Capital</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-800 font-bold flex items-center justify-center text-sm">1</span>
            <h4 className="font-serif text-base font-bold text-navy-950">Consultation & Need Audit</h4>
            <p className="text-xs text-slate-500 leading-relaxed">We analyze your timeline, budget, expected yield, and tax/banking structure.</p>
          </div>

          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-800 font-bold flex items-center justify-center text-sm">2</span>
            <h4 className="font-serif text-base font-bold text-navy-950">Strict Legal Due Diligence</h4>
            <p className="text-xs text-slate-500 leading-relaxed">DHA & LDA title search, NDC verification, non-encumbrance certificates.</p>
          </div>

          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-800 font-bold flex items-center justify-center text-sm">3</span>
            <h4 className="font-serif text-base font-bold text-navy-950">Direct Owner Negotiation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Zero artificial price markups or middlemen. Transparent commission structure.</p>
          </div>

          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-800 font-bold flex items-center justify-center text-sm">4</span>
            <h4 className="font-serif text-base font-bold text-navy-950">Official Transfer & Handover</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Full on-ground support at DHA Transfer Office until original file and keys are delivered.</p>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        whatsappNumber={cms.company.whatsapp}
      />
    </div>
  );
};
