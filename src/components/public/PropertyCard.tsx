import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, MessageCircle } from 'lucide-react';
import { Property } from '../../types/property';
import { getWhatsAppUrl } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
  whatsappNumber?: string;
  onQuickInquire?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  whatsappNumber = '923001234567' 
}) => {
  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `Assalam-o-Alaikum, I am inquiring about property ${property.code} - ${property.title} (${property.priceDisplay}) in ${property.location.area}. Please share details.`
  );

  const isRental = property.purpose === 'rent';

  return (
    <div className="group flex flex-col transition-all duration-300">
      {/* Clean Image Container */}
      <Link 
        to={`/property/${property.id}`}
        className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 mb-3 block"
      >
        <img
          src={property.featuredImage || property.images[0] || 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Minimal Purpose Tag */}
        <div className="absolute top-3 left-3">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
            isRental 
              ? 'bg-navy-950 text-white' 
              : 'bg-gold-500 text-navy-950 font-extrabold'
          }`}>
            {isRental ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* Property Code */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-white">
            {property.code}
          </span>
        </div>

        {property.status === 'sold' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Card Info - Clean, Minimalist, No Heavy Borders */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Category */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
              {property.priceDisplay}
            </span>
            <span className="text-xs text-slate-400 font-medium truncate">
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <Link 
            to={`/property/${property.id}`}
            className="block font-semibold text-sm text-slate-800 hover:text-gold-700 transition-colors line-clamp-1 mt-1"
          >
            {property.title}
          </Link>

          {/* Location */}
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
            <span className="truncate">{property.location.area}, {property.location.city}</span>
          </p>
        </div>

        {/* Specs and Prominent Larger WhatsApp Button */}
        <div className="pt-2 flex items-center justify-between gap-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            {property.specs.bedrooms !== undefined && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                {property.specs.bedrooms}
              </span>
            )}
            {property.specs.bathrooms !== undefined && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                {property.specs.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-slate-400" />
              {property.specs.area} {property.specs.areaUnit}
            </span>
          </div>

          {/* Prominent Large WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
