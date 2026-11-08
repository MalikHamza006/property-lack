import React, { useState } from 'react';
import { X, CheckCircle, Building, MapPin, Coins, User, Phone, Mail } from 'lucide-react';
import { leadService } from '../../services/leadService';

interface SubmitPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitPropertyModal: React.FC<SubmitPropertyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale');
  const [category, setCategory] = useState('house');
  const [area, setArea] = useState('DHA Phase 6');
  const [demandPrice, setDemandPrice] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !propertyTitle.trim()) return;

    setIsSubmitting(true);

    try {
      const summaryMsg = `Owner Property Submission: [Purpose: ${purpose.toUpperCase()}] [Type: ${category}] [Location: ${area}] [Demand: PKR ${demandPrice || 'Flexible'}] - Additional Info: ${details || 'None provided'}`;

      leadService.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not provided',
        propertyTitle: propertyTitle.trim(),
        message: summaryMsg,
        type: 'sell_submission',
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
    setPropertyTitle('');
    setDemandPrice('');
    setDetails('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-navy-950 text-white p-5 flex items-start justify-between border-b border-navy-800 flex-shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
              Direct Owner Submission
            </span>
            <h3 className="font-serif text-lg font-bold">
              List Your Property with AM Property & Consultancy
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Connect with verified cash buyers, corporate tenants, and overseas investors in Lahore.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-navy-950">Property Submitted Successfully</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Our listing assessment team will review your property specifications and call you at <span className="font-semibold text-navy-900">{phone}</span> to schedule a free valuation and photography session.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Purpose Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Listing Purpose *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPurpose('sale')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      purpose === 'sale'
                        ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    I Want to Sell My Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      purpose === 'rent'
                        ? 'border-navy-950 bg-navy-50 text-navy-950 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    I Want to Rent Out My Property
                  </button>
                </div>
              </div>

              {/* Title / Short Headline */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Property Title / Brief Specs *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Kanal Modern Spanish House, DHA Phase 6"
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Category & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none bg-white"
                  >
                    <option value="house">House / Villa</option>
                    <option value="plot">Plot / Land</option>
                    <option value="commercial">Commercial Plaza / Shop</option>
                    <option value="apartment">Apartment / Penthouse</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Location (Lahore) *</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none bg-white"
                  >
                    <option value="DHA Phase 5">DHA Phase 5</option>
                    <option value="DHA Phase 6">DHA Phase 6</option>
                    <option value="DHA Phase 7">DHA Phase 7</option>
                    <option value="DHA Phase 8">DHA Phase 8</option>
                    <option value="DHA Phase 9 Prism">DHA Phase 9 Prism</option>
                    <option value="Gulberg II / III">Gulberg II / III</option>
                    <option value="Bahria Town">Bahria Town Lahore</option>
                    <option value="Johar Town">Johar Town</option>
                    <option value="Lake City">Lake City</option>
                    <option value="Other Area">Other Lahore Area</option>
                  </select>
                </div>
              </div>

              {/* Demand Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-slate-400" />
                  Your Asking / Demand Price (PKR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8.5 Crore or 4.5 Lakh / month"
                  value={demandPrice}
                  onChange={(e) => setDemandPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Owner Contact Information */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Owner / Representative Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Malik Hamza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="owner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Additional details */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Property Description / Special Features
                </label>
                <textarea
                  rows={2}
                  placeholder="Bedrooms, covered area, corner plot, park facing, possession status..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Property for Listing'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
