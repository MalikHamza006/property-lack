import React, { useState } from 'react';
import { Settings, Save, CheckCircle, ShieldCheck, Database, Lock, RotateCcw, User, Building } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { authService, DEMO_CREDENTIALS } from '../../services/authService';
import { cmsService } from '../../services/cmsService';
import { storageService } from '../../services/storage';

export const AdminSettingsPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [cms, setCms] = useState(cmsService.getContent());
  
  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const [savedCompany, setSavedCompany] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSaveCompanySettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateCompany(cms.company);
    setSavedCompany(true);
    setTimeout(() => setSavedCompany(false), 2000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage(null);

    if (currentPass !== DEMO_CREDENTIALS.password) {
      setPassMessage({ text: 'Current password does not match demo credentials (Demo@12345).', isError: true });
      return;
    }

    if (newPass.length < 6) {
      setPassMessage({ text: 'New password must be at least 6 characters.', isError: true });
      return;
    }

    if (newPass !== confirmPass) {
      setPassMessage({ text: 'New passwords do not match.', isError: true });
      return;
    }

    // In demo mode, update credentials object
    DEMO_CREDENTIALS.password = newPass;
    setPassMessage({ text: 'Demo password updated successfully for this session!' });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleResetData = () => {
    storageService.resetAllDemoData();
    setResetModalOpen(false);
    window.location.reload();
  };

  return (
    <AdminLayout
      title="System Settings & Admin Configuration"
      subtitle="Manage corporate branding parameters, administrative profile, and demo database state."
    >
      <div className="space-y-8 max-w-4xl">
        {/* Architecture Notice Card */}
        <div className="p-5 rounded-2xl bg-navy-950 text-white border border-navy-800 space-y-2">
          <div className="flex items-center gap-2 text-gold-400">
            <Database className="w-5 h-5" />
            <h3 className="font-serif text-base font-bold text-white">Database & Architecture Status</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Current Environment: <span className="font-bold text-gold-400">Client Presentation Prototype (localStorage Persisted)</span>. Data access is encapsulated within reusable service interfaces (<code className="text-gold-300">propertyService</code>, <code className="text-gold-300">leadService</code>, <code className="text-gold-300">cmsService</code>) engineered for rapid 1-click binding to Supabase PostgreSQL or cloud REST backends.
          </p>
        </div>

        {/* Company Settings */}
        <form onSubmit={handleSaveCompanySettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
              <Building className="w-5 h-5 text-gold-600" />
              Corporate Identity & Contact Information
            </h3>
            {savedCompany && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company Name</label>
              <input
                type="text"
                required
                value={cms.company.name}
                onChange={(e) => setCms({ ...cms, company: { ...cms.company, name: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Official Tagline</label>
              <input
                type="text"
                value={cms.company.tagline}
                onChange={(e) => setCms({ ...cms, company: { ...cms.company, tagline: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Hotline Phone Number</label>
              <input
                type="text"
                value={cms.company.phone}
                onChange={(e) => setCms({ ...cms, company: { ...cms.company, phone: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">WhatsApp Inquiry Number</label>
              <input
                type="text"
                value={cms.company.whatsapp}
                onChange={(e) => setCms({ ...cms, company: { ...cms.company, whatsapp: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Official Email</label>
              <input
                type="email"
                value={cms.company.email}
                onChange={(e) => setCms({ ...cms, company: { ...cms.company, email: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Headquarters Physical Address</label>
            <input
              type="text"
              value={cms.company.address}
              onChange={(e) => setCms({ ...cms, company: { ...cms.company, address: e.target.value } })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Update Company Settings
            </button>
          </div>
        </form>

        {/* Admin Profile & Password Update */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
              <User className="w-5 h-5 text-gold-600" />
              Administrative Profile & Credentials
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-navy-900">
              Role: {currentUser?.role || 'Principal Admin'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Active Name</span>
              <p className="font-bold text-navy-950 text-sm">{currentUser?.name || 'Abdul Malik Khan'}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Address</span>
              <p className="font-bold text-navy-950 text-sm">{currentUser?.email || 'admin@amproperty.demo'}</p>
            </div>
          </div>

          {/* Password change form */}
          <form onSubmit={handleUpdatePassword} className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Change Admin Password</h4>

            {passMessage && (
              <div className={`p-3 rounded-xl text-xs ${
                passMessage.isError ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {passMessage.text}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="Demo@12345"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone: Reset All Demo Data */}
        <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-bold text-rose-950">Factory Reset Demo Presentation Data</h4>
            <p className="text-xs text-rose-800 mt-0.5">
              Overwrites all modifications and restores the initial 14 Lahore listings, leads, and default CMS configuration.
            </p>
          </div>

          <button
            onClick={() => setResetModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs whitespace-nowrap shadow-sm transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={resetModalOpen}
        title="Confirm Factory Reset?"
        message="This will immediately overwrite any added properties, edited copy, or custom leads back to the pristine seed state."
        confirmLabel="Reset Everything"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleResetData}
        onCancel={() => setResetModalOpen(false)}
      />
    </AdminLayout>
  );
};
