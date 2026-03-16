import { API_URL } from "@/shared/utils/apiBase";

export type Slide = {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
};

// Server-side fetch with Next.js ISR caching
export async function fetchSlides(): Promise<Slide[]> {
  const res = await fetch(`${API_URL}/slides`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`fetchSlides: ${res.status}`);
  return res.json();
}
