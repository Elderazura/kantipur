"use client";

import { useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Reveal, Stagger, StaggerItem, WordsUp } from "./motion/Reveal";

const FILMS = [
  {
    key: "manufacturing",
    src: "/assets/videos/manufacturing.mp4",
    poster: "/assets/images/site/film-manufacturing.jpg",
  },
  {
    key: "packaging",
    src: "/assets/videos/packaging.mp4",
    poster: "/assets/images/site/film-packaging.jpg",
  },
] as const;

type FilmKey = (typeof FILMS)[number]["key"];

function FilmPlayer({
  filmKey,
  src,
  poster,
  title,
  caption,
  pauseOthers,
  register,
}: {
  filmKey: FilmKey;
  src: string;
  poster: string;
  title: string;
  caption: string;
  pauseOthers: (active: FilmKey) => void;
  register: (key: FilmKey, node: HTMLVideoElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      register(filmKey, node);
    },
    [filmKey, register],
  );

  return (
    <figure className="flex flex-col">
      <div className="relative overflow-hidden bg-ink">
        <video
          ref={setRef}
          src={src}
          controls
          playsInline
          poster={poster}
          preload="none"
          aria-label={title}
          onPlay={() => pauseOthers(filmKey)}
          className="aspect-video w-full object-cover"
        />
      </div>
      <figcaption className="border-t border-rule bg-paper px-5 py-5 sm:px-7 sm:py-6">
        <p className="font-display text-lg text-ink">{title}</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{caption}</p>
      </figcaption>
    </figure>
  );
}

export default function WorkshopFilms() {
  const t = useTranslations("films");
  const players = useRef<Map<FilmKey, HTMLVideoElement>>(new Map());

  const register = useCallback((key: FilmKey, node: HTMLVideoElement | null) => {
    if (node) players.current.set(key, node);
    else players.current.delete(key);
  }, []);

  const pauseOthers = useCallback((active: FilmKey) => {
    players.current.forEach((video, key) => {
      if (key !== active && !video.paused) video.pause();
    });
  }, []);

  return (
    <section className="border-y border-rule bg-surface" aria-labelledby="films-heading">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16 md:py-24 lg:max-w-7xl lg:py-32">
        <Reveal>
          <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("eyebrow")}
          </p>
        </Reveal>

        <h2
          id="films-heading"
          className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06] text-ink"
        >
          <WordsUp text={t("title")} />
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
            {t("lead")}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-10"
          gap={0.1}
        >
          {FILMS.map(({ key, src, poster }, index) => (
            <StaggerItem as="li" key={key} className={index > 0 ? "hidden md:block" : undefined}>
              <FilmPlayer
                filmKey={key}
                src={src}
                poster={poster}
                title={t(`${key}Title`)}
                caption={t(`${key}Caption`)}
                pauseOthers={pauseOthers}
                register={register}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12}>
          <p className="mt-8 font-ui text-[0.74rem] tracking-[0.16em] uppercase text-ink-muted">
            {t("soundNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
