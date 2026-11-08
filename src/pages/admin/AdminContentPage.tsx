import React, { useState } from 'react';
import { 
  FileText, 
  Save, 
  CheckCircle, 
  Sparkles, 
  Building, 
  HelpCircle, 
  Phone, 
  Share2, 
  Plus, 
  Trash2,
  Star
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { cmsService } from '../../services/cmsService';
import { SiteContent, Testimonial } from '../../types/cms';

export const AdminContentPage: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(cmsService.getContent());
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'testimonials' | 'social'>('hero');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleUpdateTestimonial = (index: number, field: keyof Testimonial, val: any) => {
    const updated = [...content.testimonials];
    updated[index] = { ...updated[index], [field]: val };
    setContent({ ...content, testimonials: updated });
  };

  const handleAddTestimonial = () => {
    const newTest: Testimonial = {
      id: `test-${Date.now()}`,
      name: 'New Client Name',
      role: 'Property Investor / Resident',
      location: 'DHA Phase 6, Lahore',
      content: 'AM Property provided transparent consultation, verified title checks, and timely transfer support.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    };
    setContent({ ...content, testimonials: [...content.testimonials, newTest] });
  };

  const handleRemoveTestimonial = (index: number) => {
    const updated = content.testimonials.filter((_, i) => i !== index);
    setContent({ ...content, testimonials: updated });
  };

  return (
    <AdminLayout
      title="Website Content Management (CMS)"
      subtitle="Edit front-facing website copy, hero banners, testimonials, and company details without code changes."
    >
      <div className="space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Content successfully updated! Changes are live on the public website.</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-1.5">
          {[
            { id: 'hero', label: 'Hero & Headlines' },
            { id: 'about', label: 'About & Mission' },
            { id: 'testimonials', label: 'Client Testimonials' },
            { id: 'contact', label: 'Contact & Office Hours' },
            { id: 'social', label: 'Social & Footer Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CMS Editor Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* TAB 1: HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
                Homepage Hero Section
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Top Accreditation Badge</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Main Headline</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Highlight City Word (Gold)</label>
                  <input
                    type="text"
                    value={content.hero.highlightWord}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, highlightWord: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subtitle Copy</label>
                <textarea
                  rows={3}
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              {/* Stat Counters */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-700 block mb-2">Hero Counters Bar</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Transactions Value</span>
                    <input
                      type="text"
                      value={content.hero.stats.transactionsValue}
                      onChange={(e) => setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          stats: { ...content.hero.stats, transactionsValue: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Satisfied Clients</span>
                    <input
                      type="text"
                      value={content.hero.stats.satisfiedClients}
                      onChange={(e) => setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          stats: { ...content.hero.stats, satisfiedClients: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Years Experience</span>
                    <input
                      type="text"
                      value={content.hero.stats.yearsExperience}
                      onChange={(e) => setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          stats: { ...content.hero.stats, yearsExperience: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Audited Badge</span>
                    <input
                      type="text"
                      value={content.hero.stats.verifiedProperties}
                      onChange={(e) => setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          stats: { ...content.hero.stats, verifiedProperties: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
                About Section & Company Story
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">About Heading</label>
                <input
                  type="text"
                  value={content.about.heading}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, heading: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subheading / Introduction</label>
                <input
                  type="text"
                  value={content.about.subheading}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, subheading: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Company Mission</label>
                <textarea
                  rows={2}
                  value={content.about.mission}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Company Vision</label>
                <textarea
                  rows={2}
                  value={content.about.vision}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, vision: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-serif text-lg font-bold text-navy-950">
                  Client Testimonials Management
                </h3>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-950 text-white text-xs font-bold hover:bg-navy-900 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.testimonials.map((test, index) => (
                  <div key={test.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-950 text-xs">Testimonial #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(index)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Client Name</label>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => handleUpdateTestimonial(index, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Role / Title</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => handleUpdateTestimonial(index, 'role', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Location</label>
                        <input
                          type="text"
                          value={test.location}
                          onChange={(e) => handleUpdateTestimonial(index, 'location', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600">Review Quotation</label>
                      <textarea
                        rows={2}
                        value={test.content}
                        onChange={(e) => handleUpdateTestimonial(index, 'content', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & OFFICE */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
                Official Contact & Location Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={content.company.name}
                    onChange={(e) => setContent({ ...content, company: { ...content.company, name: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tagline</label>
                  <input
                    type="text"
                    value={content.company.tagline}
                    onChange={(e) => setContent({ ...content, company: { ...content.company, tagline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Display</label>
                  <input
                    type="text"
                    value={content.company.phoneDisplay}
                    onChange={(e) => setContent({ ...content, company: { ...content.company, phoneDisplay: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp Number (e.g. 923001234567)</label>
                  <input
                    type="text"
                    value={content.company.whatsapp}
                    onChange={(e) => setContent({ ...content, company: { ...content.company, whatsapp: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={content.company.email}
                    onChange={(e) => setContent({ ...content, company: { ...content.company, email: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Office Physical Address</label>
                <input
                  type="text"
                  value={content.company.address}
                  onChange={(e) => setContent({ ...content, company: { ...content.company, address: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Consultancy Hours</label>
                <input
                  type="text"
                  value={content.company.workingHours}
                  onChange={(e) => setContent({ ...content, company: { ...content.company, workingHours: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: SOCIAL */}
          {activeTab === 'social' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-navy-950 pb-2 border-b border-slate-100">
                Social Media Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Facebook URL</label>
                  <input
                    type="url"
                    value={content.socialLinks.facebook || ''}
                    onChange={(e) => setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, facebook: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Instagram URL</label>
                  <input
                    type="url"
                    value={content.socialLinks.instagram || ''}
                    onChange={(e) => setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, instagram: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">YouTube Channel</label>
                  <input
                    type="url"
                    value={content.socialLinks.youtube || ''}
                    onChange={(e) => setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, youtube: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">LinkedIn Company Page</label>
                  <input
                    type="url"
                    value={content.socialLinks.linkedin || ''}
                    onChange={(e) => setContent({
                      ...content,
                      socialLinks: { ...content.socialLinks, linkedin: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Save Button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Content Changes</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
