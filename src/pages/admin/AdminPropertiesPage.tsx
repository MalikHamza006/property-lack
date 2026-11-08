import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  MapPin,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PropertyFormModal } from '../../components/admin/PropertyFormModal';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { propertyService } from '../../services/propertyService';
import { Property, PropertyCategory, PropertyPurpose, PropertyStatus } from '../../types/property';
import { formatPKR } from '../../utils/formatters';

export const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(propertyService.getAll());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const refreshList = () => {
    setProperties(propertyService.getAll());
  };

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Property) => {
    setEditingProperty(p);
    setModalOpen(true);
  };

  const handleSubmitModal = (data: any) => {
    if (editingProperty) {
      propertyService.update(editingProperty.id, data);
    } else {
      propertyService.create(data);
    }
    setModalOpen(false);
    refreshList();
  };

  const handleRequestDelete = (p: Property) => {
    setPropertyToDelete(p);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (propertyToDelete) {
      propertyService.delete(propertyToDelete.id);
      setDeleteConfirmOpen(false);
      setPropertyToDelete(null);
      refreshList();
    }
  };

  const handleTogglePublish = (p: Property) => {
    propertyService.togglePublish(p.id);
    refreshList();
  };

  const handleToggleFeatured = (p: Property) => {
    propertyService.toggleFeatured(p.id);
    refreshList();
  };

  const handleStatusChange = (p: Property, newStatus: PropertyStatus) => {
    propertyService.updateStatus(p.id, newStatus);
    refreshList();
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (purposeFilter !== 'all' && p.purpose !== purposeFilter) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesArea = p.location.area.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesArea) return false;
      }

      return true;
    });
  }, [properties, search, categoryFilter, purposeFilter, statusFilter]);

  return (
    <AdminLayout
      title="Property Inventory & Listings Management"
      subtitle="Full CRUD management of luxury houses, plots, commercial plazas, and rentals."
    >
      <div className="space-y-6">
        {/* Top Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, DHA block, code (e.g. AM-101)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-gold-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="house">Houses & Villas</option>
              <option value="plot">Plots</option>
              <option value="commercial">Commercial</option>
              <option value="apartment">Apartments</option>
            </select>

            {/* Purpose Filter */}
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-gold-500 focus:outline-none"
            >
              <option value="all">All Purposes</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Purpose & Type</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Price (PKR)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-center">Featured</th>
                  <th className="p-3.5 text-center">Publish</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.featuredImage || property.images[0]}
                          alt={property.title}
                          className="w-14 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                        />
                        <div className="max-w-xs">
                          <span className="font-mono text-[10px] font-bold text-gold-700 block">
                            {property.code}
                          </span>
                          <span className="font-bold text-navy-950 line-clamp-1 block" title={property.title}>
                            {property.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {property.specs.area} {property.specs.areaUnit} • {property.specs.bedrooms ? `${property.specs.bedrooms} Beds` : property.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Purpose & Type */}
                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        property.purpose === 'rent'
                          ? 'bg-navy-100 text-navy-900'
                          : 'bg-gold-100 text-gold-800'
                      }`}>
                        {property.purpose === 'rent' ? 'Rent' : 'Sale'}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{property.propertyType}</p>
                    </td>

                    {/* Location */}
                    <td className="p-3.5 text-slate-600">
                      <span className="font-semibold text-navy-900 block">{property.location.area}</span>
                      <span className="text-[10px] text-slate-400 truncate block max-w-[150px]">
                        {property.location.sectorOrBlock || property.location.city}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5">
                      <span className="font-serif font-bold text-navy-950 block">
                        {property.priceDisplay}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-3.5">
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusChange(property, e.target.value as PropertyStatus)}
                        className={`text-xs font-bold rounded-lg border px-2 py-1 cursor-pointer focus:outline-none ${
                          property.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : property.status === 'sold'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : property.status === 'rented'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                        <option value="draft">Draft</option>
                      </select>
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleToggleFeatured(property)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          property.isFeatured
                            ? 'bg-gold-50 text-gold-600 hover:bg-gold-100'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={property.isFeatured ? 'Featured on Homepage' : 'Mark as Featured'}
                      >
                        <Sparkles className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Published Toggle */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleTogglePublish(property)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          property.published
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title={property.published ? 'Live on Website' : 'Unpublished (Hidden)'}
                      >
                        {property.published ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/property/${property.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                          title="View on Live Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(property)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                          title="Edit Property"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleRequestDelete(property)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No properties found matching current filters.
            </div>
          )}

          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Showing {filtered.length} of {properties.length} total properties</span>
            <span className="font-semibold text-navy-950">Changes save automatically to localStorage</span>
          </div>
        </div>
      </div>

      {/* Property Form Modal */}
      <PropertyFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
        initialData={editingProperty}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Property Listing?"
        message={`Are you sure you want to delete "${propertyToDelete?.title}" (${propertyToDelete?.code})? This action will remove it from the public website and local storage.`}
        confirmLabel="Yes, Delete Property"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </AdminLayout>
  );
};
