import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import type { Language } from "@/lib/i18n/languages";

const COPY: Record<Language, { title: string; description: string; body: string[] }> = {
  en: {
    title: "Terms of Service",
    description: "The rules of using Lockerlink storage, transfer and partner services.",
    body: [
      "Reservations can be modified up to one hour before the scheduled drop-off or pickup time.",
      "Insurance covers luggage up to the amount displayed at checkout. Please declare fragile items in advance.",
      "Violations of safety policies may result in suspension from the Lockerlink network.",
    ],
  },
  zh: {
    title: "服务条款",
    description: "使用 Lockerlink 寄存、转运与合作服务的相关规范。",
    body: [
      "预订可在计划寄存或取件前一小时内修改。",
      "保险额度以结算页面显示为准，请提前申报易碎物品。",
      "如违反安全政策，Lockerlink 有权暂停服务资格。",
    ],
  },
  ja: {
    title: "利用規約",
    description: "Lockerlink のストレージ・転送・パートナーサービス利用ルールです。",
    body: [
      "予約は預け入れまたは受け取り予定時刻の1時間前まで変更可能です。",
      "補償額は決済時に表示される金額が上限となり、壊れやすい荷物は事前申告が必要です。",
      "安全ポリシーに違反した場合、Lockerlink サービスの利用が停止されることがあります。",
    ],
  },
  ko: {
    title: "이용약관",
    description: "Lockerlink 보관 및 배송, 파트너 서비스 이용 규칙입니다.",
    body: [
      "예약은 예정된 보관 또는 수거 시간 1시간 전까지 수정할 수 있습니다.",
      "보험 한도는 결제 시 표시된 금액까지이며, 파손 위험 물품은 사전에 신고해야 합니다.",
      "안전 정책을 위반할 경우 Lockerlink 네트워크 이용이 제한될 수 있습니다.",
    ],
  },
};

export const metadata: Metadata = {
  title: "Lockerlink | Terms of Service",
};

const TermsPage = () => {
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

export default TermsPage;
