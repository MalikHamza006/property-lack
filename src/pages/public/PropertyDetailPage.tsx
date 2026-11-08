import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Home, 
  ArrowLeft,
  ShieldCheck,
  Compass,
  Car,
  Layers,
  Eye,
  X
} from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { SiteContent } from '../../types/cms';
import { PropertyCard } from '../../components/public/PropertyCard';
import { InquiryModal } from '../../components/public/InquiryModal';
import { getWhatsAppUrl, formatDate } from '../../utils/formatters';

interface PropertyDetailPageProps {
  cms: SiteContent;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ cms }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const property = id ? propertyService.getById(id) : undefined;

  useEffect(() => {
    if (property) {
      propertyService.incrementViews(property.id);
      window.scrollTo(0, 0);
    }
  }, [id, property?.id]);

  if (!property) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4 space-y-4">
        <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-navy-950">Property Not Found</h2>
        <p className="text-sm text-slate-500">
          The property listing you are searching for might have been sold, removed, or is temporarily unavailable.
        </p>
        <Link
          to="/buy"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 text-white font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Verified Listings</span>
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.featuredImage];

  const similarProperties = propertyService.getSimilar(property, 3);

  const whatsappInquiryUrl = getWhatsAppUrl(
    cms.company.whatsapp,
    `Assalam-o-Alaikum, I am inquiring about property ${property.code} - ${property.title} (${property.priceDisplay}) located in ${property.location.area}. Please share complete details.`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Explore this verified property in ${property.location.area}, Lahore: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-navy-950 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={property.purpose === 'rent' ? '/rent' : '/buy'} className="hover:text-navy-950">
          {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-navy-950 font-bold truncate max-w-xs">{property.location.area}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400 font-mono">{property.code}</span>
      </nav>

      {/* Main Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm ${
              property.purpose === 'rent'
                ? 'bg-navy-950 text-white'
                : 'bg-gold-500 text-navy-950 font-extrabold'
            }`}>
              {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
            </span>

            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 text-navy-900 border border-slate-200">
              ID: {property.code}
            </span>

            {property.isFeatured && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-gold-50 text-gold-800 border border-gold-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Featured Exclusive
              </span>
            )}

            <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto lg:ml-0">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.viewsCount} Views</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-950 leading-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <span>{property.location.address}</span>
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 bg-slate-50 lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-none border-slate-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block lg:text-right">
              Asking Price (PKR)
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 block">
              {property.priceDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-300 hover:border-gold-500 text-slate-700 hover:text-navy-950 transition-colors bg-white shadow-sm flex items-center gap-1.5 text-xs font-semibold"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery Showcase */}
      <section className="space-y-4">
        {/* Main Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-luxury border border-slate-200 bg-slate-900 group">
          <img
            src={images[activeImageIndex]}
            alt={`${property.title} - Photo ${activeImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-navy-950/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 hover:bg-navy-950 transition-colors flex items-center gap-2 shadow-lg"
          >
            <span>View All {images.length} Photos</span>
          </button>
        </div>

        {/* Thumbnail Carousel Bar */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 sm:w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx 
                    ? 'border-gold-500 shadow-md scale-102 ring-2 ring-gold-400/30' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Grid Layout: Main Details + Sticky Agent Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Specs, Description, Amenities, Map (2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Specifications Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-navy-950 mb-4 pb-2 border-b border-slate-100">
              Overview & Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                  <Maximize className="w-4 h-4 text-gold-600" /> Area
                </span>
                <p className="font-bold text-navy-950 text-base">
                  {property.specs.area} {property.specs.areaUnit}
                </p>
              </div>

              {property.specs.bedrooms !== undefined && (
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <Bed className="w-4 h-4 text-gold-600" /> Bedrooms
                  </span>
                  <p className="font-bold text-navy-950 text-base">
                    {property.specs.bedrooms} Suites
                  </p>
                </div>
              )}

              {property.specs.bathrooms !== undefined && (
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <Bath className="w-4 h-4 text-gold-600" /> Bathrooms
                  </span>
                  <p className="font-bold text-navy-950 text-base">
                    {property.specs.bathrooms} Baths
                  </p>
                </div>
              )}

              {property.specs.coveredArea && (
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <Layers className="w-4 h-4 text-gold-600" /> Covered Area
                  </span>
                  <p className="font-bold text-navy-950 text-base">
                    {property.specs.coveredArea}
                  </p>
                </div>
              )}

              {property.specs.parkingSpaces !== undefined && (
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <Car className="w-4 h-4 text-gold-600" /> Car Parking
                  </span>
                  <p className="font-bold text-navy-950 text-base">
                    {property.specs.parkingSpaces} Bays
                  </p>
                </div>
              )}

              {property.specs.builtYear && (
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <Calendar className="w-4 h-4 text-gold-600" /> Construction Year
                  </span>
                  <p className="font-bold text-navy-950 text-base">
                    {property.specs.builtYear}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Legal Verification
                </span>
                <p className="font-bold text-emerald-700 text-sm">
                  100% DHA/LDA Clear
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                  <Compass className="w-4 h-4 text-gold-600" /> Property Code
                </span>
                <p className="font-mono font-bold text-navy-950 text-base">
                  {property.code}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-navy-950 pb-2 border-b border-slate-100">
              Property Description & Architectural Highlights
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities Checklist */}
          {property.features && property.features.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-navy-950 pb-2 border-b border-slate-100">
                Features & Premium Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Location Pin / Map Placeholder */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-serif text-xl font-bold text-navy-950">
                Location & Accessibility
              </h3>
              <span className="text-xs text-gold-700 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {property.location.area}, Lahore
              </span>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              {/* Map Illustration / Visual */}
              <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

              <div className="relative text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-serif text-base font-bold text-navy-950">{property.location.address}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Prime location in {property.location.area}. 5 minutes from Ring Road interchange and commercial market.
                </p>
                <div className="pt-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${property.location.address}, Lahore, Pakistan`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 hover:text-gold-700 underline"
                  >
                    <span>Open in Google Maps</span>
                    <Compass className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Consultant / Inquiry Card (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-luxury sticky top-28 space-y-6">
            {/* Consultant Profile */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                alt="Principal Consultant"
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shadow-sm"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700 block">
                  Assigned Consultant
                </span>
                <h4 className="font-serif text-base font-bold text-navy-950">Abdul Malik Khan</h4>
                <p className="text-xs text-slate-500">Principal Partner • DHA Specialist</p>
              </div>
            </div>

            {/* Quick Price Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Offered Price
              </span>
              <span className="font-serif text-2xl font-bold text-navy-950">
                {property.priceDisplay}
              </span>
            </div>

            {/* Call to Actions */}
            <div className="space-y-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Schedule Private Viewing</span>
              </button>

              <a
                href={`tel:${cms.company.phone}`}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-navy-950 text-navy-900 font-semibold text-xs flex items-center justify-center gap-2 transition-colors bg-white"
              >
                <Phone className="w-4 h-4 text-gold-600" />
                <span>Call Hotline: {cms.company.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Official DHA & LDA Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Zero Hidden Fees or Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Immediate Viewing Appointments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block mb-1">
                You May Also Like
              </span>
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Similar Properties in Lahore
              </h2>
            </div>
            <Link
              to={property.purpose === 'rent' ? '/rent' : '/buy'}
              className="text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center gap-1"
            >
              <span>View More</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {similarProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                whatsappNumber={cms.company.whatsapp}
              />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-3 px-2">
            <span className="font-serif text-sm">
              {property.title} — {activeImageIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src={images[activeImageIndex]}
              alt={`Full size ${activeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>

          {/* Lightbox thumbnail row */}
          <div className="flex items-center justify-center gap-2 pt-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-gold-500 scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={property}
        whatsappNumber={cms.company.whatsapp}
      />
    </div>
  );
};
