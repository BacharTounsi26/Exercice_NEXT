import { API_URL } from "@/shared/utils/apiBase";

export async function deleteCart(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/carts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`deleteCart: ${res.status}`);
}
