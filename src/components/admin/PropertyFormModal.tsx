import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Building, MapPin, DollarSign, Layers } from 'lucide-react';
import { Property, PropertyCategory, PropertyPurpose, PropertyStatus } from '../../types/property';
import { formatPKR } from '../../utils/formatters';

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Property | null;
}

const COMMON_LAHORE_AREAS = [
  'DHA Phase 5',
  'DHA Phase 6',
  'DHA Phase 7',
  'DHA Phase 8',
  'DHA Phase 9 Prism',
  'Gulberg II',
  'Gulberg III',
  'Bahria Town',
  'Johar Town',
  'Model Town',
  'Lake City',
  'New Lahore City'
];

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [category, setCategory] = useState<PropertyCategory>('house');
  const [propertyType, setPropertyType] = useState('1 Kanal Modern Villa');
  const [price, setPrice] = useState<number>(45000000);
  
  // Location
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('DHA Phase 6');
  const [sectorOrBlock, setSectorOrBlock] = useState('Sector J');
  const [address, setAddress] = useState('');

  // Specs
  const [bedrooms, setBedrooms] = useState<number | ''>(5);
  const [bathrooms, setBathrooms] = useState<number | ''>(6);
  const [areaNum, setAreaNum] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'Marla' | 'Kanal' | 'Sq. Ft.'>('Kanal');
  const [coveredArea, setCoveredArea] = useState('5,400 sq ft');
  const [parkingSpaces, setParkingSpaces] = useState<number | ''>(3);
  const [builtYear, setBuiltYear] = useState<number | ''>(2025);

  // Content
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  // Images
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Status & Toggles
  const [status, setStatus] = useState<PropertyStatus>('active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCode(initialData.code);
      setPurpose(initialData.purpose);
      setCategory(initialData.category);
      setPropertyType(initialData.propertyType);
      setPrice(initialData.price);
      setCity(initialData.location.city || 'Lahore');
      setArea(initialData.location.area || 'DHA Phase 6');
      setSectorOrBlock(initialData.location.sectorOrBlock || '');
      setAddress(initialData.location.address || '');
      setBedrooms(initialData.specs.bedrooms ?? '');
      setBathrooms(initialData.specs.bathrooms ?? '');
      setAreaNum(initialData.specs.area);
      setAreaUnit(initialData.specs.areaUnit as any);
      setCoveredArea(initialData.specs.coveredArea || '');
      setParkingSpaces(initialData.specs.parkingSpaces ?? '');
      setBuiltYear(initialData.specs.builtYear ?? '');
      setDescription(initialData.description);
      setFeatures(initialData.features || []);
      setImages(initialData.images || [initialData.featuredImage]);
      setStatus(initialData.status);
      setIsFeatured(initialData.isFeatured);
      setPublished(initialData.published);
    } else {
      // Default new form state
      setTitle('');
      setCode(`AM-${Math.floor(100 + Math.random() * 900)}`);
      setPurpose('sale');
      setCategory('house');
      setPropertyType('1 Kanal Modern Villa');
      setPrice(65000000);
      setCity('Lahore');
      setArea('DHA Phase 6');
      setSectorOrBlock('Sector C');
      setAddress('Main Boulevard Proximity, DHA Phase 6, Lahore');
      setBedrooms(5);
      setBathrooms(6);
      setAreaNum(1);
      setAreaUnit('Kanal');
      setCoveredArea('5,200 sq ft');
      setParkingSpaces(3);
      setBuiltYear(2025);
      setDescription('Brand new luxury residence constructed with imported high-end materials, designer kitchen, ensuite master baths, and manicured lawn.');
      setFeatures(['Designer Kitchen', 'Italian Tile Flooring', 'Solar 10kW System', 'Servant Quarter', 'CCTV Security']);
      setImages([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ]);
      setStatus('active');
      setIsFeatured(true);
      setPublished(true);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    if (!features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
    }
    setNewFeature('');
  };

  const handleRemoveFeature = (f: string) => {
    setFeatures(features.filter(item => item !== f));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages([...images, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const formattedData = {
      title: title.trim(),
      code: code.trim() || `AM-${Math.floor(100 + Math.random() * 900)}`,
      purpose,
      category,
      propertyType: propertyType.trim(),
      price: Number(price),
      location: {
        city: city.trim(),
        area: area.trim(),
        sectorOrBlock: sectorOrBlock.trim(),
        address: address.trim() || `${area}, ${city}`
      },
      specs: {
        bedrooms: bedrooms === '' ? undefined : Number(bedrooms),
        bathrooms: bathrooms === '' ? undefined : Number(bathrooms),
        area: Number(areaNum),
        areaUnit,
        coveredArea: coveredArea.trim(),
        parkingSpaces: parkingSpaces === '' ? undefined : Number(parkingSpaces),
        builtYear: builtYear === '' ? undefined : Number(builtYear)
      },
      description: description.trim(),
      features,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      featuredImage: images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      status,
      isFeatured,
      published
    };

    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-navy-950 text-white p-5 flex items-center justify-between border-b border-navy-800 flex-shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-0.5">
              Property Management CMS
            </span>
            <h3 className="font-serif text-lg font-bold">
              {initialData ? `Edit Property: ${initialData.code}` : 'Add New Property Listing'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-navy-950">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-gold-600" />
              1. Basic Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Kanal Ultra Modern Luxury Villa with Swimming Pool"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Property Code / ID</label>
                <input
                  type="text"
                  required
                  placeholder="AM-101"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Purpose *</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as PropertyPurpose)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="house">House / Villa</option>
                  <option value="plot">Plot / Land</option>
                  <option value="commercial">Commercial Plaza / Shop</option>
                  <option value="apartment">Apartment / Penthouse</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Type Label</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Kanal Modern Villa"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Listing Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="active">Active Listing</option>
                  <option value="sold">Mark as Sold</option>
                  <option value="rented">Mark as Rented</option>
                  <option value="draft">Draft / Unpublished</option>
                </select>
              </div>
            </div>

            {/* Price Row */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-gold-600" />
                  Price (PKR Numerical) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="10000"
                  placeholder="95000000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Live Formatted Output
                </p>
                <p className="font-serif text-lg font-bold text-navy-950">
                  {formatPKR(price, purpose === 'rent')}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-600" />
              2. Location Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Area (Lahore) *</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                >
                  {COMMON_LAHORE_AREAS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sector / Block / Phase</label>
                <input
                  type="text"
                  placeholder="e.g. Sector J, Block C"
                  value={sectorOrBlock}
                  onChange={(e) => setSectorOrBlock(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Address / Landmark</label>
              <input
                type="text"
                placeholder="e.g. House #42, Main Commercial Proximity, Sector J, DHA Phase 6, Lahore"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Specifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gold-600" />
              3. Specifications & Measurements
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Area Numerical *</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={areaNum}
                  onChange={(e) => setAreaNum(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Area Unit *</label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="Kanal">Kanal</option>
                  <option value="Marla">Marla</option>
                  <option value="Sq. Ft.">Sq. Ft.</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 5"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 6"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Covered Area</label>
                <input
                  type="text"
                  placeholder="e.g. 5,400 sq ft"
                  value={coveredArea}
                  onChange={(e) => setCoveredArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Car Parking Slots</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 3"
                  value={parkingSpaces}
                  onChange={(e) => setParkingSpaces(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Built Year</label>
                <input
                  type="number"
                  min="1990"
                  max="2030"
                  placeholder="2025"
                  value={builtYear}
                  onChange={(e) => setBuiltYear(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Description & Features */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-600" />
              4. Description & Key Amenities
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Detailed Property Description</label>
              <textarea
                rows={4}
                required
                placeholder="Comprehensive description of the architectural layout, materials, fixtures, location advantages, and title clearances..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
              />
            </div>

            {/* Feature tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Features & Amenities List</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Private Swimming Pool, Solar 15kW, Imported Spanish Kitchen..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-lg bg-navy-950 text-white text-xs font-bold flex items-center gap-1 hover:bg-navy-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-navy-950 text-xs font-medium border border-slate-200"
                    >
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(f)}
                        className="text-slate-400 hover:text-rose-600 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Image Gallery */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-gold-600" />
              5. Photography Gallery (URLs)
            </h4>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 rounded-lg bg-navy-950 text-white text-xs font-bold flex items-center gap-1 hover:bg-navy-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Photo
              </button>
            </div>

            {/* Images Grid Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
                  <img
                    src={imgUrl}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-gold-500 text-navy-950">
                      Primary
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Visibility & Badges */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500 border-slate-300"
              />
              <span className="text-xs font-bold text-navy-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Showcase as Featured Property on Homepage
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs font-bold text-navy-950">
                Published (Visible to public website visitors)
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold shadow-md transition-colors"
            >
              {initialData ? 'Update Property Listing' : 'Publish Property Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
