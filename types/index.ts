export interface CatWeight {
  imperial: string;
  metric: string;
}

export interface CatBreed {
  id: string | number;
  name: string;
  temperament?: string;
  origin?: string;
  description?: string;
  life_span?: string;
  wikipedia_url?: string;
  hypoallergenic?: number;
  image?: string; 
  weight?: CatWeight; 
}

export interface CatsApiResponse { 
  statusCode: number;
  data: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    currentPageItems: number;
    data: CatBreed[];
  };
  message?: string; 
  success?: boolean;
}



export interface DogWeight {
  imperial: string;
  metric: string;
}

export interface DogHeight {
  imperial: string;
  metric: string;
}

export interface ApiDogImage { 
  id?: string;
  width?: number;
  height?: number;
  url: string;   
}

export interface Dog {
  id: string | number;
  name: string;
  image?: string;         
  reference_image_id?: string; 
  weight?: DogWeight;
  height?: DogHeight;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string;
  country_code?: string;


  price?: number;
  rating?: number;
  isBestSeller?: boolean;
  discountInfo?: string;
  
  sizeCategory?: string;
}


export interface DogsListApiResponse {
  statusCode?: number;
  data?: { 
    page?: number;
    limit?: number;
    totalPages?: number;
    totalItems?: number;
    currentPageItems?: number;
    data?: any[]; 
  };
  message?: string;
  success?: boolean;
}


export interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  role: string; 
  imageUrl: string; 
}