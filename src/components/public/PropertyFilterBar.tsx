import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { PropertyFilterOptions, PropertyCategory } from '../../types/property';

interface PropertyFilterBarProps {
  filters: PropertyFilterOptions;
  onChange: (updated: PropertyFilterOptions) => void;
  onReset: () => void;
  totalResults: number;
  showCategoryFilter?: boolean;
}

export const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  showCategoryFilter = true
}) => {
  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 space-y-3 mb-8">
      {/* Search & Main Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, DHA block..."
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>

        {/* Location selector */}
        <div>
          <select
            value={filters.area || 'all'}
            onChange={(e) => onChange({ ...filters, area: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
          >
            <option value="all">📍 All Locations</option>
            <option value="DHA Phase 5">DHA Phase 5</option>
            <option value="DHA Phase 6">DHA Phase 6</option>
            <option value="DHA Phase 7">DHA Phase 7</option>
            <option value="DHA Phase 8">DHA Phase 8</option>
            <option value="Gulberg">Gulberg (II & III)</option>
            <option value="Bahria Town">Bahria Town</option>
            <option value="Johar Town">Johar Town</option>
          </select>
        </div>

        {/* Category selector */}
        {showCategoryFilter && (
          <div>
            <select
              value={filters.category || 'all'}
              onChange={(e) => onChange({ ...filters, category: e.target.value as PropertyCategory | 'all' })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
            >
              <option value="all">🏠 All Categories</option>
              <option value="house">Houses & Designer Villas</option>
              <option value="plot">Plots (Residential & Commercial)</option>
              <option value="commercial">Commercial Buildings & Shops</option>
              <option value="apartment">Apartments & Penthouses</option>
            </select>
          </div>
        )}

        {/* Sort by */}
        <div>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
          >
            <option value="newest">Sort: Newest Listed</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="popular">Sort: Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Bedroom Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 font-medium">Beds:</span>
          <div className="flex items-center gap-1">
            {['any', 3, 4, 5, 6].map((num) => (
              <button
                key={String(num)}
                type="button"
                onClick={() => onChange({ ...filters, bedrooms: num as any })}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  (filters.bedrooms === num || (num === 'any' && (!filters.bedrooms || filters.bedrooms === 'any')))
                    ? 'bg-navy-950 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                {num === 'any' ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onReset}
            className="text-slate-400 hover:text-slate-700 transition-colors ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="text-slate-500">
          <span className="font-bold text-navy-950">{totalResults}</span> properties available
        </div>
      </div>
    </div>
  );
};
