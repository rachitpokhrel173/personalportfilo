import Image from "next/image";
import type { ProjectImage } from "@/types/content";

// Device frames for real project screenshots. Images are never cropped in a way that
// changes what the interface shows; desktop shots are anchored to the top.

export function BrowserFrame({
  image,
  address,
  sizes,
  priority = false,
  className = "",
  aspect = "aspect-[16/10]",
  nativeAspect = false,
}: {
  image: ProjectImage;
  address?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  /** Use the screenshot's own proportions instead of `aspect`. */
  nativeAspect?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line-strong/80 bg-bg-raised shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line bg-surface px-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        {address && (
          <span className="truncate rounded bg-bg/70 px-2 py-0.5 font-mono text-[10px] text-subtle">
            {address}
          </span>
        )}
      </div>
      <div
        className={`relative ${nativeAspect ? "" : aspect} bg-surface`}
        style={nativeAspect ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}

export function PhoneFrame({
  image,
  sizes,
  className = "",
  priority = false,
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.4rem] border-[5px] border-[#1d2640] bg-bg-raised shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative aspect-[9/17] bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
