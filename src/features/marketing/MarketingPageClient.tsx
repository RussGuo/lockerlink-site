"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SearchSection } from "@/components/sections/SearchSection";
import { MapSection } from "@/components/sections/MapSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { PartnerBanner } from "@/components/sections/PartnerBanner";
import { useLanguage } from "@/components/LanguageProvider";
import {
  getPageContent,
  getTranslation,
  type PageId,
  type SectionContent,
  type TranslationContent,
} from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/languages";

interface MarketingPageClientProps {
  pageId: PageId;
  initialLanguage: Language;
  initialContent: SectionContent;
  initialAnalytics: TranslationContent["analytics"];
  initialPartnerHighlight: TranslationContent["partnerHighlight"];
}

export const MarketingPageClient = ({
  pageId,
  initialLanguage,
  initialContent,
  initialAnalytics,
  initialPartnerHighlight,
}: MarketingPageClientProps) => {
  const { language } = useLanguage();

  const content = useMemo(() => {
    if (language === initialLanguage) return initialContent;
    return getPageContent(language, pageId);
  }, [language, initialLanguage, initialContent, pageId]);

  const { analytics, partnerHighlight } = useMemo(() => {
    if (language === initialLanguage) {
      return { analytics: initialAnalytics, partnerHighlight: initialPartnerHighlight };
    }
    const translation = getTranslation(language);
    return {
      analytics: translation.analytics,
      partnerHighlight: translation.partnerHighlight,
    };
  }, [language, initialLanguage, initialAnalytics, initialPartnerHighlight]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-16 md:gap-20 md:py-20">
        <HeroSection
          content={content.hero}
          analyticsFallback={{
            primary: analytics.storageClick,
            secondary: analytics.transferClick,
          }}
        />
        <SearchSection
          title={content.searchSection.title}
          locationLabel={content.searchSection.locationLabel}
          locationPlaceholder={content.searchSection.locationPlaceholder}
          dateLabel={content.searchSection.dateLabel}
          actionLabel={content.searchSection.actionLabel}
          cities={content.mapSection.cities}
        />
        <FeatureSection
          id="services"
          title={content.featureSection.title}
          subtitle={content.featureSection.subtitle}
          cards={content.featureSection.cards}
        />
        <MapSection
          id="map"
          title={content.mapSection.title}
          subtitle={content.mapSection.subtitle}
          callout={content.mapSection.callout}
          exploreLabel={content.mapSection.exploreLabel}
          cities={content.mapSection.cities}
        />
        <HowItWorks
          id="how-it-works"
          title={content.howItWorks.title}
          subtitle={content.howItWorks.subtitle}
          steps={content.howItWorks.steps}
          footnote={content.howItWorks.footnote}
        />
        <Testimonials
          id="testimonials"
          title={content.testimonials.title}
          subtitle={content.testimonials.subtitle}
          entries={content.testimonials.entries}
        />
        <PartnerBanner
          id="partner-banner"
          title={content.partnerBanner.title}
          subtitle={content.partnerBanner.subtitle}
          primaryCta={content.partnerBanner.primaryCta}
          secondaryCta={content.partnerBanner.secondaryCta}
          highlight={partnerHighlight}
        />
      </main>
      <Footer />
    </div>
  );
};
