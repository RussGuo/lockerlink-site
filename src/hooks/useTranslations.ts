"use client";

import { useMemo } from "react";
import { getPageContent, getTranslation, PageId, SectionContent } from "@/lib/i18n/translations";
import { useLanguage } from "@/components/LanguageProvider";

export const useTranslations = () => {
  const { language } = useLanguage();
  return useMemo(() => getTranslation(language), [language]);
};

export const usePageContent = (page: PageId): SectionContent => {
  const { language } = useLanguage();
  return useMemo(() => getPageContent(language, page), [language, page]);
};
