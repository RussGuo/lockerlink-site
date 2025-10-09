import { MarketingPageClient } from "@/features/marketing/MarketingPageClient";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import { getPageContent, getTranslation, type PageId } from "@/lib/i18n/translations";

interface MarketingPageProps {
  pageId: PageId;
}

export const MarketingPage = ({ pageId }: MarketingPageProps) => {
  const language = getLanguageFromServer();
  const translation = getTranslation(language);
  const content = getPageContent(language, pageId);

  return (
    <MarketingPageClient
      pageId={pageId}
      initialLanguage={language}
      initialContent={content}
      initialAnalytics={translation.analytics}
      initialPartnerHighlight={translation.partnerHighlight}
    />
  );
};
