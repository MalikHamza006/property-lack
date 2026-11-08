import { SiteContent } from '../types/cms';
import { storageService } from './storage';

export const cmsService = {
  getContent(): SiteContent {
    return storageService.getCMS();
  },

  updateContent(updates: Partial<SiteContent>): SiteContent {
    const current = storageService.getCMS();
    const merged: SiteContent = {
      ...current,
      ...updates
    };
    storageService.saveCMS(merged);
    return merged;
  },

  updateHero(hero: SiteContent['hero']): SiteContent {
    const current = storageService.getCMS();
    current.hero = hero;
    storageService.saveCMS(current);
    return current;
  },

  updateCompany(company: SiteContent['company']): SiteContent {
    const current = storageService.getCMS();
    current.company = company;
    storageService.saveCMS(current);
    return current;
  },

  updateAbout(about: SiteContent['about']): SiteContent {
    const current = storageService.getCMS();
    current.about = about;
    storageService.saveCMS(current);
    return current;
  },

  updateSEO(seo: SiteContent['seo']): SiteContent {
    const current = storageService.getCMS();
    current.seo = seo;
    storageService.saveCMS(current);
    return current;
  },

  updateServices(services: SiteContent['services']): SiteContent {
    const current = storageService.getCMS();
    current.services = services;
    storageService.saveCMS(current);
    return current;
  },

  updateTestimonials(testimonials: SiteContent['testimonials']): SiteContent {
    const current = storageService.getCMS();
    current.testimonials = testimonials;
    storageService.saveCMS(current);
    return current;
  }
};
