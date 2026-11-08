import { Lead, LeadStatus } from '../types/lead';
import { storageService } from './storage';

export const leadService = {
  getAll(): Lead[] {
    const list = storageService.getLeads();
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById(id: string): Lead | undefined {
    return storageService.getLeads().find(l => l.id === id);
  },

  create(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: LeadStatus }): Lead {
    const leads = storageService.getLeads();
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      status: data.status || 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    leads.unshift(newLead);
    storageService.saveLeads(leads);
    return newLead;
  },

  updateStatus(id: string, status: LeadStatus): Lead {
    const leads = storageService.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead not found');

    leads[index] = {
      ...leads[index],
      status,
      updatedAt: new Date().toISOString()
    };

    storageService.saveLeads(leads);
    return leads[index];
  },

  delete(id: string): boolean {
    const leads = storageService.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    if (filtered.length === leads.length) return false;
    storageService.saveLeads(filtered);
    return true;
  },

  getStats() {
    const list = storageService.getLeads();
    return {
      total: list.length,
      new: list.filter(l => l.status === 'New').length,
      contacted: list.filter(l => l.status === 'Contacted').length,
      interested: list.filter(l => l.status === 'Interested').length,
      converted: list.filter(l => l.status === 'Converted').length,
      lost: list.filter(l => l.status === 'Lost').length
    };
  }
};
