"use client";

import type { ChangeEvent } from "react";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n/languages";
import { useLanguage } from "@/components/LanguageProvider";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Language;
    setLanguage(value);
  };

  return (
    <label className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
      <span className="sr-only">Change language</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 text-neutral-500"
        aria-hidden
      >
        <path d="M3 5h12M9 3v2M10 13l-6-8h12l-6 8Zm0 0v8" />
        <path d="M17 19h5m-2.5 2.5V16.5" />
      </svg>
      <select
        value={language}
        onChange={handleChange}
        className="rounded-full border border-transparent bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm outline-none transition focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-1"
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
};
