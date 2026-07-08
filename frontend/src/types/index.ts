export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: 'backpack' | 'tote' | 'duffel' | 'clutch';
  material: 'leather' | 'canvas' | 'nylon';
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}