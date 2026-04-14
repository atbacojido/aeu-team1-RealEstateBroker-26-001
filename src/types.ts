export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image_url: string;
  is_pet_friendly: boolean;
  has_washer: boolean;
  has_parking: boolean;
  has_gym: boolean;
  has_pool: boolean;
  amenities: string[];
  type: 'Loft' | 'Apartment' | 'Penthouse';
}

export interface FilterState {
  search: string;
  neighborhoods: string[];
  minPrice: number;
  maxPrice: number;
  is_pet_friendly: boolean;
  has_washer: boolean;
  has_parking: boolean;
  has_gym: boolean;
  has_pool: boolean;
}
