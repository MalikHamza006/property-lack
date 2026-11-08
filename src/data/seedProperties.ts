import { Property } from '../types/property';

export const SEED_PROPERTIES: Property[] = [
  // 1. Luxury House - DHA Phase 6
  {
    id: 'prop-1',
    code: 'AM-101',
    title: '1 Kanal Ultra Modern Luxury Villa with Swimming Pool',
    slug: '1-kanal-ultra-modern-luxury-villa-dha-phase-6',
    purpose: 'sale',
    category: 'house',
    propertyType: '1 Kanal Modern Villa',
    price: 95000000, // 9.5 Crore PKR
    priceDisplay: 'PKR 9.50 Crore',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 6',
      sectorOrBlock: 'Sector J',
      address: 'House #42, Main Commercial Proximity, Sector J, DHA Phase 6, Lahore'
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      area: 1,
      areaUnit: 'Kanal',
      coveredArea: '5,800 sq ft',
      floors: 2,
      parkingSpaces: 3,
      builtYear: 2025
    },
    description: 'An architectural masterpiece in DHA Phase 6 Sector J, built to perfection with imported Italian porcelain tiles, solid ash wood doors, double-height lobby, and private indoor heating swimming pool. Includes 2 designer show kitchens fitted with Spanish appliances, spacious basement cinema room, smart automated security system, and lush manicured lawn.',
    features: [
      'Indoor Swimming Pool',
      'Double Height Ceiling Lobby',
      'Imported Spanish Kitchen Appliances',
      'Basement Cinema / Entertainment Lounge',
      'Solid Ash Woodwork & Doors',
      'Grohe & Kohler Bathroom Fittings',
      'Smart Home Automation',
      'Lush Green Front Lawn & Patio',
      'Dedicated Servant Quarters',
      'Solar Panel System 15kW'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 1420,
    createdAt: '2026-10-15T10:00:00Z',
    updatedAt: '2026-11-01T12:00:00Z'
  },

  // 2. Luxury House - DHA Phase 5
  {
    id: 'prop-2',
    code: 'AM-102',
    title: '2 Kanal Royal Spanish Palace on Boulevard Corner',
    slug: '2-kanal-royal-spanish-palace-dha-phase-5',
    purpose: 'sale',
    category: 'house',
    propertyType: '2 Kanal Spanish Mansion',
    price: 185000000, // 18.5 Crore PKR
    priceDisplay: 'PKR 18.50 Crore',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 5',
      sectorOrBlock: 'Sector C',
      address: 'Plot 18-C, 150-Ft Boulevard Corner, DHA Phase 5, Lahore'
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      area: 2,
      areaUnit: 'Kanal',
      coveredArea: '9,200 sq ft',
      floors: 2,
      parkingSpaces: 5,
      builtYear: 2024
    },
    description: 'A bespoke 2 Kanal Spanish corner residence situated on the premier 150-foot boulevard in DHA Phase 5. Features grand crystal chandeliers, royal dining for 18 guests, executive study, elevator, infinity rooftop terrace with DHA skyline views, and separate 3-car garage. Fully LDA & DHA certified.',
    features: [
      'Private In-House Hydraulic Elevator',
      'Prime 150-Ft Boulevard Corner',
      '6 Master En-Suite Bedrooms with Jacuzzis',
      'Imported Spanish Marble & Onyx Vanities',
      'Commercial Kitchen + Wet Kitchen',
      'Home Gym and Steam Sauna',
      'CCTV 16-Channel Surveillance',
      '2 Independent Servant Rooms'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 2150,
    createdAt: '2026-09-20T08:30:00Z',
    updatedAt: '2026-11-04T15:10:00Z'
  },

  // 3. Modern House - Bahria Town Sector C
  {
    id: 'prop-3',
    code: 'AM-103',
    title: '10 Marla Brand New Modern House Facing Park',
    slug: '10-marla-brand-new-modern-house-bahria-town-sector-c',
    purpose: 'sale',
    category: 'house',
    propertyType: '10 Marla House',
    price: 43500000, // 4.35 Crore PKR
    priceDisplay: 'PKR 4.35 Crore',
    location: {
      city: 'Lahore',
      area: 'Bahria Town',
      sectorOrBlock: 'Sector C',
      address: 'Street 14, Gulbahar Block, Sector C, Bahria Town, Lahore'
    },
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      area: 10,
      areaUnit: 'Marla',
      coveredArea: '3,300 sq ft',
      floors: 2,
      parkingSpaces: 2,
      builtYear: 2025
    },
    description: 'Impeccably finished 10 Marla home facing a lush green family park and walking distance from Grand Jamia Mosque and Jasmine Mall. Features open concept living with high ceilings, tempered glass staircases, German kitchen accessories, and an outdoor barbecue terrace.',
    features: [
      'Direct Park Facing',
      'Close to Grand Jamia Mosque & Mall',
      'Tempered Glass Balustrades',
      'German Fitting Kitchen',
      'Rooftop BBQ Grill Terrace',
      'Independent Water & Gas Meters'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 980,
    createdAt: '2026-10-28T14:15:00Z',
    updatedAt: '2026-11-06T11:00:00Z'
  },

  // 4. Designer Villa - Gulberg III
  {
    id: 'prop-4',
    code: 'AM-104',
    title: '1 Kanal Contemporary Designer Villa Near MM Alam Road',
    slug: '1-kanal-contemporary-designer-villa-gulberg-iii',
    purpose: 'sale',
    category: 'house',
    propertyType: '1 Kanal Designer House',
    price: 118000000, // 11.8 Crore PKR
    priceDisplay: 'PKR 11.80 Crore',
    location: {
      city: 'Lahore',
      area: 'Gulberg III',
      sectorOrBlock: 'Block K',
      address: 'Main Canal Access, Block K, Gulberg III, Lahore'
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      area: 1,
      areaUnit: 'Kanal',
      coveredArea: '6,100 sq ft',
      floors: 2,
      parkingSpaces: 4,
      builtYear: 2025
    },
    description: 'Located in the heart of Gulberg III minutes from MM Alam Road and Main Boulevard. Designed by one of Pakistan’s top architects with custom stone facade, floor-to-ceiling glass windows, Turkish chandeliers, private sauna, and temperature-controlled wine cellar style pantry.',
    features: [
      'Heart of Gulberg III Location',
      'Floor to Ceiling Soundproof Glazing',
      'Turkish Chandeliers & Feature Walls',
      'Private Sauna & Steam Room',
      '4 Car Secure Garage',
      'Dedicated Guard Post'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 1650,
    createdAt: '2026-10-02T11:20:00Z',
    updatedAt: '2026-11-05T09:40:00Z'
  },

  // 5. Rental - 2 Kanal Residence DHA Phase 5
  {
    id: 'prop-5',
    code: 'AM-201',
    title: '2 Kanal Executive Fully Furnished Diplomatic Residence',
    slug: '2-kanal-executive-fully-furnished-dha-phase-5-rent',
    purpose: 'rent',
    category: 'house',
    propertyType: '2 Kanal Furnished House',
    price: 850000, // 8.5 Lakh / month
    priceDisplay: 'PKR 8.50 Lakh / month',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 5',
      sectorOrBlock: 'Sector A',
      address: 'Boulevard Lane, Sector A, DHA Phase 5, Lahore'
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      area: 2,
      areaUnit: 'Kanal',
      coveredArea: '8,500 sq ft',
      floors: 2,
      parkingSpaces: 4,
      builtYear: 2024
    },
    description: 'Fully furnished to high international corporate standards. Suited for multinational executives, diplomats, or large families. Features central VRF climate control, 100% backup generator, imported leather sofas, 85-inch 4K smart TVs in all suites, and high-security guard quarters.',
    features: [
      '100% Backup Power Generator (60 kVA)',
      'Central Inverter VRF Air Conditioning',
      'Fully Furnished with Designer European Furniture',
      'High Security Border Walls & Razor Wire',
      'Separate Cook & Butler Quarters',
      'Fast Fiber-Optic 200 Mbps Dedicated Internet'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 890,
    createdAt: '2026-10-18T16:00:00Z',
    updatedAt: '2026-11-07T10:15:00Z'
  },

  // 6. Rental - 1 Kanal Villa DHA Phase 6
  {
    id: 'prop-6',
    code: 'AM-202',
    title: '1 Kanal Brand New Designer House for Rent in DHA Phase 6',
    slug: '1-kanal-brand-new-house-dha-phase-6-rent',
    purpose: 'rent',
    category: 'house',
    propertyType: '1 Kanal House',
    price: 450000, // 4.5 Lakh / month
    priceDisplay: 'PKR 4.50 Lakh / month',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 6',
      sectorOrBlock: 'Sector L',
      address: 'Near Raya Fairways Club, Sector L, DHA Phase 6, Lahore'
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      area: 1,
      areaUnit: 'Kanal',
      coveredArea: '5,200 sq ft',
      floors: 2,
      parkingSpaces: 3,
      builtYear: 2025
    },
    description: 'Walking distance from Defence Raya Golf & Country Club. Pristine brand-new condition with 5 spacious suites, 2 state-of-the-art kitchens, double living rooms, powder room, and servant room. Available for immediate possession.',
    features: [
      'Walking Distance to Defence Raya Club',
      'Brand New (Never Occupied)',
      '2 Full Kitchens with Gas Connections',
      'Inverter ACs Installed Throughout',
      'Gated Street with 24/7 DHA Patrol'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 710,
    createdAt: '2026-10-22T09:00:00Z',
    updatedAt: '2026-11-06T14:20:00Z'
  },

  // 7. Rental - Luxury Penthouse Gulberg III
  {
    id: 'prop-7',
    code: 'AM-203',
    title: '3-Bed Luxury Furnished Penthouse with Panoramic Terrace',
    slug: '3-bed-luxury-furnished-penthouse-gulberg-iii-rent',
    purpose: 'rent',
    category: 'apartment',
    propertyType: 'Luxury Penthouse',
    price: 380000, // 3.8 Lakh / month
    priceDisplay: 'PKR 3.80 Lakh / month',
    location: {
      city: 'Lahore',
      area: 'Gulberg III',
      sectorOrBlock: 'Near Mini Market',
      address: '14th Floor, Skyline Grand Residences, Gulberg III, Lahore'
    },
    specs: {
      bedrooms: 3,
      bathrooms: 4,
      area: 3200,
      areaUnit: 'Sq. Ft.',
      coveredArea: '3,200 sq ft',
      floors: 1,
      parkingSpaces: 2,
      builtYear: 2024
    },
    description: 'Breathtaking 14th-floor penthouse overlooking Lahore Gymkhana and Gaddafi Stadium skyline. Features wrap-around open-air terrace, master jacuzzi, concierge reception, fitness gym on 3rd floor, and dedicated underground reserved parking slots.',
    features: [
      'Panoramic 360-degree City View Terrace',
      '24/7 Concierge and Card Access Elevators',
      'Resident Gymnasium & Rooftop Cafe Access',
      'Underground Basement Parking (2 Bays)',
      '100% Standby Power'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 1140,
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-11-05T17:30:00Z'
  },

  // 8. Rental - 10 Marla Portion Johar Town
  {
    id: 'prop-8',
    code: 'AM-204',
    title: '10 Marla Brand New Upper Portion Near Shaukat Khanum',
    slug: '10-marla-brand-new-upper-portion-johar-town-rent',
    purpose: 'rent',
    category: 'house',
    propertyType: '10 Marla Upper Portion',
    price: 130000, // 1.30 Lakh / month
    priceDisplay: 'PKR 1.30 Lakh / month',
    location: {
      city: 'Lahore',
      area: 'Johar Town',
      sectorOrBlock: 'Phase 2, Block G3',
      address: 'Block G-3, 5 Mins from Expo Centre, Johar Town, Lahore'
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      area: 10,
      areaUnit: 'Marla',
      coveredArea: '1,800 sq ft',
      floors: 1,
      parkingSpaces: 1,
      builtYear: 2025
    },
    description: 'Independent access brand new upper portion in prime Johar Town Phase 2. Clean modern tiles, open American kitchen, spacious terrace, independent electricity and gas meters. Ideal for doctors, IT professionals, or small families.',
    features: [
      'Separate Independent Entrance & Stairs',
      'Independent Electricity & Gas Meters',
      '3 Ensuite Bedrooms with Wardrobes',
      'Close to Shaukat Khanum, Emporium & Expo',
      'Peaceful Residential Street'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 520,
    createdAt: '2026-11-01T08:00:00Z',
    updatedAt: '2026-11-07T11:00:00Z'
  },

  // 9. Plot - 1 Kanal Pair Plot DHA Phase 7
  {
    id: 'prop-9',
    code: 'AM-301',
    title: '1 Kanal Prime Location Pair Plot Facing 100-Ft Road',
    slug: '1-kanal-prime-location-plot-dha-phase-7',
    purpose: 'sale',
    category: 'plot',
    propertyType: '1 Kanal Residential Plot',
    price: 36500000, // 3.65 Crore PKR
    priceDisplay: 'PKR 3.65 Crore',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 7',
      sectorOrBlock: 'Sector U',
      address: 'Plot #312, Facing 100-Ft Road, Sector U, DHA Phase 7, Lahore'
    },
    specs: {
      area: 1,
      areaUnit: 'Kanal'
    },
    description: 'Golden investment opportunity in DHA Phase 7 Sector U. Level ground, direct possession available, all dues completely cleared with official DHA verification letter. Direct 100-foot wide road with fast construction happening in surrounding streets.',
    features: [
      'DHA Allocation & Transfer Ready',
      'All Development Charges Fully Paid',
      'Possession Available for Immediate Construction',
      '100-Ft Wide Road Frontage',
      'Near Upcoming Sector U Commercial Arena',
      'Underground Electricity & High-Pressure Gas'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 1830,
    createdAt: '2026-10-10T12:00:00Z',
    updatedAt: '2026-11-04T08:30:00Z'
  },

  // 10. Plot - 10 Marla Commercial Bahria Town
  {
    id: 'prop-10',
    code: 'AM-302',
    title: '10 Marla Commercial Corner Plot on Main Boulevard',
    slug: '10-marla-commercial-corner-plot-bahria-town',
    purpose: 'sale',
    category: 'plot',
    propertyType: '10 Marla Commercial Plot',
    price: 78000000, // 7.80 Crore PKR
    priceDisplay: 'PKR 7.80 Crore',
    location: {
      city: 'Lahore',
      area: 'Bahria Town',
      sectorOrBlock: 'Sector E',
      address: 'Corner Plot, Janiper Commercial, Sector E, Bahria Town, Lahore'
    },
    specs: {
      area: 10,
      areaUnit: 'Marla'
    },
    description: 'High footfall commercial corner plot with approval for Basement + Ground + 5 Floors commercial plaza. Surrounded by operational national banks, clothing brands, and fast-food chains. Exceptional projected ROI of 14-16% on plaza construction.',
    features: [
      'Basement + Ground + 5 Floors Plaza Approval',
      'Corner Location with Double Road Exposure',
      'High Pedestrian & Vehicle Traffic Density',
      'Complete Bahria Registry & Clear Title',
      'Surrounded by Active Retailers and Banks'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 1390,
    createdAt: '2026-10-12T15:30:00Z',
    updatedAt: '2026-11-02T13:45:00Z'
  },

  // 11. Plot - 2 Kanal DHA Phase 8 (Park View / Ex-Air Avenue)
  {
    id: 'prop-11',
    code: 'AM-303',
    title: '2 Kanal Corner Luxury Residential Plot in DHA Phase 8',
    slug: '2-kanal-corner-plot-dha-phase-8',
    purpose: 'sale',
    category: 'plot',
    propertyType: '2 Kanal Residential Plot',
    price: 92000000, // 9.20 Crore PKR
    priceDisplay: 'PKR 9.20 Crore',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 8',
      sectorOrBlock: 'Sector W',
      address: 'Plot #88, Facing Central Park, Sector W, DHA Phase 8, Lahore'
    },
    specs: {
      area: 2,
      areaUnit: 'Kanal'
    },
    description: 'Rare 2 Kanal corner plot facing the grand central park in DHA Phase 8 (Adjacent to Allama Iqbal International Airport). Exceptional building dimensions (70 x 130 ft) allowing for a palatial mansion with large front lawn and side driveway.',
    features: [
      'Prime Corner Facing 5-Acre Central Park',
      'Direct Airport & Ring Road Connectivity',
      'DHA Verified Clear Title',
      'Ready for Immediate Construction & Map Approval'
    ],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 1110,
    createdAt: '2026-10-19T10:10:00Z',
    updatedAt: '2026-11-06T18:00:00Z'
  },

  // 12. Commercial - 5-Story Plaza Gulberg III
  {
    id: 'prop-12',
    code: 'AM-401',
    title: 'Brand New 5-Story Commercial Plaza on Main Boulevard Gulberg',
    slug: 'brand-new-5-story-commercial-plaza-gulberg-iii',
    purpose: 'sale',
    category: 'commercial',
    propertyType: 'Commercial Plaza',
    price: 340000000, // 34.00 Crore PKR
    priceDisplay: 'PKR 34.00 Crore',
    location: {
      city: 'Lahore',
      area: 'Gulberg III',
      sectorOrBlock: 'Main Boulevard',
      address: 'Main Boulevard, Opposite Siddiq Trade Centre, Gulberg III, Lahore'
    },
    specs: {
      area: 1,
      areaUnit: 'Kanal',
      coveredArea: '18,500 sq ft',
      floors: 6, // Basement + Ground + 4
      parkingSpaces: 16,
      builtYear: 2025
    },
    description: 'Premier trophy commercial asset in Lahore’s premier financial hub. Complete Basement + Ground + 4 upper corporate floors with Otis passenger lift, curtain glass exterior, dedicated sub-station, and pre-tenancy interest from multinational corporations.',
    features: [
      'Basement + Ground + 4 Corporate Floors',
      'Otis 10-Passenger High-Speed Elevator',
      'Dedicated 200 kVA Substation & Transformer',
      'Fire Sprinkler & Alarm System (Civil Defence Approved)',
      'Underground Basement Parking + Front Valet Area',
      'Potential Rental Yield: PKR 22-25 Lakh / month'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 2890,
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-11-06T16:15:00Z'
  },

  // 13. Commercial - Retail Shop DHA Phase 5 CCA
  {
    id: 'prop-13',
    code: 'AM-402',
    title: 'Ground Floor Premium Retail Shop in DHA Phase 5 CCA',
    slug: 'ground-floor-retail-shop-dha-phase-5-cca',
    purpose: 'sale',
    category: 'commercial',
    propertyType: 'Retail Shop',
    price: 52000000, // 5.20 Crore PKR
    priceDisplay: 'PKR 5.20 Crore',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 5',
      sectorOrBlock: 'CCA 1',
      address: 'Shop #G-4, Central Commercial Area, DHA Phase 5, Lahore'
    },
    specs: {
      area: 650,
      areaUnit: 'Sq. Ft.',
      coveredArea: '650 sq ft',
      floors: 1,
      builtYear: 2024
    },
    description: 'High visibility ground floor shop in the bustling DHA Phase 5 CCA. Currently generating PKR 310,000 / month with an established multinational cafe brand with 3 years remaining on lease. Excellent turn-key passive income investment.',
    features: [
      'Active Rental Income PKR 310,000 / month',
      'Tenanted to Reputed Multinational Chain',
      'Wide Glass Frontage with Heavy Foot Traffic',
      'Backdoor Service Entrance',
      'DHA Verified Ownership & Clean Title'
    ],
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: false,
    published: true,
    viewsCount: 1470,
    createdAt: '2026-10-05T13:40:00Z',
    updatedAt: '2026-11-04T12:00:00Z'
  },

  // 14. Commercial - Corporate Office Floor Gulberg
  {
    id: 'prop-14',
    code: 'AM-403',
    title: '4,500 Sq Ft Corporate Office Floor in Grade-A Tower',
    slug: '4500-sq-ft-corporate-office-floor-gulberg',
    purpose: 'rent',
    category: 'commercial',
    propertyType: 'Corporate Office Floor',
    price: 900000, // 9 Lakh / month
    priceDisplay: 'PKR 9.00 Lakh / month',
    location: {
      city: 'Lahore',
      area: 'Gulberg II',
      sectorOrBlock: 'Jail Road',
      address: '7th Floor, Al-Hafeez Heights, Gulberg II, Lahore'
    },
    specs: {
      area: 4500,
      areaUnit: 'Sq. Ft.',
      coveredArea: '4,500 sq ft',
      floors: 1,
      parkingSpaces: 6,
      builtYear: 2024
    },
    description: 'Fully fitted Grade-A corporate workspace featuring executive boardroom for 16, 4 director cabins, open workstations for 45 staff, IT server room with redundant cooling, cafeteria, and private washrooms.',
    features: [
      'Fully Furnished & Workstation Equipped',
      'Executive Boardroom with Video Conferencing',
      'Dedicated Server Room with Redundant Precision AC',
      '6 Reserved Basement Parking Passes',
      '24/7 Security and Biometric Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    isFeatured: true,
    published: true,
    viewsCount: 930,
    createdAt: '2026-10-20T14:00:00Z',
    updatedAt: '2026-11-06T15:20:00Z'
  }
];
