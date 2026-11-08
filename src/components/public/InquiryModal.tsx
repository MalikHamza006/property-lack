import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Calendar, Phone, Mail, User, Building } from 'lucide-react';
import { Property } from '../../types/property';
import { leadService } from '../../services/leadService';
import { getWhatsAppUrl } from '../../utils/formatters';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  whatsappNumber?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  whatsappNumber = '923001234567'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isViewing, setIsViewing] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    try {
      leadService.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not provided',
        propertyId: property?.id,
        propertyCode: property?.code,
        propertyTitle: property?.title,
        message: message.trim() || (isViewing ? `Requested private viewing for ${preferredDate || 'upcoming weekend'}` : 'Requested details on property'),
        type: isViewing ? 'viewing_request' : 'inquiry',
        preferredDate: preferredDate || undefined
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
    setPreferredDate('');
    setSubmitted(false);
    onClose();
  };

  const directWhatsAppUrl = getWhatsAppUrl(
    whatsappNumber,
    `Assalam-o-Alaikum, I am ${name || 'an interested client'}. I just submitted an inquiry for ${property ? `${property.code} - ${property.title}` : 'real estate consultation in Lahore'}. My phone is ${phone}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-navy-950 text-white p-5 flex items-start justify-between border-b border-navy-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
              AM Property & Consultancy
            </span>
            <h3 className="font-serif text-lg font-bold">
              {property ? 'Schedule Site Visit & Inquiry' : 'Contact Real Estate Consultant'}
            </h3>
            {property && (
              <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-mono">
                {property.code}: {property.title} ({property.priceDisplay})
              </p>
            )}
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-navy-950">Inquiry Received</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-navy-900">{name}</span>. Our senior DHA consultant has received your inquiry and will contact you shortly via phone/WhatsApp.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Connect on WhatsApp Now
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsViewing(true)}
                  className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    isViewing ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  Request Site Visit
                </button>
                <button
                  type="button"
                  onClick={() => setIsViewing(false)}
                  className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    !isViewing ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-gold-600" />
                  Ask Question / Inquiry
                </button>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malik Tariq"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferred Date if viewing */}
              {isViewing && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Preferred Visit Date & Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. This Saturday afternoon 4:00 PM"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder={property ? "Share any specific questions or timeline requirements..." : "Tell us what property type, area or budget you are exploring..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry & Request Callback'}</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Your contact details are kept strictly confidential by AM Property & Consultancy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
