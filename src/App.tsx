import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { WhatsAppFloat } from './components/public/WhatsAppFloat';
import { SubmitPropertyModal } from './components/public/SubmitPropertyModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { BuyPage } from './pages/public/BuyPage';
import { RentPage } from './pages/public/RentPage';
import { CommercialPage } from './pages/public/CommercialPage';
import { PropertyDetailPage } from './pages/public/PropertyDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminSEOPage } from './pages/admin/AdminSEOPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Services
import { propertyService } from './services/propertyService';
import { cmsService } from './services/cmsService';
import { Property } from './types/property';
import { SiteContent } from './types/cms';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout Wrapper
function PublicLayout({
  children,
  cms,
  onOpenSubmitProperty
}: {
  children: React.ReactNode;
  cms: SiteContent;
  onOpenSubmitProperty: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-navy-900 font-sans selection:bg-gold-500 selection:text-white">
      <Navbar cms={cms} onOpenSubmitProperty={onOpenSubmitProperty} />
      <main className="flex-1">
        {children}
      </main>
      <Footer cms={cms} />
      <WhatsAppFloat whatsappNumber={cms.company.whatsapp} />
    </div>
  );
}

export function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cms, setCms] = useState<SiteContent>(cmsService.getContent());
  const [submitPropertyModalOpen, setSubmitPropertyModalOpen] = useState(false);

  useEffect(() => {
    setProperties(propertyService.getAll());
    setCms(cmsService.getContent());
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <HomePage 
                properties={properties} 
                cms={cms} 
                onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)} 
              />
            </PublicLayout>
          }
        />
        <Route
          path="/buy"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <BuyPage properties={properties} cms={cms} />
            </PublicLayout>
          }
        />
        <Route
          path="/rent"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <RentPage properties={properties} cms={cms} />
            </PublicLayout>
          }
        />
        <Route
          path="/commercial"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <CommercialPage properties={properties} cms={cms} />
            </PublicLayout>
          }
        />
        <Route
          path="/property/:id"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <PropertyDetailPage cms={cms} />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <AboutPage cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <ServicesPage cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout cms={cms} onOpenSubmitProperty={() => setSubmitPropertyModalOpen(true)}>
              <ContactPage cms={cms} />
            </PublicLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/properties" element={<AdminPropertiesPage />} />
        <Route path="/admin/leads" element={<AdminLeadsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/content" element={<AdminContentPage />} />
        <Route path="/admin/seo" element={<AdminSEOPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Submit Property Modal */}
      <SubmitPropertyModal
        isOpen={submitPropertyModalOpen}
        onClose={() => setSubmitPropertyModalOpen(false)}
      />
    </BrowserRouter>
  );
}

export default App;
