"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/lib/i18n/translations";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface TestimonialsProps {
  id?: string;
  title: string;
  subtitle: string;
  entries: Testimonial[];
}

export const Testimonials = ({ id, title, subtitle, entries }: TestimonialsProps) => {
  const [index, setIndex] = useState(0);
  const active = entries[index];

  useEffect(() => {
    if (entries.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % entries.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [entries.length]);

  const move = (direction: 1 | -1) => {
    setIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return entries.length - 1;
      if (next >= entries.length) return 0;
      return next;
    });
  };

  return (
    <section id={id} className="rounded-3xl border border-white bg-white/90 p-10 shadow-[0_25px_50px_-35px_rgba(15,23,42,0.2)]">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
          <p className="text-base text-neutral-600 sm:text-lg">{subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-neutral-700"
          >
            <p className="text-lg font-medium text-neutral-900">“{active.quote}”</p>
            <footer className="mt-6 text-sm text-neutral-600">
              <span className="font-semibold text-neutral-900">{active.name}</span> · {active.role} · {active.location}
            </footer>
            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={starIndex} className={`size-2.5 rounded-full ${starIndex < active.rating ? "bg-[var(--accent-orange)]" : "bg-neutral-300"}`} />
              ))}
            </div>
          </motion.blockquote>
        </AnimatePresence>
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
          <Image
            key={active.image}
            src={active.image}
            alt={active.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
