import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Key, 
  DollarSign, 
  Layers, 
  Eye, 
  Sparkles,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PropertyFormModal } from '../../components/admin/PropertyFormModal';
import { LeadStatusBadge } from '../../components/admin/LeadStatusBadge';
import { propertyService } from '../../services/propertyService';
import { leadService } from '../../services/leadService';
import { LeadStatus } from '../../types/lead';
import { formatPKR, formatDate, formatRelativeTime } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const propStats = propertyService.getStats();
  const leadStats = leadService.getStats();
  const recentLeads = leadService.getAll().slice(0, 5);
  const featuredProps = propertyService.getFeatured(4);

  const handleCreateProperty = (data: any) => {
    propertyService.create(data);
    setPropertyModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    leadService.updateStatus(leadId, newStatus);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AdminLayout
      title="Consultancy Executive Dashboard"
      subtitle="Real-time oversight of Lahore property listings, client inquiries, and portfolio metrics."
    >
      <div className="space-y-8">
        {/* Stat Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Total Properties */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Listings</span>
              <Building className="w-4 h-4 text-gold-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-navy-950">{propStats.total}</p>
            <p className="text-[11px] text-emerald-600 font-medium">100% Verified</p>
          </div>

          {/* 2. Active Listings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Live</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-emerald-700">{propStats.active}</p>
            <p className="text-[11px] text-slate-500">Publicly visible</p>
          </div>

          {/* 3. Sold Properties */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sold Out</span>
              <DollarSign className="w-4 h-4 text-rose-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-navy-950">{propStats.sold}</p>
            <p className="text-[11px] text-slate-500">Closed deals</p>
          </div>

          {/* 4. Rental Properties */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rentals</span>
              <Key className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-navy-950">{propStats.forRent}</p>
            <p className="text-[11px] text-slate-500">Leasing portfolio</p>
          </div>

          {/* 5. Total Inquiries */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Leads</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-navy-950">{leadStats.total}</p>
            <p className="text-[11px] text-slate-500">Buyer & seller leads</p>
          </div>

          {/* 6. New Unaddressed Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 bg-gradient-to-br from-gold-50/50 to-white">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800">New Leads</span>
              <Sparkles className="w-4 h-4 text-gold-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-gold-800">{leadStats.new}</p>
            <p className="text-[11px] text-gold-700 font-semibold">Requires callback</p>
          </div>
        </div>

        {/* Quick Actions Ribbon */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Actions:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setPropertyModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>

            <Link
              to="/admin/leads"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs shadow-sm transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-gold-400" />
              <span>Manage Client Leads ({leadStats.total})</span>
            </Link>

            <Link
              to="/admin/content"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-navy-950 text-slate-700 text-xs font-semibold transition-colors bg-white"
            >
              <span>Edit Homepage Copy</span>
            </Link>

            <Link
              to="/admin/seo"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-navy-950 text-slate-700 text-xs font-semibold transition-colors bg-white"
            >
              <span>SEO Tags</span>
            </Link>
          </div>
        </div>

        {/* Two-Column Layout: Recent Leads + Portfolio Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Recent Customer Inquiries (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-navy-950">Recent Client Inquiries & Leads</h3>
                <p className="text-xs text-slate-500">Live requests submitted from property detail and contact forms.</p>
              </div>
              <Link
                to="/admin/leads"
                className="text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center gap-1"
              >
                <span>View All Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Client & Contact</th>
                    <th className="p-3.5">Interested Property</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 space-y-0.5">
                        <span className="font-bold text-navy-950 block">{lead.name}</span>
                        <div className="flex items-center gap-2 text-slate-500">
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <span className="font-medium text-navy-900 line-clamp-1">
                          {lead.propertyTitle || 'General Lahore Consultation'}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                          "{lead.message}"
                        </p>
                      </td>
                      <td className="p-3.5">
                        <LeadStatusBadge
                          status={lead.status}
                          onChangeStatus={(newSt) => handleUpdateLeadStatus(lead.id, newSt)}
                        />
                      </td>
                      <td className="p-3.5 text-slate-400 whitespace-nowrap">
                        {formatRelativeTime(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Portfolio Breakdown & Recent Activity */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-navy-950 pb-2 border-b border-slate-100">
                Property Categories
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Houses & Designer Villas</span>
                    <span className="text-navy-950">{propStats.houses} ({Math.round((propStats.houses / propStats.total) * 100)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-950 rounded-full" style={{ width: `${(propStats.houses / propStats.total) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Plots & Pair Plots</span>
                    <span className="text-navy-950">{propStats.plots} ({Math.round((propStats.plots / propStats.total) * 100)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-500 rounded-full" style={{ width: `${(propStats.plots / propStats.total) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Commercial Plazas & Shops</span>
                    <span className="text-navy-950">{propStats.commercial} ({Math.round((propStats.commercial / propStats.total) * 100)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(propStats.commercial / propStats.total) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700">Apartments & Penthouses</span>
                    <span className="text-navy-950">{propStats.apartments} ({Math.round((propStats.apartments / propStats.total) * 100)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(propStats.apartments / propStats.total) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-navy-950 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Recent System Activity</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-navy-950">Property AM-101 published to live website</p>
                    <span className="text-[10px] text-slate-400">10 mins ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-navy-950">Inquiry received from Brig. (R) Tariq Mehmood</p>
                    <span className="text-[10px] text-slate-400">1 hour ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-navy-950">Lead status updated to Converted for Mian Hamza</p>
                    <span className="text-[10px] text-slate-400">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Form Modal */}
      <PropertyFormModal
        isOpen={propertyModalOpen}
        onClose={() => setPropertyModalOpen(false)}
        onSubmit={handleCreateProperty}
      />
    </AdminLayout>
  );
};
