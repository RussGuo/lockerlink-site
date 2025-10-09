"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { HeroContent } from "@/lib/i18n/translations";
import { useAnalytics } from "@/hooks/useAnalytics";
import clsx from "clsx";

interface HeroSectionProps {
  content: HeroContent;
  analyticsFallback?: {
    primary?: string;
    secondary?: string;
  };
}

export const HeroSection = ({ content, analyticsFallback }: HeroSectionProps) => {
  const { track } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => content.backgroundImages, [content.backgroundImages]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)]">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeIndex] ?? activeIndex}
            initial={{ opacity: 0.4, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {images[activeIndex] && (
              <Image
                src={images[activeIndex]}
                alt={content.title}
                fill
                priority={activeIndex === 0}
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/35 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-10 flex flex-col gap-10 px-6 py-16 md:px-12 lg:px-16 lg:py-20">
        <div className="max-w-2xl space-y-6 text-white">
          {content.eyebrow && <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">{content.eyebrow}</span>}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="max-w-xl text-base text-white/80 sm:text-lg">{content.subtitle}</p>
          {content.description && <p className="max-w-xl text-sm text-white/70 sm:text-base">{content.description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={content.primaryCta.href}
            onClick={() => track(content.primaryCta.eventId ?? analyticsFallback?.primary)}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-orange)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-orange)]/30 transition hover:bg-[#ff8f24]"
          >
            {content.primaryCta.label}
          </Link>
          <Link
            href={content.secondaryCta.href}
            onClick={() => track(content.secondaryCta.eventId ?? analyticsFallback?.secondary)}
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            {content.secondaryCta.label}
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 text-white/70">
          {content.highlights.map((highlight) => (
            <div key={highlight.label} className="min-w-[120px]">
              <p className="text-sm uppercase tracking-wide text-white/60">{highlight.label}</p>
              <p className="text-2xl font-semibold text-white">{highlight.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "h-1 w-9 rounded-full transition",
                index === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
              )}
              aria-label={`Show image ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
