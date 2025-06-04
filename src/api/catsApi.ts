import type { CatsApiResponse, CatBreed } from '../../types';

const CATS_API_URL = "https://api.freeapi.app/api/v1/public/cats";

export async function fetchCatBreeds(page: number = 1, limit: number = 10): Promise<CatBreed[]> {
  const url = new URL(CATS_API_URL);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch cat breeds: ${response.status} ${await response.text()}`);
    }
    const apiResponse = await response.json() as CatsApiResponse;
    return apiResponse?.data?.data || [];
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
}