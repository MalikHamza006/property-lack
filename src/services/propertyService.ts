import { Property, PropertyFilterOptions, PropertyStatus } from '../types/property';
import { storageService } from './storage';
import { formatPKR } from '../utils/formatters';

export const propertyService = {
  getAll(): Property[] {
    return storageService.getProperties();
  },

  getPublished(filters?: PropertyFilterOptions): Property[] {
    let list = storageService.getProperties().filter(p => p.published);

    if (!filters) return list;

    if (filters.purpose && filters.purpose !== 'all') {
      list = list.filter(p => p.purpose === filters.purpose);
    }

    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category === filters.category);
    }

    if (filters.area && filters.area !== 'all') {
      const areaLower = filters.area.toLowerCase();
      list = list.filter(p => p.location.area.toLowerCase().includes(areaLower));
    }

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      list = list.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      list = list.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const beds = Number(filters.bedrooms);
      list = list.filter(p => (p.specs.bedrooms || 0) >= beds);
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.location.area.toLowerCase().includes(q) ||
        p.location.address.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters.sortBy) {
      if (filters.sortBy === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'popular') {
        list.sort((a, b) => b.viewsCount - a.viewsCount);
      } else {
        // newest default
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  },

  getById(idOrSlug: string): Property | undefined {
    const properties = storageService.getProperties();
    return properties.find(p => p.id === idOrSlug || p.slug === idOrSlug || p.code.toLowerCase() === idOrSlug.toLowerCase());
  },

  getFeatured(limit = 6): Property[] {
    return storageService
      .getProperties()
      .filter(p => p.published && p.isFeatured)
      .slice(0, limit);
  },

  getSimilar(currentProperty: Property, limit = 3): Property[] {
    return storageService
      .getProperties()
      .filter(p => p.published && p.id !== currentProperty.id && (p.category === currentProperty.category || p.location.area === currentProperty.location.area))
      .slice(0, limit);
  },

  create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount'>): Property {
    const properties = storageService.getProperties();
    const newId = `prop-${Date.now()}`;
    const autoCode = data.code || `AM-${Math.floor(100 + Math.random() * 900)}`;
    const autoSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProperty: Property = {
      ...data,
      id: newId,
      code: autoCode,
      slug: autoSlug,
      priceDisplay: formatPKR(data.price, data.purpose === 'rent'),
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    properties.unshift(newProperty);
    storageService.saveProperties(properties);
    return newProperty;
  },

  update(id: string, updates: Partial<Property>): Property {
    const properties = storageService.getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Property with id ${id} not found`);
    }

    const current = properties[index];
    const updatedPrice = updates.price !== undefined ? updates.price : current.price;
    const updatedPurpose = updates.purpose !== undefined ? updates.purpose : current.purpose;

    const updatedProperty: Property = {
      ...current,
      ...updates,
      priceDisplay: formatPKR(updatedPrice, updatedPurpose === 'rent'),
      updatedAt: new Date().toISOString()
    };

    properties[index] = updatedProperty;
    storageService.saveProperties(properties);
    return updatedProperty;
  },

  delete(id: string): boolean {
    const properties = storageService.getProperties();
    const filtered = properties.filter(p => p.id !== id);
    if (filtered.length === properties.length) return false;
    storageService.saveProperties(filtered);
    return true;
  },

  togglePublish(id: string): Property {
    const property = this.getById(id);
    if (!property) throw new Error('Property not found');
    return this.update(id, { published: !property.published });
  },

  toggleFeatured(id: string): Property {
    const property = this.getById(id);
    if (!property) throw new Error('Property not found');
    return this.update(id, { isFeatured: !property.isFeatured });
  },

  updateStatus(id: string, status: PropertyStatus): Property {
    return this.update(id, { status });
  },

  incrementViews(id: string): void {
    const property = this.getById(id);
    if (property) {
      this.update(id, { viewsCount: (property.viewsCount || 0) + 1 });
    }
  },

  getStats() {
    const list = storageService.getProperties();
    return {
      total: list.length,
      active: list.filter(p => p.status === 'active' && p.published).length,
      sold: list.filter(p => p.status === 'sold').length,
      rented: list.filter(p => p.status === 'rented').length,
      forSale: list.filter(p => p.purpose === 'sale').length,
      forRent: list.filter(p => p.purpose === 'rent').length,
      houses: list.filter(p => p.category === 'house').length,
      plots: list.filter(p => p.category === 'plot').length,
      commercial: list.filter(p => p.category === 'commercial').length,
      apartments: list.filter(p => p.category === 'apartment').length,
      featured: list.filter(p => p.isFeatured).length
    };
  }
};
