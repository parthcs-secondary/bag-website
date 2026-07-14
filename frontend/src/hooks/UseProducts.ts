import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network latency for suspense/loading state testing
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { products, isLoading };
};