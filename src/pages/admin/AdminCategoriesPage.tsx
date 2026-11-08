import React, { useState } from 'react';
import { Layers, CheckCircle, Home, Building2, MapPin, Key, DollarSign, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { storageService, CategoryMeta } from '../../services/storage';
import { propertyService } from '../../services/propertyService';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryMeta[]>(storageService.getCategories());
  const [saved, setSaved] = useState(false);

  const stats = propertyService.getStats();

  const getCategoryCount = (slug: string) => {
    switch (slug) {
      case 'house':
        return stats.houses;
      case 'plot':
        return stats.plots;
      case 'commercial':
        return stats.commercial;
      case 'apartment':
        return stats.apartments;
      case 'rent':
        return stats.forRent;
      case 'sale':
        return stats.forSale;
      default:
        return 0;
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'house':
        return Home;
      case 'plot':
        return MapPin;
      case 'commercial':
        return Building2;
      case 'apartment':
        return Layers;
      case 'rent':
        return Key;
      case 'sale':
        return DollarSign;
      default:
        return Sparkles;
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    setCategories(updated);
    storageService.saveCategories(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout
      title="Property Categories Management"
      subtitle="Organize property classifications, taxonomy, and front-end navigation taxonomies."
    >
      <div className="space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Category configuration updated successfully.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            const count = getCategoryCount(cat.slug);

            return (
              <div
                key={cat.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-navy-950 font-serif font-bold text-xs">
                      {count} Listings
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy-950">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">Slug: /{cat.slug}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Status</span>
                  <button
                    onClick={() => handleToggleActive(cat.id)}
                    className={`px-3 py-1 rounded-full font-bold text-xs transition-colors ${
                      cat.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {cat.isActive ? 'Active in Navigation' : 'Hidden'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
