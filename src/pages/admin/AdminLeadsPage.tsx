import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MessageCircle, 
  Phone, 
  Mail, 
  Trash2, 
  Building, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ExternalLink 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LeadStatusBadge } from '../../components/admin/LeadStatusBadge';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { leadService } from '../../services/leadService';
import { Lead, LeadStatus } from '../../types/lead';
import { getWhatsAppUrl, formatDate, formatRelativeTime } from '../../utils/formatters';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadService.getAll());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const refreshList = () => {
    setLeads(leadService.getAll());
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    leadService.updateStatus(leadId, newStatus);
    refreshList();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleRequestDelete = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (leadToDelete) {
      leadService.delete(leadToDelete.id);
      setDeleteConfirmOpen(false);
      setLeadToDelete(null);
      if (selectedLead && selectedLead.id === leadToDelete.id) {
        setSelectedLead(null);
      }
      refreshList();
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = l.name.toLowerCase().includes(q);
        const matchesPhone = l.phone.toLowerCase().includes(q);
        const matchesEmail = l.email.toLowerCase().includes(q);
        const matchesProp = (l.propertyTitle || '').toLowerCase().includes(q);
        const matchesMsg = l.message.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesProp && !matchesMsg) {
          return false;
        }
      }

      return true;
    });
  }, [leads, search, statusFilter]);

  const stats = leadService.getStats();

  return (
    <AdminLayout
      title="Customer Inquiries & Lead Management"
      subtitle="Track, qualify, and convert buyer inquiries and seller property submissions."
    >
      <div className="space-y-6">
        {/* Status Counts Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {[
            { label: 'All Leads', count: stats.total, filter: 'all', color: 'border-slate-200' },
            { label: 'New', count: stats.new, filter: 'New', color: 'border-blue-200 bg-blue-50/50' },
            { label: 'Contacted', count: stats.contacted, filter: 'Contacted', color: 'border-amber-200 bg-amber-50/50' },
            { label: 'Interested', count: stats.interested, filter: 'Interested', color: 'border-purple-200 bg-purple-50/50' },
            { label: 'Converted', count: stats.converted, filter: 'Converted', color: 'border-emerald-200 bg-emerald-50/50' },
            { label: 'Lost', count: stats.lost, filter: 'Lost', color: 'border-rose-200 bg-rose-50/50' },
          ].map((st) => (
            <button
              key={st.filter}
              onClick={() => setStatusFilter(st.filter)}
              className={`p-3 rounded-xl border text-left transition-all ${st.color} ${
                statusFilter === st.filter ? 'ring-2 ring-navy-950 font-bold' : 'hover:border-slate-400'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">{st.label}</span>
              <span className="font-serif text-lg font-bold text-navy-950">{st.count}</span>
            </button>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, Pakistani phone, email, property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-navy-950">{filteredLeads.length}</span> customer leads
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Interested Property & Message</th>
                  <th className="p-3.5">Lead Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Quick Connect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const leadWhatsAppUrl = getWhatsAppUrl(
                    lead.phone,
                    `Assalam-o-Alaikum ${lead.name}, this is Abdul Malik from AM Property & Consultancy following up on your inquiry.`
                  );

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name */}
                      <td className="p-3.5">
                        <span className="font-bold text-navy-950 text-sm block">{lead.name}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {lead.type.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Phone & Email */}
                      <td className="p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-navy-900 font-mono font-medium">
                          <Phone className="w-3 h-3 text-gold-600 flex-shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                        {lead.email && lead.email !== 'Not provided' && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Property & Message */}
                      <td className="p-3.5 max-w-sm">
                        {lead.propertyTitle && (
                          <span className="font-bold text-navy-950 block line-clamp-1">
                            {lead.propertyCode ? `[${lead.propertyCode}] ` : ''}{lead.propertyTitle}
                          </span>
                        )}
                        <p className="text-slate-600 line-clamp-2 mt-0.5 text-[11px] leading-relaxed italic bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          "{lead.message}"
                        </p>
                        {lead.preferredDate && (
                          <span className="text-[10px] text-gold-700 font-semibold block mt-1">
                            Requested Viewing: {lead.preferredDate}
                          </span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-3.5">
                        <LeadStatusBadge
                          status={lead.status}
                          onChangeStatus={(newSt) => handleStatusChange(lead.id, newSt)}
                        />
                      </td>

                      {/* Date */}
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        <span className="block font-medium">{formatDate(lead.createdAt)}</span>
                        <span className="text-[10px] text-slate-400">{formatRelativeTime(lead.createdAt)}</span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={leadWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-navy-50 text-navy-900 hover:bg-navy-950 hover:text-white border border-navy-200 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleRequestDelete(lead)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No customer inquiries found for this status or search.
            </div>
          )}
        </div>
      </div>

      {/* Delete Lead Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Customer Lead?"
        message={`Are you sure you want to remove the inquiry from ${leadToDelete?.name}? This cannot be undone.`}
        confirmLabel="Yes, Delete Lead"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </AdminLayout>
  );
};
