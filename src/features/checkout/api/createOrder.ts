import type { Order }           from "@/shared/types/Order";
import type { Cart }            from "@/shared/types/Cart";
import type { CheckoutFormData } from "@/shared/types/CheckoutFormData";
import { API_URL }              from "@/shared/utils/apiBase";
import { sanitizeOptionalText, sanitizeText } from "@/shared/utils/sanitizeInput";

function assertValidAddress(address: CheckoutFormData["billing"], label: string) {
  const required = ["firstName", "lastName", "address1", "city", "postcode"] as const;
  for (const key of required) {
    const value = address[key];
    if (!value || !String(value).trim()) {
      throw new Error(`Invalid ${label}: missing ${key}`);
    }
  }
}

export async function createOrder(
  cart: Cart,
  form: CheckoutFormData
): Promise<Order> {
  assertValidAddress(form.billing, "billing address");
  if (form.shipToDifferent && form.shipping) {
    assertValidAddress(form.shipping, "shipping address");
  }

  const shippingAddress = form.shipToDifferent && form.shipping
    ? form.shipping
    : form.billing;

  const safeBilling = {
    ...form.billing,
    firstName: sanitizeText(form.billing.firstName, 80),
    lastName:  sanitizeText(form.billing.lastName, 80),
    company:   sanitizeOptionalText(form.billing.company, 120) ?? "",
    address1:  sanitizeText(form.billing.address1, 140),
    address2:  sanitizeOptionalText(form.billing.address2, 140) ?? "",
    city:      sanitizeText(form.billing.city, 80),
    state:     sanitizeOptionalText(form.billing.state, 80) ?? "",
    postcode:  sanitizeText(form.billing.postcode, 20),
  };

  const safeShipping = {
    ...shippingAddress,
    firstName: sanitizeText(shippingAddress.firstName, 80),
    lastName:  sanitizeText(shippingAddress.lastName, 80),
    company:   sanitizeOptionalText(shippingAddress.company, 120) ?? "",
    address1:  sanitizeText(shippingAddress.address1, 140),
    address2:  sanitizeOptionalText(shippingAddress.address2, 140) ?? "",
    city:      sanitizeText(shippingAddress.city, 80),
    state:     sanitizeOptionalText(shippingAddress.state, 80) ?? "",
    postcode:  sanitizeText(shippingAddress.postcode, 20),
  };

  const orderPayload = {
    billing:       safeBilling,
    shipping:      safeShipping,
    items:         cart.items,
    subTotal:      cart.subTotal,
    tax:           cart.tax,
    total:         cart.total,
    paymentMethod: form.paymentMethod,
    orderNotes:    sanitizeOptionalText(form.orderNotes, 500),
    status:        "pending" as const,
    createdAt:     new Date().toISOString(),
  };

  const res = await fetch(`${API_URL}/orders`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(orderPayload),
  });

  if (!res.ok) throw new Error(`createOrder: ${res.status}`);
  return res.json();
}
