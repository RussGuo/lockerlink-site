export const SUPPORTED_LANGUAGES = ["zh", "en", "ja", "ko"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "zh";

export const LANGUAGE_LABELS: Record<Language, string> = {
  zh: "简体中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
};

export const LANGUAGE_COOKIE_KEY = "lockerlink-lang";
