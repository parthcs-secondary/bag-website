export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  inStock: boolean;
  features?: string[];
  dimensions?: string;
  weight?: string;
}

export interface CartItem extends Product {
  quantity: number;
}