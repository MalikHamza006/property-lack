export type PropertyPurpose = 'sale' | 'rent';

export type PropertyCategory = 'house' | 'plot' | 'apartment' | 'commercial';

export type PropertyStatus = 'active' | 'sold' | 'rented' | 'draft';

export interface PropertyFeature {
  id: string;
  name: string;
  category: 'interior' | 'exterior' | 'community' | 'security';
}

export interface Property {
  id: string;
  code: string; // e.g., AM-1042
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  propertyType: string; // e.g., "1 Kanal Modern Villa", "10 Marla Corner Plot", "Commercial Plaza"
  price: number; // in PKR
  priceDisplay?: string; // Formatted PKR (e.g. "PKR 4.5 Crore")
  location: {
    city: string; // Lahore
    area: string; // e.g., DHA Phase 6, Bahria Town, Gulberg III
    sectorOrBlock?: string; // e.g., Block J, Sector C
    address: string;
  };
  specs: {
    bedrooms?: number;
    bathrooms?: number;
    area: number; // numerical value
    areaUnit: 'Marla' | 'Kanal' | 'Sq. Ft.' | 'Sq. Yd.';
    coveredArea?: string; // e.g. "4,200 sq ft"
    floors?: number;
    parkingSpaces?: number;
    builtYear?: number;
  };
  description: string;
  features: string[];
  images: string[];
  featuredImage: string;
  status: PropertyStatus;
  isFeatured: boolean;
  published: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilterOptions {
  purpose?: PropertyPurpose | 'all';
  category?: PropertyCategory | 'all';
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | 'any';
  minArea?: number;
  maxArea?: number;
  areaUnit?: string;
  search?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}
