"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE_KEY, Language, SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";

interface LanguageContextValue {
  language: Language;
  setLanguage: (value: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "lockerlink-lang";

const isSupported = (value: string | null | undefined): value is Language => {
  if (!value) return false;
  return SUPPORTED_LANGUAGES.includes(value as Language);
};

const detectBrowserLanguage = (): Language | null => {
  if (typeof navigator === "undefined") return null;
  const browserCandidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const candidate of browserCandidates) {
    if (!candidate) continue;
    const normalized = candidate.toLowerCase().split("-")[0];
    if (isSupported(normalized)) {
      return normalized as Language;
    }
  }
  return null;
};

const getStoredLanguage = (): Language | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isSupported(stored)) return stored;
  return null;
};

interface Props {
  initialLanguage?: Language;
  children: React.ReactNode;
}

export const LanguageProvider = ({ initialLanguage = DEFAULT_LANGUAGE, children }: Props) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    setLanguageState((current) => {
      const stored = getStoredLanguage();
      if (stored && stored !== current) {
        return stored;
      }
      if (!stored) {
        const browser = detectBrowserLanguage();
        if (browser && browser !== current) {
          return browser;
        }
      }
      return current;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, language);
    const maxAge = 60 * 60 * 24 * 365; // one year
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${language}; path=/; max-age=${maxAge}`;
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((value: Language) => {
    if (!isSupported(value)) return;
    setLanguageState(value);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
