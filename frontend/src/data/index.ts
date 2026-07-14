import type { Product } from '../types';

export const SITE_CATEGORIES = [
  {
    id: 'tote',
    name: 'Daily Totes',
    description: 'Premium office and market carries',
    href: '/products?category=tote',
    image: 'https://placehold.co/800x1000/f1f5f9/1A1B1E?text=Daily+Totes',
  },
  {
    id: 'backpack',
    name: 'Commuter Backpacks',
    description: 'Ergonomic layouts for the modern nomad',
    href: '/products?category=backpack',
    image: 'https://placehold.co/800x1000/e2e8f0/1A1B1E?text=Commuter+Backpacks',
  },
  {
    id: 'duffel',
    name: 'Weekender Duffels',
    description: 'High-capacity builds for seamless travel',
    href: '/products?category=duffel',
    image: 'https://placehold.co/1200x800/cbd5e1/1A1B1E?text=Weekender+Duffels',
  },
  {
    id: 'clutch',
    name: 'Clutch Bags',
    description: 'Minimalist essentials for evenings out',
    href: '/products?category=clutch',
    image: 'https://placehold.co/800x1000/f1f5f9/1A1B1E?text=Clutch+Bags',
  },
  {
    id: 'barrel',
    name: 'Barrel Bags',
    description: 'Distinctive shapes for daily impact',
    href: '/products?category=barrel',
    image: 'https://placehold.co/800x1000/e2e8f0/1A1B1E?text=Barrel+Bags',
  },
  {
    id: 'pouch',
    name: 'Pouch Bags',
    description: 'Compact organization for small items',
    href: '/products?category=pouch',
    image: 'https://placehold.co/1200x800/cbd5e1/1A1B1E?text=Pouch+Bags',
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Nomad Canvas', 
    slug: 'nomad-canvas', 
    description: 'Durable daily carry backpack made from high-grade canvas.', 
    price: 120, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Nomad+Canvas'], 
    category: 'backpack', 
    material: 'canvas', 
    inStock: true,
    dimensions: '18" H x 12" W x 6" D',
    weight: '1.2 lbs',
    features: ['Water-resistant canvas', 'Padded laptop sleeve (up to 15")', 'Ergonomic shoulder straps', 'Hidden passport pocket']
  },
  { 
    id: '2', 
    name: 'Executive Leather', 
    slug: 'exec-leather', 
    description: 'Premium office tote crafted with full-grain leather.', 
    price: 250, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Executive+Leather'], 
    category: 'tote', 
    material: 'leather', 
    inStock: true,
    dimensions: '14" H x 16" W x 5" D',
    weight: '2.1 lbs',
    features: ['Full-grain Italian leather', 'Solid brass hardware', 'Interior zip pocket', 'Stands upright on flat surfaces']
  },
  { 
    id: '3', 
    name: 'Urban Nylon', 
    slug: 'urban-nylon', 
    description: 'Waterproof commuter duffel for gym and travel.', 
    price: 95, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Urban+Nylon'], 
    category: 'duffel', 
    material: 'nylon', 
    inStock: true,
    dimensions: '10" H x 20" W x 10" D',
    weight: '0.9 lbs',
    features: ['Ripstop waterproof nylon', 'Shoe compartment', 'Removable shoulder strap', 'Machine washable']
  },
  { 
    id: '4', 
    name: 'Midnight Clutch', 
    slug: 'midnight-clutch', 
    description: 'Sleek leather clutch for minimalist evening carries.', 
    price: 85, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Midnight+Clutch'], 
    category: 'clutch', 
    material: 'leather', 
    inStock: true,
    dimensions: '6" H x 9" W x 1.5" D',
    weight: '0.4 lbs',
    features: ['Top-grain matte leather', 'Magnetic snap closure', 'Wristlet strap included', 'Interior card slots']
  },
  { 
    id: '5', 
    name: 'Weekend Barrel', 
    slug: 'weekend-barrel', 
    description: 'Distinctive canvas barrel bag, ideal for short trips.', 
    price: 140, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Weekend+Barrel'], 
    category: 'duffel', 
    material: 'canvas', 
    inStock: true,
    dimensions: '11" H x 22" W x 11" D',
    weight: '1.5 lbs',
    features: ['Heavyweight cotton canvas', 'Reinforced leather bottom', 'Wrap-around handles', 'Lockable zippers']
  },
  { 
    id: '6', 
    name: 'Essential Pouch', 
    slug: 'essential-pouch', 
    description: 'Compact nylon pouch for chargers and small essentials.', 
    price: 45, 
    images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Essential+Pouch'], 
    category: 'pouch', 
    material: 'nylon', 
    inStock: false,
    dimensions: '5" H x 7" W x 2" D',
    weight: '0.2 lbs',
    features: ['Durable ballistic nylon', 'Elastic interior loops for cables', 'Water-resistant zipper', 'Compact profile']
  }
];
