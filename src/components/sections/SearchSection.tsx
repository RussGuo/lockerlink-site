"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapCity } from "@/lib/i18n/translations";
import { useAnalytics } from "@/hooks/useAnalytics";

interface SearchSectionProps {
  title: string;
  locationLabel: string;
  locationPlaceholder: string;
  dateLabel: string;
  actionLabel: string;
  cities: MapCity[];
  searchEventId?: string;
  subscribeEventId?: string;
  comingSoon?: {
    enabled: boolean;
    title: string;
    subtitle?: string;
    ctaLabel: string;
    inputPlaceholder?: string;
    eventMetadata?: Record<string, unknown>;
  };
}

export const SearchSection = ({
  title,
  locationLabel,
  locationPlaceholder,
  dateLabel,
  actionLabel,
  cities,
  searchEventId,
  subscribeEventId,
  comingSoon,
}: SearchSectionProps) => {
  const suggestions = useMemo(() => cities.map((city) => city.name), [cities]);
  const { track } = useAnalytics();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const location = formData.get("location");
    const date = formData.get("date");
    track(searchEventId ?? "search_submit", {
      metadata: {
        location,
        date,
        ...(comingSoon?.eventMetadata ?? {}),
      },
    });

    if (comingSoon?.enabled) {
      setShowComingSoon(true);
    }
  };

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    track(subscribeEventId ?? "subscribe_submit", {
      label: "coming_soon",
      metadata: { email: trimmed, ...(comingSoon?.eventMetadata ?? {}) },
    });
    setSubscribed(true);
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

        {showComingSoon && comingSoon?.enabled && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-900">{comingSoon.title}</h3>
            {comingSoon.subtitle && <p className="mt-2 text-sm text-neutral-600">{comingSoon.subtitle}</p>}

            <form onSubmit={onSubscribe} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={comingSoon.inputPlaceholder ?? "Enter your email"}
                required
                className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm outline-none transition focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/40"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="rounded-2xl bg-[var(--accent-orange)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-orange)]/20 transition hover:bg-[#ff8f24] disabled:opacity-60"
              >
                {subscribed ? "✓" : comingSoon.ctaLabel}
              </button>
            </form>

            {/* Success state is reflected by button change to a checkmark to keep copy minimal and language-neutral. */}
          </div>
        )}
      </div>
    </section>
  );
};
