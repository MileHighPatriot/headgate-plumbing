const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a `/public` path for raw tags that Next does not rewrite. */
export function asset(path: string) {
  return `${basePath}${path}`;
}
