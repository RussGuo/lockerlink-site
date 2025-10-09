import type { Metadata } from "next";
import { MarketingPage } from "@/features/marketing/MarketingPage";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import { getPageContent } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const language = getLanguageFromServer();
  const content = getPageContent(language, "home");
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

const HomePage = () => <MarketingPage pageId="home" />;

export default HomePage;
