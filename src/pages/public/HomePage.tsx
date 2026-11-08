import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Home, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  TrendingUp, 
  Users,
  ChevronRight
} from 'lucide-react';
import { Property } from '../../types/property';
import { SiteContent } from '../../types/cms';
import { HeroSearch } from '../../components/public/HeroSearch';
import { PropertyCard } from '../../components/public/PropertyCard';
import { InquiryModal } from '../../components/public/InquiryModal';
import { getWhatsAppUrl } from '../../utils/formatters';

interface HomePageProps {
  properties: Property[];
  cms: SiteContent;
  onOpenSubmitProperty: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  properties, 
  cms,
  onOpenSubmitProperty
}) => {
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState<Property | null>(null);
  const [featuredTab, setFeaturedTab] = useState<'all' | 'sale' | 'rent' | 'commercial'>('all');

  // Filter properties cleanly
  const displayedProperties = properties.filter(p => {
    if (!p.published) return false;
    if (featuredTab === 'all') return true;
    if (featuredTab === 'sale') return p.purpose === 'sale' && p.category !== 'commercial';
    if (featuredTab === 'rent') return p.purpose === 'rent';
    if (featuredTab === 'commercial') return p.category === 'commercial';
    return true;
  }).slice(0, 6);

  const whatsappConsultUrl = getWhatsAppUrl(
    cms.company.whatsapp,
    'Assalam-o-Alaikum, I am interested in property consultation in Lahore.'
  );

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-hidden bg-white">
      {/* 1. HERO SECTION (CLEAN & SPACIOUS WITHOUT SEARCH BAR) */}
      <section className="relative min-h-[500px] lg:min-h-[560px] flex items-center justify-center py-20 sm:py-28 px-4 sm:px-8">
        {/* Full Background Real Estate Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architecture in Lahore"
            className="w-full h-full object-cover"
          />
          {/* Smooth contrast dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/65 to-navy-950/80" />
        </div>

        {/* Hero Content - Crisp Typography */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-6">
          {/* DHA / LDA Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 text-gold-300 text-xs font-semibold tracking-wider uppercase border border-gold-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>DHA & LDA Authorized Partners • Lahore</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            Find Your Ideal Luxury Home & High-Yield Property in{' '}
            <span className="text-gold-400 underline decoration-gold-400/50 decoration-wavy">
              Lahore
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Bespoke real estate consultancy specializing in luxury designer houses, commercial plazas, and prime plots across DHA Lahore, Gulberg, and Bahria Town.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#search-properties"
              className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              Search Properties
            </a>

            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 pt-6 text-xs text-slate-200 font-medium">
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-white block">15+ Years</span>
              <span className="text-slate-300">Market Experience</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-gold-300 block">PKR 14.8B+</span>
              <span className="text-slate-300">Deals Facilitated</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-white block">100%</span>
              <span className="text-slate-300">Verified Titles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES (WITH SEARCH BAR DIRECTLY ABOVE IT) */}
      <section id="featured-properties" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 pt-2">
        {/* Search Bar directly above Featured Properties */}
        <div id="search-properties" className="scroll-mt-24">
          <HeroSearch />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified luxury homes, corporate assets, and prime plots.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setFeaturedTab('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                featuredTab === 'all' ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFeaturedTab('sale')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                featuredTab === 'sale' ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setFeaturedTab('rent')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                featuredTab === 'rent' ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => setFeaturedTab('commercial')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                featuredTab === 'commercial' ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Property Grid (Clean minimal cards with larger WhatsApp action) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              whatsappNumber={cms.company.whatsapp}
              onQuickInquire={(p) => setSelectedPropertyForInquiry(p)}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/buy"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs tracking-wide transition-all shadow-sm"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE AM PROPERTY (MINIMALIST 3 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center font-bold mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950">Verified DHA & LDA Titles</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every single listing is legally vetted with official NDC certificates and registry clearances before showcase.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-950 flex items-center justify-center font-bold mx-auto sm:mx-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950">Transparent Market Pricing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero artificial broker markups. Direct sit-down meetings between buyer and seller with fair commission terms.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mx-auto sm:mx-0">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950">Overseas Pakistani Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Remote property tours, Power of Attorney facilitation, and secure Roshan Digital Account transfers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRIME LAHORE LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
            Prime Hubs
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Lahore Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'DHA Phase 5 & 6',
              tag: 'Gold Standard Living',
              img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
              link: '/buy?area=DHA+Phase+6'
            },
            {
              name: 'Gulberg III & MM Alam',
              tag: 'Commercial & Penthouses',
              img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
              link: '/commercial'
            },
            {
              name: 'DHA Phase 7 & 8',
              tag: 'Prime Plots & Land',
              img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
              link: '/buy?category=plot'
            },
            {
              name: 'Bahria Town Lahore',
              tag: 'Gated Family Living',
              img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
              link: '/buy?area=Bahria+Town'
            }
          ].map((loc, i) => (
            <Link
              key={i}
              to={loc.link}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 block"
            >
              <img
                src={loc.img}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-gold-400">{loc.tag}</span>
                <h4 className="font-serif text-base font-bold group-hover:text-gold-300 transition-colors">
                  {loc.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. DIRECT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-navy-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block">
              Direct Contact
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Looking to Buy, Sell or Lease in Lahore?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Connect directly with our senior consultant on WhatsApp or visit our DHA Phase 5 office.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={onOpenSubmitProperty}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs transition-all shadow-md"
            >
              <Building2 className="w-4 h-4" />
              <span>List Your Property</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Modal */}
      <InquiryModal
        isOpen={selectedPropertyForInquiry !== null}
        onClose={() => setSelectedPropertyForInquiry(null)}
        property={selectedPropertyForInquiry}
        whatsappNumber={cms.company.whatsapp}
      />
    </div>
  );
};
