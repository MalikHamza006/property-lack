import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/formatters';

interface WhatsAppFloatProps {
  whatsappNumber?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  whatsappNumber = '923001234567'
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    'Assalam-o-Alaikum, I am visiting the AM Property & Consultancy website and would like to speak with a property consultant.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 text-xs text-navy-950 animate-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-navy-950 text-[11px] uppercase tracking-wider">
              AM Consultancy Online
            </span>
          </div>

          <p className="text-slate-600 pr-3">
            Looking for luxury homes, plots or commercial properties in DHA Lahore? Chat directly with our senior consultant on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200 relative group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 animate-ping opacity-25 pointer-events-none"></span>

        {/* Hover label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-navy-950 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
