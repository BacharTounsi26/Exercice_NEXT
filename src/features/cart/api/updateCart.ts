import type { Cart } from "@/shared/types/Cart";
import { API_URL } from "@/shared/utils/apiBase";

export async function updateCart(cart: Cart): Promise<Cart> {
  const res = await fetch(`${API_URL}/carts/${cart.id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(cart),
  });

  if (!res.ok) throw new Error(`updateCart: ${res.status}`);
  return res.json();
}
