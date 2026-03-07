import { mockFetch } from "@/api/mockData";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.greenlife.app/api/v1";
const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API !== "false";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (USE_MOCK_API) {
    return mockFetch(path, init) as Promise<T>;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    ...init
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error?.message ?? "Request failed");
  }

  return payload;
}
