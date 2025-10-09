"use client";

import { useMemo, useState } from "react";
import { MapCity } from "@/lib/i18n/translations";

interface MapSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  callout: string;
  exploreLabel: string;
  cities: MapCity[];
}

export const MapSection = ({ id, title, subtitle, callout, exploreLabel, cities }: MapSectionProps) => {
  const [activeCityId, setActiveCityId] = useState<string>(cities[0]?.id ?? "");
  const activeCity = useMemo(() => cities.find((city) => city.id === activeCityId) ?? cities[0], [cities, activeCityId]);

  return (
    <section
      id={id}
      className="grid gap-8 rounded-3xl border border-white bg-white/90 p-10 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.25)] lg:grid-cols-[2fr_1fr] lg:items-center"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
          <p className="text-base text-neutral-600 sm:text-lg">{subtitle}</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-sky-100 via-white to-orange-100 p-6">
          <p className="text-sm font-medium text-neutral-600">{callout}</p>
          <div className="relative mt-6 h-72 overflow-hidden rounded-2xl bg-white/60">
            <div className="absolute inset-0">
              <div className="absolute left-1/4 top-12 h-40 w-40 rounded-full bg-[var(--accent-blue)]/15 blur-2xl" />
              <div className="absolute right-12 top-16 h-32 w-32 rounded-full bg-[var(--accent-orange)]/20 blur-2xl" />
              <div className="absolute bottom-6 left-12 h-28 w-28 rounded-full bg-[var(--accent-blue)]/10 blur-2xl" />
              <div className="absolute inset-6 rounded-3xl border border-dashed border-[var(--accent-blue)]/20" />
            </div>
            <div className="relative z-10 h-full w-full">
              {cities.map((city) => {
                const isActive = city.id === activeCityId;
                const positions: Record<string, string> = {
                  shanghai: "left-[18%] top-[28%]",
                  tokyo: "right-[18%] top-[38%]",
                  seoul: "left-[40%] bottom-[20%]",
                };
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setActiveCityId(city.id)}
                    className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-xs ${positions[city.id] ?? "left-1/2 top-1/2"}`}
                  >
                    <span
                      className={`flex size-4 items-center justify-center rounded-full border-2 transition ${
                        isActive ? "border-[var(--accent-orange)] bg-[var(--accent-orange)]" : "border-[var(--accent-blue)] bg-white"
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${isActive ? "bg-white" : "bg-[var(--accent-blue)]"}`} />
                    </span>
                    <span className={`rounded-full bg-white/80 px-3 py-1 font-medium text-neutral-700 shadow transition ${
                      isActive ? "bg-[var(--accent-orange)]/10 text-[var(--accent-orange)]" : "group-hover:bg-white"
                    }`}>
                      {city.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <aside className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-inner">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-blue)]">{exploreLabel}</p>
          <h3 className="text-2xl font-semibold text-neutral-900">{activeCity?.headline}</h3>
          <p className="text-sm text-neutral-600">{activeCity?.description}</p>
        </div>
        <div className="rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-700">
          {activeCity?.highlight}
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => setActiveCityId(city.id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                city.id === activeCityId ? "border-[var(--accent-orange)] bg-[var(--accent-orange)]/10 text-[var(--accent-orange)]" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
};
