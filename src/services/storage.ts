import { Property } from '../types/property';
import { Lead } from '../types/lead';
import { SiteContent } from '../types/cms';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { SEED_LEADS } from '../data/seedLeads';
import { SEED_CMS } from '../data/seedCMS';

const STORAGE_KEYS = {
  PROPERTIES: 'am_properties_v2',
  LEADS: 'am_leads_v1',
  CMS: 'am_cms_v1',
  AUTH: 'am_demo_auth_session',
  CATEGORIES: 'am_categories_v1'
};

export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  count?: number;
  description: string;
  isActive: boolean;
}

const DEFAULT_CATEGORIES: CategoryMeta[] = [
  { id: 'cat-1', name: 'Houses & Villas', slug: 'house', description: 'Designer homes, Spanish villas, and luxury residential estates.', isActive: true },
  { id: 'cat-2', name: 'Residential & Commercial Plots', slug: 'plot', description: 'Ready-possession files and developed plots in DHA & Bahria.', isActive: true },
  { id: 'cat-3', name: 'Apartments & Penthouses', slug: 'apartment', description: 'High-rise luxury serviced residences in prime Gulberg and DHA.', isActive: true },
  { id: 'cat-4', name: 'Commercial Plazas & Shops', slug: 'commercial', description: 'High-yield commercial buildings, retail shops, and corporate floors.', isActive: true },
  { id: 'cat-5', name: 'Executive Rentals', slug: 'rent', description: 'Turnkey residential and commercial leasing opportunities.', isActive: true },
  { id: 'cat-6', name: 'Properties for Sale', slug: 'sale', description: 'Direct seller listings with clear legal documentation.', isActive: true }
];

export const storageService = {
  // Properties
  getProperties(): Property[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(SEED_PROPERTIES));
        return SEED_PROPERTIES;
      }
      let parsed: Property[] = JSON.parse(data);
      let updated = false;
      const validFallback = 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80';
      parsed = parsed.map(p => {
        if (!p.featuredImage || p.featuredImage.includes('1524813686514-a57563d77d66')) {
          p.featuredImage = validFallback;
          updated = true;
        }
        if (p.images && p.images.length > 0) {
          p.images = p.images.map(img => img.includes('1524813686514-a57563d77d66') ? validFallback : img);
        } else {
          p.images = [validFallback];
          updated = true;
        }
        return p;
      });
      if (updated) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error('Failed reading properties from storage', e);
      return SEED_PROPERTIES;
    }
  },

  saveProperties(properties: Property[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.error('Failed saving properties to storage', e);
    }
  },

  // Leads
  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(SEED_LEADS));
        return SEED_LEADS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading leads from storage', e);
      return SEED_LEADS;
    }
  },

  saveLeads(leads: Lead[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed saving leads to storage', e);
    }
  },

  // CMS
  getCMS(): SiteContent {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CMS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(SEED_CMS));
        return SEED_CMS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading CMS from storage', e);
      return SEED_CMS;
    }
  },

  saveCMS(cms: SiteContent): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(cms));
    } catch (e) {
      console.error('Failed saving CMS to storage', e);
    }
  },

  // Categories
  getCategories(): CategoryMeta[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        return DEFAULT_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_CATEGORIES;
    }
  },

  saveCategories(cats: CategoryMeta[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
    } catch (e) {
      console.error('Failed saving categories', e);
    }
  },

  // Auth Session (Demo)
  getAuthSession(): { email: string; name: string; role: string; token: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setAuthSession(session: { email: string; name: string; role: string; token: string }): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
    } catch (e) {
      console.error('Failed saving auth session', e);
    }
  },

  clearAuthSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch (e) {
      console.error('Failed clearing auth session', e);
    }
  },

  // Reset demo to fresh state
  resetAllDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(SEED_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(SEED_LEADS));
    localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(SEED_CMS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
};
