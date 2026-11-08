import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  ChevronRight, 
  Home, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { SiteContent } from '../../types/cms';
import { leadService } from '../../services/leadService';
import { getWhatsAppUrl } from '../../utils/formatters';

interface ContactPageProps {
  cms: SiteContent;
}

export const ContactPage: React.FC<ContactPageProps> = ({ cms }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Buying Property in DHA Lahore');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappDirectUrl = getWhatsAppUrl(
    cms.company.whatsapp,
    'Assalam-o-Alaikum, I am reaching out through the AM Property contact page for a consultation.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      leadService.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not provided',
        propertyTitle: subject,
        message: `[Subject: ${subject}] ${message.trim()}`,
        type: 'general',
        status: 'New'
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  const faqs = [
    {
      q: 'How does AM Property verify property titles in DHA Lahore?',
      a: 'We conduct official title audits directly with DHA Lahore’s Transfer & Record branch, verifying ownership letters, checking for non-encumbrance, confirming utility clearance, and ensuring an official NDC (No Demand Certificate) is in place.'
    },
    {
      q: 'Can Overseas Pakistanis buy property remotely through AM Property?',
      a: 'Yes. We facilitate end-to-end remote transactions using verified Special Power of Attorney (attested by the relevant Pakistani Embassy/Consulate), coordinate bank-to-bank transfers via Roshan Digital Accounts, and deliver original files via secure insured international courier.'
    },
    {
      q: 'What are typical commercial rental yields in Gulberg and DHA CCA?',
      a: 'Currently, commercial plazas and ground floor retail shops in Gulberg III and DHA Phase 5 CCA yield between 8% to 14% net annualized rental returns with annual 10% rent escalation clauses.'
    },
    {
      q: 'Are your listed prices negotiable with property owners?',
      a: 'All our listings reflect genuine owner demands. In Pakistani real estate, a customary sitting and final price negotiation takes place between buyer and seller at our office once token intent is established.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-navy-950 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-950 font-bold">Contact Us</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200 inline-block mb-2">
            Headquartered in DHA Phase 5, Lahore
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
            Connect with Our Senior Property Advisors
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Visit our consultancy office in DHA Lahore, connect instantly via WhatsApp, or send an inquiry below.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Information Cards + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Office Details */}
        <div className="space-y-6">
          {/* Office Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-navy-950 pb-3 border-b border-slate-100">
              Consultancy Office
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-slate-700">
                <div className="p-2 rounded-xl bg-slate-100 text-gold-600 flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">Address</span>
                  <p className="text-slate-600 mt-0.5">{cms.company.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700">
                <div className="p-2 rounded-xl bg-slate-100 text-gold-600 flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">Direct Hotline</span>
                  <a href={`tel:${cms.company.phone}`} className="text-slate-600 hover:text-navy-950">
                    {cms.company.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700">
                <div className="p-2 rounded-xl bg-slate-100 text-gold-600 flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">Official Email</span>
                  <a href={`mailto:${cms.company.email}`} className="text-slate-600 hover:text-navy-950">
                    {cms.company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700">
                <div className="p-2 rounded-xl bg-slate-100 text-gold-600 flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">Consultancy Hours</span>
                  <p className="text-slate-600 mt-0.5 text-xs">{cms.company.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Accreditation Box */}
          <div className="bg-navy-950 text-white rounded-3xl border border-navy-800 p-6 space-y-3">
            <div className="flex items-center gap-2 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Certified Authority</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Defence Housing Authority (DHA) Lahore Registered Agency #1420 & Lahore Development Authority (LDA) Authorized Partner.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form (2 cols) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-luxury">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950">Thank You, {name}</h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                    Your inquiry has been logged in our lead management system. Our Principal Consultant will review your request and get in touch via phone/WhatsApp within 2 business hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below. We respond promptly with verified property options and market intelligence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mian Farhan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Consultancy Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-gold-500 focus:outline-none"
                    >
                      <option value="Buying Property in DHA Lahore">Buying Property in DHA Lahore</option>
                      <option value="Selling a Luxury House or Plot">Selling a Luxury House or Plot</option>
                      <option value="Commercial Plaza Investment">Commercial Plaza Investment</option>
                      <option value="Executive Rental Inquiries">Executive Rental Inquiries</option>
                      <option value="Overseas Pakistani Land Acquisition">Overseas Pakistani Land Acquisition</option>
                      <option value="Legal & NDC Due Diligence">Legal & NDC Due Diligence</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Message / Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your desired location (e.g. DHA Phase 6 or Gulberg), budget range, property size, or any specific investment questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry to AM Property'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Visual Embed Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold">Visit Our DHA Phase 5 Office</h3>
            <p className="text-xs text-slate-300 mt-0.5">Central Commercial Area (CCA), DHA Phase 5, Lahore, Punjab, Pakistan</p>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${cms.company.address}, Lahore, Pakistan`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs transition-colors hidden sm:inline-block"
          >
            Get Driving Directions
          </a>
        </div>

        <div className="relative aspect-[21/9] bg-slate-100 flex items-center justify-center">
          {/* Stylized Map View */}
          <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>

          <div className="relative text-center p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 max-w-md">
            <div className="w-12 h-12 rounded-full bg-navy-950 text-gold-400 flex items-center justify-center mx-auto mb-3 shadow-md">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            <h4 className="font-serif text-base font-bold text-navy-950">AM Property & Consultancy HQ</h4>
            <p className="text-xs text-slate-500 mt-1">{cms.company.address}</p>
            <p className="text-[11px] text-gold-700 font-semibold mt-2">DHA Phase 5 CCA — Convenient Parking & Security</p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Common Inquiries</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-serif text-base font-bold text-navy-950 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
