import type {
  CatsListApiResponse,
  SingleCatApiResponse,
  CatBreed,
  RawCatData,
  Cat,
  ApiDogImage 
} from '../types'; 

const CATS_API_BASE_URL = "https://api.freeapi.app/api/v1/public/cats";

export async function fetchCatBreeds(page: number = 1, limit: number = 10): Promise<CatBreed[]> {
  const url = new URL(CATS_API_BASE_URL);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (fetchCatBreeds): ${response.status} ${errorText}`);
      throw new Error(`Failed to fetch cat breeds: ${response.status}`);
    }
    const apiResponse = await response.json() as CatsListApiResponse;
    return apiResponse?.data?.data || [];
  } catch (error) {
    console.error("Error in fetchCatBreeds:", error);
    return [];
  }
}

export async function fetchCatById(catId: string | number): Promise<Cat | null> {
  const url = `${CATS_API_BASE_URL}/${catId}`;

  try {
    const response = await fetch(url, { cache: 'no-store' }); 

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[fetchCatById] API returned 404 for cat ID ${catId}.`);
      } else {
        const errorText = await response.text();
        console.error(`[fetchCatById] API Error for ID ${catId}: ${response.status} ${errorText}`);
      }
      return null;
    }

    const responseData = await response.json() as SingleCatApiResponse;

    let rawCat: RawCatData | undefined;
    if (responseData.data) {
        if ('id' in responseData.data && 'name' in responseData.data) { 
            rawCat = responseData.data as RawCatData;
        } else if ((responseData.data as { data?: RawCatData }).data) { 
            rawCat = (responseData.data as { data?: RawCatData }).data;
        }
    }


    if (!rawCat || typeof rawCat.id === 'undefined' || typeof rawCat.name === 'undefined') {
      console.error(`[fetchCatById] Invalid or incomplete cat data for ID ${catId}:`, responseData);
      return null;
    }

    const mappedCat: Cat = {
      id: rawCat.id,
      name: rawCat.name,
      image: typeof rawCat.image === 'string' ? rawCat.image : (rawCat.image as ApiDogImage)?.url,
      referenceImageId: rawCat.reference_image_id,
      cfaUrl: rawCat.cfa_url,
      vetstreetUrl: rawCat.vetstreet_url,
      vcaHospitalsUrl: rawCat.vcahospitals_url,
      temperament: rawCat.temperament,
      origin: rawCat.origin,
      countryCodes: rawCat.country_codes,
      countryCode: rawCat.country_code,
      description: rawCat.description,
      lifeSpan: rawCat.life_span,
      isIndoor: !!rawCat.indoor, // Convert 0/1 to boolean
      isLapCat: !!rawCat.lap,
      altNames: rawCat.alt_names,
      adaptability: rawCat.adaptability,
      affectionLevel: rawCat.affection_level,
      childFriendly: rawCat.child_friendly,
      dogFriendly: rawCat.dog_friendly,
      energyLevel: rawCat.energy_level,
      groomingNeeds: rawCat.grooming,
      healthIssues: rawCat.health_issues,
      intelligence: rawCat.intelligence,
      sheddingLevel: rawCat.shedding_level,
      socialNeeds: rawCat.social_needs,
      strangerFriendly: rawCat.stranger_friendly,
      vocalisation: rawCat.vocalisation,
      isExperimental: !!rawCat.experimental,
      isHairless: !!rawCat.hairless,
      isNatural: !!rawCat.natural,
      isRare: !!rawCat.rare,
      isRex: !!rawCat.rex,
      hasSuppressedTail: !!rawCat.suppressed_tail,
      hasShortLegs: !!rawCat.short_legs,
      wikipediaUrl: rawCat.wikipedia_url,
      isHypoallergenic: !!rawCat.hypoallergenic,
      weight: rawCat.weight,
      // Example: Add client-side generated price/rating
      price: parseFloat((Math.random() * 30 + 10).toFixed(2)),
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    };
    return mappedCat;

  } catch (error) {
    console.error(`[fetchCatById] General error fetching cat ID ${catId}:`, error);
    return null;
  }
}