export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyCode?: string;
  message: string;
  status: LeadStatus;
  type: 'inquiry' | 'viewing_request' | 'sell_submission' | 'general';
  preferredDate?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string[];
}
