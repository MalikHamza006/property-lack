import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building2, Sparkles, ChevronRight, Home } from 'lucide-react';
import { Property, PropertyFilterOptions } from '../../types/property';
import { SiteContent } from '../../types/cms';
import { PropertyCard } from '../../components/public/PropertyCard';
import { PropertyFilterBar } from '../../components/public/PropertyFilterBar';
import { InquiryModal } from '../../components/public/InquiryModal';

interface BuyPageProps {
  properties: Property[];
  cms: SiteContent;
}

export const BuyPage: React.FC<BuyPageProps> = ({ properties, cms }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Initialize filters from searchParams or defaults
  const [filters, setFilters] = useState<PropertyFilterOptions>({
    purpose: 'sale',
    category: (searchParams.get('category') as any) || 'all',
    area: searchParams.get('area') || 'all',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : 'any',
    search: searchParams.get('search') || '',
    sortBy: (searchParams.get('sortBy') as any) || 'newest'
  });

  const handleFilterChange = (updated: PropertyFilterOptions) => {
    setFilters(updated);
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'sale',
      category: 'all',
      area: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: 'any',
      search: '',
      sortBy: 'newest'
    });
    setSearchParams({});
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (!p.published) return false;
      if (p.purpose !== 'sale') return false;

      if (filters.category && filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      if (filters.area && filters.area !== 'all') {
        if (!p.location.area.toLowerCase().includes(filters.area.toLowerCase())) {
          return false;
        }
      }

      if (filters.minPrice !== undefined && p.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && p.price > filters.maxPrice) {
        return false;
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
        const matchesType = p.propertyType.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesArea && !matchesType) {
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
          <span className="text-navy-950 font-bold">Properties for Sale</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200 inline-block mb-2">
            Buy Verified Real Estate
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
            Properties for Sale in Lahore
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Browse audited luxury designer houses, residential plots, and commercial assets across DHA Lahore, Bahria Town, and Gulberg.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <PropertyFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredProperties.length}
        showCategoryFilter={true}
      />

      {/* Listing Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((prop) => (
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
          <h3 className="font-serif text-xl font-bold text-navy-950">No Properties Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No properties match your current filter selections. Try clearing some filters or searching for another area.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-navy-950 text-white font-semibold text-xs transition-colors"
          >
            Reset All Filters
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
