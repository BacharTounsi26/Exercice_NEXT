import type { Cart } from "@/shared/types/Cart";
import { API_URL } from "@/shared/utils/apiBase";

export async function createCart(): Promise<Cart> {
  const newCart: Omit<Cart, "id"> = {
    items:    [],
    subTotal: 0,
    tax:      0,
    total:    0,
  };

  const res = await fetch(`${API_URL}/carts`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(newCart),
  });

  if (!res.ok) throw new Error(`createCart: ${res.status}`);
  return res.json();
}
