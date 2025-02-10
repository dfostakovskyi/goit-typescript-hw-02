export const fetchImages = async (
  query: string,
  page: number
): Promise<void> => {
  const API_KEY = "7P8sjmoH78qLA-B_FEKE24wUCCtTwpeGuMswIh54_Tw";
  const BASE_URL = "https://api.unsplash.com/search/photos";
  const params = `?query=${query}&page=${page}&per_page=12&client_id=${API_KEY}`;

  const response = await fetch(`${BASE_URL}${params}`);
  const data = await response.json();

  return data;
};
