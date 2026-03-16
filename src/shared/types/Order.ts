import type { Address } from "./Address";
import type { CartItem } from "./CartItem";
import type { PaymentMethod } from "./PaymentMethod";

export type Order = {
  id:            string;
  billing:       Address;
  shipping:      Address;
  items:         CartItem[];
  subTotal:      number;
  tax:           number;
  total:         number;
  paymentMethod: PaymentMethod;
  orderNotes?:   string;
  status:        "pending" | "confirmed" | "shipped" | "delivered";
  createdAt:     string;
};
