import type { CartItem } from "./CartItem";

export interface Cart {
  id: string;
  items: CartItem[];
  subTotal: number;
  tax: number;
  total: number;
}
