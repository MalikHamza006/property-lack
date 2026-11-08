import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  Users,
  Layers,
  FileText,
  Search,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  RotateCcw,
  Bell,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { authService } from '../../services/authService';
import { leadService } from '../../services/leadService';
import { storageService } from '../../services/storage';
import { ConfirmDialog } from './ConfirmDialog';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();
  const leadStats = leadService.getStats();

  useEffect(() => {
    // If not authenticated, redirect to /admin/login
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Property Listings', path: '/admin/properties', icon: Building },
    { 
      label: 'Leads & Inquiries', 
      path: '/admin/leads', 
      icon: Users,
      badge: leadStats.new > 0 ? `${leadStats.new} New` : undefined 
    },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Website Content', path: '/admin/content', icon: FileText },
    { label: 'SEO Management', path: '/admin/seo', icon: Search },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const isCurrent = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleConfirmReset = () => {
    storageService.resetAllDemoData();
    setResetModalOpen(false);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-navy-950 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy-950 text-slate-300 flex-col border-r border-navy-800 flex-shrink-0 z-30">
        {/* Brand Banner */}
        <div className="p-5 border-b border-navy-800/80">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy-900 border border-gold-500/50 flex items-center justify-center text-gold-400 shadow-md">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-white block leading-tight">
                AM Property
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                Admin CMS • Demo
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isCurrent(item.path, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-navy-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    active ? 'bg-navy-950 text-gold-300' : 'bg-gold-500 text-navy-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-3.5 border-t border-navy-800 space-y-2">
          {/* View Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-navy-800"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-400" />
              <span>View Public Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setResetModalOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-navy-900 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          {/* User & Logout */}
          <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <p className="text-white font-bold truncate text-[11px]">{currentUser?.name || 'Admin User'}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.email || 'admin@amproperty.demo'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between border-b border-navy-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-navy-900"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div>
            <span className="font-serif text-sm font-bold text-white block">AM Property CMS</span>
            <span className="text-[9px] uppercase tracking-wider text-gold-400 font-semibold">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 rounded-lg bg-navy-900 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-navy-950 text-white h-full flex flex-col p-4 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <span className="font-serif text-base font-bold text-white">AM Admin Menu</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-4 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const active = isCurrent(item.path, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      active ? 'bg-gold-500 text-navy-950 font-bold' : 'text-slate-300 hover:bg-navy-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-gold-400 text-navy-950 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-navy-800 space-y-2 text-xs">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="block text-center py-2 rounded-lg bg-navy-900 text-slate-300 font-semibold"
              >
                View Public Website
              </Link>
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setResetModalOpen(true);
                }}
                className="w-full text-center py-2 text-rose-400 hover:bg-navy-900 rounded-lg"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Presentation Mode
            </span>

            <Link
              to="/admin/leads"
              className="relative p-2 rounded-xl text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
              title="View Inquiries"
            >
              <Bell className="w-5 h-5" />
              {leadStats.new > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
              )}
            </Link>
          </div>
        </header>

        {/* Demo Notification Notice */}
        <div className="bg-navy-900 text-slate-200 px-6 sm:px-8 py-2.5 text-xs flex items-center justify-between gap-3 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>
              <strong>Client Presentation Demo:</strong> All property additions, edits, and lead status updates persist in your browser's <code className="bg-navy-950 px-1 py-0.5 rounded text-gold-300">localStorage</code>. Architecture is production-ready for Supabase backend integration.
            </span>
          </div>

          <button
            onClick={() => setResetModalOpen(true)}
            className="text-[11px] font-semibold text-gold-400 hover:text-gold-300 underline whitespace-nowrap hidden sm:inline"
          >
            Reset Demo Data
          </button>
        </div>

        {/* Success toast if reset */}
        {resetSuccess && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demo data successfully reset to initial Lahore luxury real estate listings. Reloading...</span>
          </div>
        )}

        {/* Dynamic Page Content */}
        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetModalOpen}
        title="Reset All Demo Data?"
        message="This will reset all properties, customer leads, CMS content and settings back to the default pristine Pakistani real estate presentation dataset. Any custom changes will be overwritten."
        confirmLabel="Yes, Reset Everything"
        cancelLabel="Keep Current State"
        isDestructive={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
};
