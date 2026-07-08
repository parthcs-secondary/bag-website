import { useState, useEffect } from 'react';
import type { Product } from '../types';

// Mock hydration - replace with actual fetch implementation
const MOCK_CATALOG: Product[] = [
  { id: '1', name: 'Nomad Canvas', slug: 'nomad-canvas', description: 'Durable daily carry.', price: 120, images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Nomad+Canvas'], category: 'backpack', material: 'canvas', inStock: true },
  { id: '2', name: 'Executive Leather', slug: 'exec-leather', description: 'Premium office tote.', price: 250, images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Executive+Leather'], category: 'tote', material: 'leather', inStock: true },
  { id: '3', name: 'Urban Nylon', slug: 'urban-nylon', description: 'Waterproof commuter duffel.', price: 95, images: ['https://placehold.co/600x600/f8fafc/0f172a?text=Urban+Nylon'], category: 'duffel', material: 'nylon', inStock: false }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network latency for suspense/loading state testing
    const timer = setTimeout(() => {
      setProducts(MOCK_CATALOG);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { products, isLoading };
};