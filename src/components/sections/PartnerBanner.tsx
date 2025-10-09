import Link from "next/link";
import { TranslationContent } from "@/lib/i18n/translations";

interface PartnerBannerProps {
  id?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  highlight: TranslationContent["partnerHighlight"];
}

export const PartnerBanner = ({ id, title, subtitle, primaryCta, secondaryCta, highlight }: PartnerBannerProps) => {
  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-3xl border border-white bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-orange)] p-[1px] shadow-[0_25px_50px_-35px_rgba(15,23,42,0.4)]"
    >
      <div className="relative rounded-[calc(1.5rem-1px)] bg-white p-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-blue)]">{highlight.cta}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
            <p className="text-base text-neutral-600 sm:text-lg">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent-blue)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-blue)]/30 transition hover:bg-[#1a6bff]"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {secondaryCta.label}
            </Link>
            <p className="text-xs text-neutral-500">{highlight.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
