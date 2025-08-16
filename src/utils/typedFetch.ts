import 'dotenv/config';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function typedFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${url}`, options);

  if (!response.ok) {
    // Handle HTTP errors (e.g., 404, 500)
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  // Parse the JSON response and cast it to the generic type T
  const data: T = await response.json();
  return data;
}