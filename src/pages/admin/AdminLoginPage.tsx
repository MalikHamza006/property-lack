import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { authService, DEMO_CREDENTIALS } from '../../services/authService';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = authService.login(email, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Authentication failed');
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-slate-950 overflow-hidden font-sans">
      {/* Background Luxury Architectural Villa Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Architecture Background"
          className="w-full h-full object-cover scale-105"
        />
        {/* Harmonious Dark Twilight Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-950/45 to-slate-950/70" />
      </div>

      {/* Aesthetic Glassmorphic Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Soft Ambient Light Glows Matching the Villa & Pool */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Real Frosted Glass Card */}
        <div className="relative rounded-3xl p-8 sm:p-10 backdrop-blur-2xl bg-slate-950/45 border border-white/25 border-t-white/40 border-l-white/40 shadow-[0_16px_40px_rgba(0,0,0,0.65)] space-y-6 overflow-hidden">
          {/* Subtle Glass Sheen Diagonal Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-amber-500/[0.04] pointer-events-none rounded-3xl" />

          {/* Brand Header */}
          <div className="relative text-center space-y-2">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/25 to-white/10 border border-amber-300/40 backdrop-blur-xl text-amber-300 shadow-lg shadow-amber-500/10 mb-1 transition-transform hover:scale-105"
            >
              <Building2 className="w-7 h-7 drop-shadow" />
            </Link>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
              AM Property CMS
            </h2>
            <p className="text-xs uppercase font-extrabold tracking-widest text-amber-300 drop-shadow-sm">
              Administrative Portal • Lahore
            </p>
          </div>

          {/* 1-Click Demo Login Quick Access Glass Pill */}
          <div className="relative p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-amber-400/35 flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-amber-300 block tracking-wide">Demo Quick Access</span>
                <span className="text-xs text-slate-200 font-medium">1-Click Auto Fill</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFillDemo}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              Fill Credentials
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/25 backdrop-blur-md border border-rose-500/40 text-rose-100 text-xs text-center font-medium animate-in fade-in">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="relative space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 drop-shadow-sm">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@amproperty.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:border-amber-400 focus:bg-slate-900/75 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 drop-shadow-sm">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:border-amber-400 focus:bg-slate-900/75 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 mt-2 active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="relative pt-3 text-center space-y-2 border-t border-white/15">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DHA & LDA Partner Management Console</span>
            </div>
            <div>
              <Link to="/" className="text-slate-300 hover:text-white text-xs underline transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
