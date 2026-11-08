import React, { useState } from 'react';
import { Search, Save, CheckCircle, Globe, Share2, Eye } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { cmsService } from '../../services/cmsService';
import { SiteContent } from '../../types/cms';

export const AdminSEOPage: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(cmsService.getContent());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateSEO(content.seo);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout
      title="Search Engine Optimization (SEO) & Social Graph"
      subtitle="Configure Google metadata, SERP snippets, Open Graph image tags, and dynamic property templates."
    >
      <div className="space-y-8 max-w-4xl">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>SEO configuration updated and saved.</span>
          </div>
        )}

        {/* Live Google Search Preview Simulation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
            <Eye className="w-4 h-4 text-gold-600" />
            <span>Google Search Result Snippet Simulation</span>
          </div>

          <div className="pt-2 font-sans space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🌐</span>
              <span className="text-slate-600 truncate">https://ampropertyconsultancy.com</span>
            </div>
            <h4 className="text-blue-700 text-lg hover:underline cursor-pointer font-medium leading-snug">
              {content.seo.homeTitle || 'AM Property & Consultancy | Luxury Real Estate Lahore'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              {content.seo.homeDescription || 'Premier real estate consultancy specializing in luxury residential, commercial properties and investment advisory across DHA Lahore and Bahria Town.'}
            </p>
          </div>
        </div>

        {/* SEO Settings Form */}
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
              Primary Website Metadata
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Homepage Meta Title (Ideal 50-60 characters)</label>
              <input
                type="text"
                required
                value={content.seo.homeTitle}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, homeTitle: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block text-right">
                {content.seo.homeTitle.length} characters
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Homepage Meta Description (Ideal 140-160 characters)</label>
              <textarea
                rows={3}
                required
                value={content.seo.homeDescription}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, homeDescription: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
              />
              <span className="text-[10px] text-slate-400 block text-right">
                {content.seo.homeDescription.length} characters
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">SEO Keywords (Comma separated)</label>
              <input
                type="text"
                value={content.seo.keywords}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, keywords: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Graph & Open Graph */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
              Social Sharing (Open Graph Image)
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Social Share Preview Image URL (og:image)</label>
              <input
                type="url"
                value={content.seo.ogImage}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, ogImage: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Property Dynamic Templates */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
              Automated Property Listing SEO Templates
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Listing Title Template</label>
              <input
                type="text"
                value={content.seo.propertyTitleTemplate}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, propertyTitleTemplate: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">Available variables: <code>{'{title}'}</code>, <code>{'{area}'}</code>, <code>{'{price}'}</code></span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Listing Description Template</label>
              <textarea
                rows={2}
                value={content.seo.propertyDescriptionTemplate}
                onChange={(e) => setContent({ ...content, seo: { ...content.seo, propertyDescriptionTemplate: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono text-xs resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save SEO Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
