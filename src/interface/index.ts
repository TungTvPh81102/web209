export interface IProduct {
  id: number | string;
  name: string;
  price: number;
  imageUrl?: string;
  description: string;
  available: boolean;
  category: string;
}
