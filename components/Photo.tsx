import { preload } from "react-dom";
import { asset } from "@/lib/asset";
import manifest from "@/lib/photo-manifest.json";

type Name = keyof typeof manifest;

/** Responsive WebP photo from public/photos (built by scripts/optimize_photos.py). */
export default function Photo({
  name,
  alt,
  sizes = "100vw",
  className,
  priority = false,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const m = manifest[name as Name];
  const largest = m.widths[m.widths.length - 1];
  const src = asset(`/photos/${name}-${largest}.webp`);
  const srcSet = m.widths.map((w) => `${asset(`/photos/${name}-${w}.webp`)} ${w}w`).join(", ");
  if (priority) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
