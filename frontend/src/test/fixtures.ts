import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nomad Canvas',
    slug: 'nomad-canvas',
    description: 'Durable daily carry.',
    price: 120,
    images: ['https://placehold.co/600x600?text=Nomad+Canvas'],
    category: 'backpack',
    material: 'canvas',
    inStock: true,
  },
  {
    id: '2',
    name: 'Executive Leather',
    slug: 'exec-leather',
    description: 'Premium office tote.',
    price: 250,
    images: ['https://placehold.co/600x600?text=Executive+Leather'],
    category: 'tote',
    material: 'leather',
    inStock: true,
  },
  {
    id: '3',
    name: 'Urban Nylon',
    slug: 'urban-nylon',
    description: 'Waterproof commuter duffel.',
    price: 95,
    images: ['https://placehold.co/600x600?text=Urban+Nylon'],
    category: 'duffel',
    material: 'nylon',
    inStock: false,
  },
];

export const inStockProduct = mockProducts[0];
export const outOfStockProduct = mockProducts[2];
