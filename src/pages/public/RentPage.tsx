import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Key, ChevronRight, Home, Shield, Zap, Sparkles } from 'lucide-react';
import { Property, PropertyFilterOptions } from '../../types/property';
import { SiteContent } from '../../types/cms';
import { PropertyCard } from '../../components/public/PropertyCard';
import { PropertyFilterBar } from '../../components/public/PropertyFilterBar';
import { InquiryModal } from '../../components/public/InquiryModal';

interface RentPageProps {
  properties: Property[];
  cms: SiteContent;
}

export const RentPage: React.FC<RentPageProps> = ({ properties, cms }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [filters, setFilters] = useState<PropertyFilterOptions>({
    purpose: 'rent',
    category: 'all',
    area: 'all',
    bedrooms: 'any',
    search: '',
    sortBy: 'newest'
  });

  const handleFilterChange = (updated: PropertyFilterOptions) => {
    setFilters(updated);
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'rent',
      category: 'all',
      area: 'all',
      bedrooms: 'any',
      search: '',
      sortBy: 'newest'
    });
  };

  const rentalProperties = useMemo(() => {
    return properties.filter((p) => {
      if (!p.published) return false;
      if (p.purpose !== 'rent') return false;

      if (filters.category && filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      if (filters.area && filters.area !== 'all') {
        if (!p.location.area.toLowerCase().includes(filters.area.toLowerCase())) {
          return false;
        }
      }

      if (filters.bedrooms && filters.bedrooms !== 'any') {
        const minBeds = Number(filters.bedrooms);
        if (!p.specs.bedrooms || p.specs.bedrooms < minBeds) {
          return false;
        }
      }

      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesArea = p.location.area.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesArea) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-navy-950 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-950 font-bold">Executive Rentals</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-navy-900 bg-navy-100 px-3 py-1 rounded-full border border-navy-200 inline-block mb-2">
            Turnkey Residential & Commercial Leasing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
            Properties for Rent in Lahore
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Fully furnished luxury homes, serviced penthouses, and corporate floors in DHA Phase 5, Phase 6, and Gulberg III.
          </p>
        </div>
      </div>

      {/* Perks Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Legally Vetted Standard Tenancy Contracts</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>Standby Backup Power & Dedicated Generators</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-gold-600 flex-shrink-0" />
          <span>Expat & Diplomat Ready High-Spec Standards</span>
        </div>
      </div>

      {/* Filter Bar */}
      <PropertyFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={rentalProperties.length}
        showCategoryFilter={true}
      />

      {/* Listing Grid */}
      {rentalProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rentalProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              whatsappNumber={cms.company.whatsapp}
              onQuickInquire={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-navy-950">No Rentals Matching Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your area or bedroom requirements to view available leasing residences.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-navy-950 text-white font-semibold text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={selectedProperty !== null}
        onClose={() => setSelectedProperty(null)}
        property={selectedProperty}
        whatsappNumber={cms.company.whatsapp}
      />
    </div>
  );
};
