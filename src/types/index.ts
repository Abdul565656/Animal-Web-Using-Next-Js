export interface ApiDogImage {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
}

export interface RawDogData {
  id: string | number;
  name: string;
  image?: ApiDogImage | string;
  reference_image_id?: string;
  weight?: { imperial?: string; metric?: string };
  height?: { imperial?: string; metric?: string };
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string;
  country_code?: string;
}

export interface DogsListApiResponse {
  data?: {
    data?: RawDogData[];
  };
}

export interface Dog {
  id: string | number;
  name: string;
  image?: string;
  reference_image_id?: string;
  weight?: { imperial?: string; metric?: string };
  height?: { imperial?: string; metric?: string };
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string;
  country_code?: string;
  price?: number;
  rating?: number;
  breed?: string;
  age?: number;
  location?: string;
  isBestSeller?: boolean;
  discountInfo?: string; 
}

export interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}


export interface CatBreed {
  id: string | number;
  name: string;
  image?: string;
  origin?: string;
  temperament?: string;
}

export interface RawCatData {
  id: string | number;
  name: string;
  image?: ApiDogImage | string; 
  reference_image_id?: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  life_span?: string;
  indoor?: number; 
  lap?: number;
  alt_names?: string;
  adaptability?: number; 
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  weight?: {
    imperial?: string;
    metric?: string;
  };
}

export interface CatsListApiResponse {
  data?: {
    data?: CatBreed[]; 
  };
  success?: boolean;
  message?: string;
}


export interface SingleCatApiResponse {
  data?: RawCatData | { data?: RawCatData }; 
  success?: boolean;
  message?: string;
}

export interface Cat {
  id: string | number;
  name: string;
  image?: string;
  referenceImageId?: string;
  cfaUrl?: string;
  vetstreetUrl?: string;
  vcaHospitalsUrl?: string;
  temperament?: string;
  origin?: string;
  countryCodes?: string;
  countryCode?: string;
  description?: string;
  lifeSpan?: string;
  isIndoor?: boolean;
  isLapCat?: boolean;
  altNames?: string;
  adaptability?: number;
  affectionLevel?: number;
  childFriendly?: number;
  dogFriendly?: number;
  energyLevel?: number;
  groomingNeeds?: number;
  healthIssues?: number;
  intelligence?: number;
  sheddingLevel?: number;
  socialNeeds?: number;
  strangerFriendly?: number;
  vocalisation?: number;
  isExperimental?: boolean;
  isHairless?: boolean;
  isNatural?: boolean;
  isRare?: boolean;
  isRex?: boolean;
  hasSuppressedTail?: boolean;
  hasShortLegs?: boolean;
  wikipediaUrl?: string;
  isHypoallergenic?: boolean;
  weight?: {
    imperial?: string;
    metric?: string;
  };
  price?: number;
  rating?: number;
}