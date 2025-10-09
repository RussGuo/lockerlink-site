import type { Metadata } from "next";
import { MarketingPage } from "@/features/marketing/MarketingPage";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import { getPageContent } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const language = getLanguageFromServer();
  const content = getPageContent(language, "storage");
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

const StoragePage = () => <MarketingPage pageId="storage" />;

export default StoragePage;
