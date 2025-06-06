import type {
  RawDogData,
  DogsListApiResponse,
  Dog,
} from '../types'; 

export async function fetchAllDogsFromAPI(page: number = 1, limit: number = 30): Promise<Dog[]> {
  const API_URL = "https://api.freeapi.app/api/v1/public/dogs";
  const url = new URL(API_URL);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (fetchAllDogsFromAPI): ${response.status} ${errorText}`);
      throw new Error(`Failed to fetch dogs: ${response.status}`);
    }

    const apiResponse = await response.json() as DogsListApiResponse;
    const rawDogs: RawDogData[] | undefined = apiResponse?.data?.data;

    if (!Array.isArray(rawDogs)) {
      console.error("[fetchAllDogsFromAPI] Fetched list data for dogs is not an array or is missing.", apiResponse);
      return [];
    }

    return rawDogs.map((dogData: RawDogData): Dog => ({
      id: dogData.id,
      name: dogData.name,
      image: typeof dogData.image === 'string' ? dogData.image : dogData.image?.url,
      reference_image_id: dogData.reference_image_id,
      weight: dogData.weight,
      height: dogData.height,
      bred_for: dogData.bred_for,
      breed_group: dogData.breed_group,
      life_span: dogData.life_span,
      temperament: dogData.temperament,
      origin: dogData.origin,
      description: dogData.description,
      country_code: dogData.country_code,
      price: parseFloat((Math.random() * 30 + 20).toFixed(2)),
      rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
    }));
  } catch (error) {
    console.error("Error in fetchAllDogsFromAPI:", error);
    return [];
  }
}

export async function fetchDisplayProducts(limit: number = 3): Promise<Dog[]> {
  return fetchAllDogsFromAPI(1, limit);
}

export async function fetchDogById(dogId: string | number): Promise<Dog | null> {
  const SINGLE_DOG_API_URL = `https://api.freeapi.app/api/v1/public/dogs/${dogId}`;

  try {
    const response = await fetch(SINGLE_DOG_API_URL, { cache: 'no-store' });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[fetchDogById] API returned 404 for dog ID ${dogId}.`);
      } else {
        const errorText = await response.text();
        console.error(`[fetchDogById] API Error fetching dog ID ${dogId}: ${response.status} ${errorText}`);
      }
      return null;
    }

    const responseData = await response.json();
    const dogData: RawDogData | undefined = responseData?.data?.data || responseData?.data || (responseData && typeof responseData === 'object' && 'id' in responseData ? responseData as RawDogData : undefined);

    if (!dogData || typeof dogData.id === 'undefined' || typeof dogData.name === 'undefined') {
      console.error(`[fetchDogById] Invalid or incomplete dog data structure for ID ${dogId}:`, responseData);
      return null;
    }

    const mappedDog: Dog = {
      id: dogData.id,
      name: dogData.name,
      image: typeof dogData.image === 'string' ? dogData.image : dogData.image?.url,
      description: dogData.description,
      temperament: dogData.temperament,
      origin: dogData.origin,
      life_span: dogData.life_span,
      breed_group: dogData.breed_group,
      weight: dogData.weight,
      height: dogData.height,
      bred_for: dogData.bred_for,
      country_code: dogData.country_code,
      reference_image_id: dogData.reference_image_id,
      price: parseFloat((Math.random() * 30 + 20).toFixed(2)), 
      rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),   
    };
    return mappedDog;

  } catch (error) {
    console.error(`[fetchDogById] General error fetching dog ID ${dogId}:`, error);
    return null;
  }
}
