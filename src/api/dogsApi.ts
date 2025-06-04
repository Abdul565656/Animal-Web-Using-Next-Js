import type { DogsListApiResponse, Dog, ApiDogImage } from '../../types'; 

export const DOG_SIZE_FILTERS = {
  ALL: "All Dogs",
  SMALL: "Small Breeds",
  MEDIUM: "Medium Breeds",
  LARGE: "Large Breeds",
};

export async function fetchAllDogsFromAPI(page: number = 1, limit: number = 30): Promise<Dog[]> {
  const API_URL = "https://api.freeapi.app/api/v1/public/dogs";
  const url = new URL(API_URL);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  console.log(`[fetchAllDogsFromAPI] Fetching URL: ${url.toString()}`);

  try {
    const response = await fetch(
      url.toString(), 
    { next: { revalidate: 3600 } }
  );
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (fetchAllDogsFromAPI): ${response.status} ${errorText} from ${url.toString()}`);
      throw new Error(`Failed to fetch dogs: ${response.status}`);
    }

    const apiResponse = await response.json() as DogsListApiResponse;
    const rawDogs = apiResponse?.data?.data;

    if (!Array.isArray(rawDogs)) {
      console.error("[fetchAllDogsFromAPI] Fetched list data for dogs is not an array. API Response:", apiResponse);
      return [];
    }

    return rawDogs.map((dogData: any, index: number): Dog => ({
      id: dogData.id,
      name: dogData.name,
      image: (dogData.image as ApiDogImage)?.url,
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
      isBestSeller: index % 5 === 0,
      discountInfo: index % 7 === 0 ? '15% OFF' : undefined,
      sizeCategory: index % 3 === 0 ? DOG_SIZE_FILTERS.SMALL : (index % 3 === 1 ? DOG_SIZE_FILTERS.MEDIUM : DOG_SIZE_FILTERS.LARGE),
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
  console.log(`[API - fetchDogById] Attempting to fetch from: ${SINGLE_DOG_API_URL}`);

  try {
    const response = await fetch(SINGLE_DOG_API_URL, { cache: 'no-store' });
    console.log(`[API - fetchDogById] Response status for ID ${dogId}: ${response.status}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[API - fetchDogById] API returned 404 for dog ID ${dogId} at ${SINGLE_DOG_API_URL}.`);
      } else {
        const errorText = await response.text();
        console.error(`[API - fetchDogById] API Error fetching dog ID ${dogId}: ${response.status} ${errorText}`);
      }
      return null;
    }

    const responseData = await response.json();
    console.log(`[API - fetchDogById] Raw JSON response for single dog ID ${dogId}:`, JSON.stringify(responseData, null, 2));

    let actualDogData: any = null; 

    
    if (responseData && typeof responseData === 'object') {
      if (responseData.data && typeof responseData.data === 'object' && !Array.isArray(responseData.data) && responseData.data.id) {
      
        actualDogData = responseData.data;
      } else if (responseData.data && responseData.data.data && typeof responseData.data.data === 'object' && !Array.isArray(responseData.data.data) && responseData.data.data.id) {

        actualDogData = responseData.data.data;
      } else if (responseData.id && responseData.name) {

        actualDogData = responseData;
      } else {
        console.warn(`[API - fetchDogById] Could not confidently extract dog object from responseData structure for ID ${dogId}.`);
      }
    }

    console.log(`[API - fetchDogById] Extracted actualDogData (Attempted):`, actualDogData);

    if (!actualDogData || typeof actualDogData !== 'object' || !actualDogData.id || !actualDogData.name) {
      console.error(`[API - fetchDogById] Invalid or incomplete dog data structure after extraction for ID ${dogId}. actualDogData:`, actualDogData);
      return null; 
    }


    const mappedDog: Dog = {
      id: actualDogData.id,
      name: actualDogData.name,
      image: (actualDogData.image as ApiDogImage)?.url || actualDogData.image,
      description: actualDogData.description,
      temperament: actualDogData.temperament,
      origin: actualDogData.origin,
      life_span: actualDogData.life_span,
      breed_group: actualDogData.breed_group,
      weight: actualDogData.weight,
      height: actualDogData.height,
      bred_for: actualDogData.bred_for,
      country_code: actualDogData.country_code,
      reference_image_id: actualDogData.reference_image_id,
    };
    console.log(`[API - fetchDogById] Successfully mapped dog for ID ${dogId}:`, mappedDog);
    return mappedDog;

  } catch (error) {
    console.error(`[API - fetchDogById] CATCH BLOCK - Error fetching dog ID ${dogId}:`, error);
    return null;
  }
}