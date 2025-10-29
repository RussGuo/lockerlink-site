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

  const comingSoonCopy = useMemo(() => {
    // Lightweight inline copy to avoid large i18n changes. Defaults to English.
    const map: Record<Language, { title: string; subtitle: string; cta: string; placeholder: string }> = {
      zh: {
        title: "服务即将上线",
        subtitle: "留下邮箱，我们将在服务上线时第一时间通知您。",
        cta: "订阅完整服务",
        placeholder: "请输入邮箱",
      },
      en: {
        title: "Service launching soon",
        subtitle: "Leave your email and we’ll notify you as soon as it’s live.",
        cta: "Subscribe for full service",
        placeholder: "Enter your email",
      },
      ja: {
        title: "まもなくサービス開始",
        subtitle: "メールアドレスをご入力ください。リリース次第お知らせします。",
        cta: "完全版を購読する",
        placeholder: "メールアドレスを入力",
      },
      ko: {
        title: "서비스 곧 출시",
        subtitle: "이메일을 남겨주세요. 출시 즉시 알려드립니다.",
        cta: "완전한 서비스 구독",
        placeholder: "이메일을 입력하세요",
      },
    };
    return map[language] ?? map.en;
  }, [language]);

  const intent = useMemo<"delivery" | "storage" | null>(() => {
    if (pageId === "delivery") return "delivery";
    if (pageId === "storage") return "storage";
    return null;
  }, [pageId]);

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
          searchEventId={intent ? `search_${intent}_submit` : undefined}
          subscribeEventId={intent ? `subscribe_${intent}_submit` : undefined}
          comingSoon={
            intent
              ? {
                  enabled: true,
                  title: comingSoonCopy.title,
                  subtitle: comingSoonCopy.subtitle,
                  ctaLabel: comingSoonCopy.cta,
                  inputPlaceholder: comingSoonCopy.placeholder,
                  eventMetadata: { intent },
                }
              : undefined
          }
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
