import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import type { Language } from "@/lib/i18n/languages";

const COPY: Record<Language, { title: string; description: string; body: string[] }> = {
  en: {
    title: "Privacy Policy",
    description: "How Lockerlink collects, uses and protects your information.",
    body: [
      "We only collect the data required to provide storage, transfer and partner services.",
      "Payment information is processed securely through certified providers and never stored on Lockerlink servers.",
      "You can request data export or deletion by emailing privacy@lockerlink.com.",
    ],
  },
  zh: {
    title: "隐私政策",
    description: "Lockerlink 如何收集、使用并保护您的信息。",
    body: [
      "我们仅收集提供寄存、转运与合作服务所需的最少数据。",
      "支付信息通过认证支付渠道安全处理，Lockerlink 不会直接存储。",
      "如需导出或删除数据，请发送邮件至 privacy@lockerlink.com。",
    ],
  },
  ja: {
    title: "プライバシーポリシー",
    description: "Lockerlink が情報を収集・利用・保護する方法を説明します。",
    body: [
      "当社はストレージと転送サービス提供に必要な最小限のデータのみを収集します。",
      "決済情報は認定プロバイダーが安全に処理し、Lockerlink のサーバーには保存されません。",
      "データのエクスポートや削除をご希望の場合は privacy@lockerlink.com までご連絡ください。",
    ],
  },
  ko: {
    title: "개인정보 처리방침",
    description: "Lockerlink가 정보를 수집하고 보호하는 방법을 안내합니다.",
    body: [
      "보관 및 배송 서비스를 제공하는 데 필요한 최소한의 정보만 수집합니다.",
      "결제 정보는 인증된 결제 대행사를 통해 안전하게 처리되며 Lockerlink 서버에 저장되지 않습니다.",
      "데이터 열람 또는 삭제를 원하시면 privacy@lockerlink.com 으로 요청해 주세요.",
    ],
  },
};

export const metadata: Metadata = {
  title: "Lockerlink | Privacy Policy",
};

const PrivacyPage = () => {
  const language = getLanguageFromServer();
  const copy = COPY[language] ?? COPY.en;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-[900px] px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg">{copy.description}</p>
        <div className="mt-10 space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          {copy.body.map((paragraph, index) => (
            <p key={index} className="text-sm text-neutral-600 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
