"use client";

import { useState }               from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "onError">;

/**
 * Wraps next/image with an error fallback: returns null when the image fails
 * to load, letting the parent container's background colour act as placeholder.
 */
export default function FallbackImage({ alt = "", ...props }: Props & { alt?: string }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) return null;
  return <Image alt={alt} onError={() => setHasError(true)} {...props} />;
}
