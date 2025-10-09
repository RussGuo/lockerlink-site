"use client";

import { FormEvent, useMemo } from "react";
import { MapCity } from "@/lib/i18n/translations";

interface SearchSectionProps {
  title: string;
  locationLabel: string;
  locationPlaceholder: string;
  dateLabel: string;
  actionLabel: string;
  cities: MapCity[];
}

export const SearchSection = ({ title, locationLabel, locationPlaceholder, dateLabel, actionLabel, cities }: SearchSectionProps) => {
  const suggestions = useMemo(() => cities.map((city) => city.name), [cities]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const location = formData.get("location");
    const date = formData.get("date");
    console.info("[search]", { location, date });
  };

  return (
    <section
      id="locker-search"
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/70 p-10 shadow-[0_25px_50px_-35px_rgba(15,23,42,0.2)]"
    >
      <div className="absolute -left-32 top-[-80px] h-40 w-40 rounded-full bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--accent-orange)]/10 blur-3xl" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h2>
          <p className="text-sm text-neutral-600">
            {locationLabel}
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[2fr_1fr_auto]">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {locationLabel}
              <input
                name="location"
                list="lockerlink-cities"
                placeholder={locationPlaceholder}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm outline-none transition focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/40"
                required
              />
              <datalist id="lockerlink-cities">
                {suggestions.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {dateLabel}
              <input
                name="date"
                type="date"
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm outline-none transition focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="self-end rounded-2xl bg-[var(--accent-blue)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-blue)]/20 transition hover:bg-[#1a6bff]"
          >
            {actionLabel}
          </button>
        </form>
      </div>
    </section>
  );
};
