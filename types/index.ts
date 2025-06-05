export interface CatBreed {
  id: string | number;
  name: string;
  image?: string;
}

export interface Dog {
  id: string | number;
  name: string;
  image?: string;
  origin?: string;
  breed_group?: string;

  price?: number;
  rating?: number;
  isBestSeller?: boolean;
  discountInfo?: string;
  sizeCategory?: string;
}

export interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}
