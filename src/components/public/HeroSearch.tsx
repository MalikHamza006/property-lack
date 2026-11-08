import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Coins, ArrowRight } from 'lucide-react';
import { PropertyPurpose, PropertyCategory } from '../../types/property';

export const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [category, setCategory] = useState<PropertyCategory | 'all'>('all');
  const [area, setArea] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (category !== 'all') params.set('category', category);
    if (area !== 'all') params.set('area', area);

    if (priceRange === 'under-1cr') {
      params.set('maxPrice', '10000000');
    } else if (priceRange === '1cr-3cr') {
      params.set('minPrice', '10000000');
      params.set('maxPrice', '30000000');
    } else if (priceRange === '3cr-6cr') {
      params.set('minPrice', '30000000');
      params.set('maxPrice', '60000000');
    } else if (priceRange === 'above-6cr') {
      params.set('minPrice', '60000000');
    }

    const targetRoute = purpose === 'rent' ? '/rent' : category === 'commercial' ? '/commercial' : '/buy';
    navigate(`${targetRoute}?${params.toString()}`);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-navy-950 shadow-sm">
      {/* Purpose Tabs - Clean Pills */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => { setPurpose('sale'); if (category === 'commercial') setCategory('all'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            purpose === 'sale' && category !== 'commercial'
              ? 'bg-navy-950 text-white'
              : 'text-slate-600 hover:text-navy-950'
          }`}
        >
          Buy
        </button>

        <button
          type="button"
          onClick={() => { setPurpose('rent'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            purpose === 'rent'
              ? 'bg-navy-950 text-white'
              : 'text-slate-600 hover:text-navy-950'
          }`}
        >
          Rent
        </button>

        <button
          type="button"
          onClick={() => { setCategory('commercial'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            category === 'commercial'
              ? 'bg-gold-500 text-navy-950'
              : 'text-slate-600 hover:text-navy-950'
          }`}
        >
          Commercial
        </button>

        <button
          type="button"
          onClick={() => { setPurpose('sale'); setCategory('plot'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            category === 'plot'
              ? 'bg-navy-950 text-white'
              : 'text-slate-600 hover:text-navy-950'
          }`}
        >
          Plots
        </button>
      </div>

      {/* Clean Input Controls */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-center">
        {/* Location Dropdown */}
        <div>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:border-gold-500 focus:outline-none"
          >
            <option value="all">📍 All Lahore Areas</option>
            <option value="DHA Phase 5">DHA Phase 5</option>
            <option value="DHA Phase 6">DHA Phase 6</option>
            <option value="DHA Phase 7">DHA Phase 7</option>
            <option value="DHA Phase 8">DHA Phase 8</option>
            <option value="Gulberg">Gulberg (II & III)</option>
            <option value="Bahria Town">Bahria Town</option>
            <option value="Johar Town">Johar Town</option>
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PropertyCategory | 'all')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:border-gold-500 focus:outline-none"
          >
            <option value="all">🏠 All Categories</option>
            <option value="house">Houses & Villas</option>
            <option value="plot">Plots & Land</option>
            <option value="commercial">Commercial Plazas & Shops</option>
            <option value="apartment">Apartments & Penthouses</option>
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:border-gold-500 focus:outline-none"
          >
            <option value="all">💰 Any Budget</option>
            <option value="under-1cr">Under 1 Crore (10M)</option>
            <option value="1cr-3cr">PKR 1 - 3 Crore</option>
            <option value="3cr-6cr">PKR 3 - 6 Crore</option>
            <option value="above-6cr">PKR 6+ Crore (Luxury)</option>
          </select>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </button>
        </div>
      </form>
    </div>
  );
};
