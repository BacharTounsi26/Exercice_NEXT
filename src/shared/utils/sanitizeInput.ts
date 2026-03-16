export function sanitizeText(input: string, maxLength = 255): string {
  const normalized = input
    .replace(/\p{Cc}/gu, "") // remove all Unicode control characters (C0, DEL, C1)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.slice(0, maxLength);
}

export function sanitizeOptionalText(input?: string, maxLength = 255): string | undefined {
  if (!input) return undefined;
  const value = sanitizeText(input, maxLength);
  return value.length > 0 ? value : undefined;
}
