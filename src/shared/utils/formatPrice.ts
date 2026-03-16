export function formatPrice(value: number, currency: string = "€"): string {
  if (isNaN(value)) return `0 ${currency}`;
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + ` ${currency}`;
}
