import { HeroVideoEnhancement } from "@/components/motion/hero-video-enhancement";
import {
  heroMediaHeight,
  heroMediaWidth,
  heroPortraitPosterHeight,
  heroPortraitPosterQuery,
  heroPortraitPosterSrc,
  heroPortraitPosterWidth,
  heroPosterSrc,
} from "@/lib/hero-media";

export function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-clip">
      {/* Poster Server no HTML inicial, com art direction nativa:
          retrato ou até 767px usa o WebP 4:5; paisagem a partir de
          768px usa o poster desktop. O vídeo entra só no cliente. */}
      <picture data-hero-picture="">
        <source
          media={heroPortraitPosterQuery}
          srcSet={heroPortraitPosterSrc}
          width={heroPortraitPosterWidth}
          height={heroPortraitPosterHeight}
          data-hero-poster="portrait"
        />
        <img
          src={heroPosterSrc}
          alt=""
          aria-hidden="true"
          data-hero-media=""
          data-hero-poster="landscape"
          width={heroMediaWidth}
          height={heroMediaHeight}
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full max-h-full w-full max-w-none object-cover"
        />
      </picture>
      <HeroVideoEnhancement />
    </div>
  );
}
