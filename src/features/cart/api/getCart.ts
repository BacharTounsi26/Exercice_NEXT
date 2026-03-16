import type { Cart } from "@/shared/types/Cart";
import { API_URL } from "@/shared/utils/apiBase";

export async function getCart(id: string): Promise<Cart | null> {
  const res = await fetch(`${API_URL}/carts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getCart: ${res.status}`);
  return res.json();
}
