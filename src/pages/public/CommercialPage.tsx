import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, ChevronRight, Home, DollarSign, Store, Briefcase } from 'lucide-react';
import { Property, PropertyFilterOptions } from '../../types/property';
import { SiteContent } from '../../types/cms';
import { PropertyCard } from '../../components/public/PropertyCard';
import { PropertyFilterBar } from '../../components/public/PropertyFilterBar';
import { InquiryModal } from '../../components/public/InquiryModal';

interface CommercialPageProps {
  properties: Property[];
  cms: SiteContent;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({ properties, cms }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [filters, setFilters] = useState<PropertyFilterOptions>({
    category: 'commercial',
    purpose: 'all',
    area: 'all',
    search: '',
    sortBy: 'newest'
  });

  const handleFilterChange = (updated: PropertyFilterOptions) => {
    setFilters(updated);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'commercial',
      purpose: 'all',
      area: 'all',
      search: '',
      sortBy: 'newest'
    });
  };

  const commercialProperties = useMemo(() => {
    return properties.filter((p) => {
      if (!p.published) return false;
      if (p.category !== 'commercial') return false;

      if (filters.purpose && filters.purpose !== 'all' && p.purpose !== filters.purpose) {
        return false;
      }

      if (filters.area && filters.area !== 'all') {
        if (!p.location.area.toLowerCase().includes(filters.area.toLowerCase())) {
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
          <span className="text-navy-950 font-bold">Commercial Real Estate</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200 inline-block mb-2">
            Institutional Assets & High-Yield Plazas
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
            Commercial Properties in Lahore
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Trophy commercial plazas on Main Boulevard Gulberg, high-footfall retail shops in DHA CCA, and Grade-A corporate office floors.
          </p>
        </div>
      </div>

      {/* Commercial Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-gold-50 text-gold-700 border border-gold-200 flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-navy-950">Projected 8-14% ROI</h4>
            <p className="text-xs text-slate-500 mt-0.5">Top-quartile commercial yields benchmarked against prevailing inflation.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-navy-50 text-navy-900 border border-navy-200 flex-shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-navy-950">Anchor Corporate Tenants</h4>
            <p className="text-xs text-slate-500 mt-0.5">Commercial lease agreements with national banks, clothing brands, and FMCGs.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-navy-950">Turnkey Property Management</h4>
            <p className="text-xs text-slate-500 mt-0.5">Full rent collection, maintenance oversight, and commercial dispute prevention.</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <PropertyFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={commercialProperties.length}
        showCategoryFilter={false}
      />

      {/* Listing Grid */}
      {commercialProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {commercialProperties.map((prop) => (
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
          <h3 className="font-serif text-xl font-bold text-navy-950">No Commercial Properties Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or contact our commercial division directly.
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
