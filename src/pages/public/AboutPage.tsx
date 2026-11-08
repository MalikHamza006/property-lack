import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Users, 
  Phone, 
  Mail, 
  ChevronRight, 
  Home, 
  Target, 
  Eye,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SiteContent } from '../../types/cms';

interface AboutPageProps {
  cms: SiteContent;
  onOpenSubmitProperty: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ cms, onOpenSubmitProperty }) => {
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
          <span className="text-navy-950 font-bold">About Us</span>
        </nav>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200 inline-block mb-2">
            Company Heritage & Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
            {cms.about.heading}
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {cms.about.subheading}
          </p>
        </div>
      </div>

      {/* Story & Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          {cms.about.story.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="pt-3 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-serif text-2xl font-bold text-gold-700">15+ Years</p>
              <p className="text-xs text-slate-500 mt-0.5">Unblemished Trust in Lahore</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-serif text-2xl font-bold text-navy-950">PKR 14.8B+</p>
              <p className="text-xs text-slate-500 mt-0.5">Transactions Facilitated</p>
            </div>
          </div>
        </div>

        {/* Visual collage */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="AM Property Architecture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-navy-950 text-white p-5 rounded-2xl shadow-2xl border border-navy-800 max-w-xs hidden sm:block">
            <div className="flex items-center gap-2 text-gold-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Official Partner</span>
            </div>
            <p className="text-xs text-slate-300">
              Registered Agency with Defence Housing Authority (DHA) & Lahore Development Authority (LDA).
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center border border-gold-200">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy-950">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{cms.about.mission}</p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center border border-navy-200">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy-950">Our Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{cms.about.vision}</p>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="space-y-8 pt-8 border-t border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Experienced Advisors
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Meet Our Leadership & Legal Team
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Seasoned property architects, High Court advocates, and DHA specialists dedicated to protecting your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cms.team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-luxury-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/4] overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-navy-950">{member.name}</h4>
                  <p className="text-xs font-bold text-gold-700">{member.role}</p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">{member.experience}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <a href={`tel:${member.phone}`} className="hover:text-navy-950 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Call</span>
                </a>
                <span className="text-slate-300">|</span>
                <a href={`mailto:${member.email}`} className="hover:text-navy-950 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gold-600" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-navy-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">Have a Property to Sell or Valuation to Request?</h3>
          <p className="text-sm text-slate-300">Our senior valuation partners offer confidential market audits for properties in DHA and Gulberg.</p>
        </div>

        <button
          onClick={onOpenSubmitProperty}
          className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow-md transition-all"
        >
          Submit Property for Evaluation
        </button>
      </div>
    </div>
  );
};
