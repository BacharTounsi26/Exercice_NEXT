import type { Address } from "./Address";
import type { PaymentMethod } from "./PaymentMethod";

export type CheckoutFormData = {
  billing:           Address;
  shipToDifferent:   boolean;
  shipping?:         Address;
  orderNotes?:       string;
  paymentMethod:     PaymentMethod;
};
