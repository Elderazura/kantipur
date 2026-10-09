"use client";

import Image from "next/image";
import { useState } from "react";
import { toPublicImageSrc } from "@/lib/images";
import type { ProductImage } from "@/types/product";

type PieceGalleryProps = {
  images: ProductImage[];
  name: string;
};

export default function PieceGallery({ images, name }: PieceGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const current = images[Math.min(active, images.length - 1)]!;
  const src = toPublicImageSrc(current.local);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5 sm:aspect-[5/6]">
        <Image
          src={src}
          alt={current.alt || name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3" role="list">
          {images.map((image, index) => {
            const thumbSrc = toPublicImageSrc(image.local);
            const selected = index === active;
            return (
              <li key={image.local} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`${name} — image ${index + 1}`}
                  aria-pressed={selected}
                  className={`relative block h-16 w-14 overflow-hidden bg-ink/5 focus-visible:outline-offset-2 sm:h-20 sm:w-16 ${
                    selected ? "ring-1 ring-madder" : "ring-1 ring-transparent hover:ring-rule"
                  }`}
                >
                  <Image
                    src={thumbSrc}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
