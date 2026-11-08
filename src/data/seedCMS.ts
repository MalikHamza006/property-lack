import { SiteContent } from '../types/cms';

export const SEED_CMS: SiteContent = {
  company: {
    name: 'AM Property & Consultancy',
    tagline: 'Your Trusted Real Estate & Investment Partners in Lahore',
    phone: '+92 300 1234567',
    phoneDisplay: '+92 (300) 123-4567',
    whatsapp: '923001234567',
    email: 'info@ampropertyconsultancy.com',
    address: 'Plaza 14-CCA, Sector C, Phase 5, DHA Lahore, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    workingHours: 'Monday – Saturday: 10:00 AM – 8:00 PM (Sunday by Appointment)',
    logoUrl: ''
  },
  socialLinks: {
    facebook: 'https://facebook.com/ampropertyconsultancy',
    instagram: 'https://instagram.com/ampropertyconsultancy',
    youtube: 'https://youtube.com/@ampropertyconsultancy',
    linkedin: 'https://linkedin.com/company/ampropertyconsultancy'
  },
  hero: {
    badge: 'ESTABLISHED 2011 • DHA & LDA AUTHORIZED PARTNERS',
    title: 'Discover Exceptional Properties & High-Yield Investments in',
    highlightWord: 'Lahore',
    subtitle: 'From ultra-luxury modern villas in DHA to prime commercial plazas in Gulberg and high-growth plots in Bahria Town, we engineer seamless transactions and verified wealth creation.',
    stats: {
      transactionsValue: 'PKR 14.8+ Billion',
      satisfiedClients: '1,250+',
      yearsExperience: '15+ Years',
      verifiedProperties: '100% DHA/LDA'
    }
  },
  about: {
    heading: 'Pioneering Transparency & Trust in Pakistani Real Estate',
    subheading: 'A bespoke consultancy dedicated to high-net-worth families, overseas Pakistanis, and institutional investors.',
    story: [
      'Founded in 2011 with a singular objective: bring genuine institutional transparency, legal due diligence, and authentic market valuations to the Pakistani real estate landscape.',
      'Headquartered in DHA Phase 5 Lahore, AM Property & Consultancy has facilitated over PKR 14.8 Billion in successful residential sales, commercial acquisitions, and rental portfolio management.',
      'Whether you are an overseas Pakistani seeking safe high-yield land investments or a family searching for your dream custom-built luxury home in DHA or Gulberg, our licensed consultants guide you every step from transfer to keys handover.'
    ],
    mission: 'To empower clients with data-driven real estate intelligence, foolproof legal title verification, and world-class client service across Pakistan.',
    vision: 'To be South Asia’s most trusted real estate consultancy for luxury estates, commercial projects, and diaspora investment portfolios.',
    statsCount: '15+ Years of Proven Excellence'
  },
  services: [
    {
      id: 'srv-1',
      title: 'Luxury Property Buying',
      description: 'Exclusive portfolio of vetted luxury designer houses, modern villas, and penthouses with 100% clear titles and fair market valuation.',
      iconName: 'Home',
      features: ['DHA & LDA verification', 'Direct owner negotiation', 'Physical structural audit', 'Complete transfer guidance']
    },
    {
      id: 'srv-2',
      title: 'Strategic Property Selling',
      description: 'Premium marketing, targeted high-net-worth buyer network, professional 4K videography, and rapid deal closure at peak market pricing.',
      iconName: 'TrendingUp',
      features: ['Professional photography', 'Targeted digital campaigns', 'Qualified buyer vetting', 'Zero hassle documentation']
    },
    {
      id: 'srv-3',
      title: 'Commercial Real Estate',
      description: 'Acquisition and leasing of commercial plazas, retail shops, and corporate office floors in Gulberg, DHA CCA, and Main Boulevards.',
      iconName: 'Building2',
      features: ['Rental yield analysis (8-14%)', 'Tenant vetting & agreements', 'Plaza construction advisory', 'Anchor tenant placements']
    },
    {
      id: 'srv-4',
      title: 'High-Yield Plot Investments',
      description: 'Direct possession and pre-launch plot files in high-growth sectors of DHA Phases 6, 7, 8, 9 Prism, and Bahria Town with exceptional appreciation.',
      iconName: 'MapPin',
      features: ['Official NDC and transfer', 'Pair plot acquisitions', 'Corner & park-facing selection', 'Exit strategy planning']
    },
    {
      id: 'srv-5',
      title: 'Executive Rental Management',
      description: 'Turnkey leasing services for high-end residential homes and penthouses for multinational diplomats, corporate executives, and expats.',
      iconName: 'Key',
      features: ['Tenant background checks', 'Legally vetted lease contracts', 'Rent collection escrow', 'Routine property inspection']
    },
    {
      id: 'srv-6',
      title: 'Overseas Pakistani Advisory',
      description: 'Dedicated virtual consultation, digital video walkthroughs, power of attorney facilitation, and safe banking remittance management.',
      iconName: 'Globe',
      features: ['Time-zone flexible video meetings', 'Roshan Digital Account support', 'DHA Power of Attorney transfers', 'End-to-end transparency']
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Malik Sohail Ahmad',
      role: 'CEO, Al-Ahmad Fabrics & Overseas Investor',
      location: 'London / Lahore',
      content: 'As an overseas Pakistani living in London for 20 years, finding a real estate firm you can trust with your hard-earned savings is daunting. AM Property handled our 2 Kanal DHA Phase 5 mansion purchase flawlessly from NDC verification to the final deed transfer. Outstanding professionalism.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'test-2',
      name: 'Dr. Fatima Tariq',
      role: 'Consultant Surgeon',
      location: 'DHA Phase 6, Lahore',
      content: 'Their deep knowledge of DHA Lahore block-by-block dynamics helped us secure a brand new 1 Kanal designer villa at a price significantly below market value. The team is polite, punctual, and strictly ethical. Highly recommended!',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'test-3',
      name: 'Chaudhry Kamran Riaz',
      role: 'Managing Director, Apex Logistics',
      location: 'Gulberg III, Lahore',
      content: 'We acquired a 5-story commercial building on Main Boulevard Gulberg through AM Property & Consultancy. Their projected rental yield analysis was 100% accurate, and they also helped us sign an anchor banking tenant within 45 days of acquisition.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    }
  ],
  team: [
    {
      id: 'team-1',
      name: 'Abdul Malik Khan',
      role: 'Founder & Principal Consultant',
      phone: '+92 300 1234567',
      email: 'malik@ampropertyconsultancy.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      experience: '18+ Years in DHA Lahore & Commercial Real Estate'
    },
    {
      id: 'team-2',
      name: 'Barrister Daniyal Qureshi',
      role: 'Head of Legal & Title Due Diligence',
      phone: '+92 321 9876543',
      email: 'legal@ampropertyconsultancy.com',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experience: 'Advocate High Court, Specialized in Property Law'
    },
    {
      id: 'team-3',
      name: 'Farhan Ali Sheikh',
      role: 'Director of Commercial & Corporate Leasing',
      phone: '+92 302 5556677',
      email: 'commercial@ampropertyconsultancy.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      experience: '12+ Years in Gulberg Plazas & Retail Franchises'
    },
    {
      id: 'team-4',
      name: 'Zainab Noor',
      role: 'Senior Consultant — Overseas Pakistani Desk',
      phone: '+92 333 4443322',
      email: 'overseas@ampropertyconsultancy.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      experience: 'Facilitated 300+ Diaspora Investments from UAE, UK & USA'
    }
  ],
  seo: {
    homeTitle: 'AM Property & Consultancy | Luxury Real Estate & Investment Advisors Lahore',
    homeDescription: 'Discover luxury houses, modern villas, commercial plazas, and prime plots in DHA Lahore, Bahria Town, and Gulberg. Licensed real estate consultants with 15+ years experience.',
    keywords: 'Real Estate Lahore, DHA Lahore Houses, Bahria Town Plots, Commercial Plaza Gulberg, Luxury Houses Lahore, AM Property and Consultancy',
    ogImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    propertyTitleTemplate: '{title} | AM Property & Consultancy',
    propertyDescriptionTemplate: 'Explore {title} in {area}, Lahore. Priced at {price}. Direct contact with AM Property & Consultancy.'
  }
};
