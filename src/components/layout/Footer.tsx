"use client";

import Link from "next/link";
import { FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useTranslations } from "@/hooks/useTranslations";
import { useAnalytics } from "@/hooks/useAnalytics";

const SOCIAL_LINKS = [
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiTwitter, href: "https://x.com", label: "X (Twitter)" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
] as const;

export const Footer = () => {
  const { footer } = useTranslations();
  const { track } = useAnalytics();

  return (
    <footer className="border-t border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <div className="inline-flex items-center gap-3 text-xl font-semibold text-neutral-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-orange)] text-white">
              L
            </span>
            <span>Lockerlink</span>
          </div>
          <p className="text-sm text-neutral-600">{footer.about}</p>
          <div className="flex items-center gap-4 pt-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <Link
              href="/analytics"
              onClick={() => track("analytics_dashboard_open")}
              className="group flex h-6 w-6 items-center justify-center rounded-full border border-transparent text-neutral-400 transition hover:border-neutral-600 hover:text-neutral-900 focus-visible:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
            >
              <span className="sr-only">Open analytics dashboard</span>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neutral-300 transition group-hover:bg-[var(--accent-blue)] group-focus-visible:bg-[var(--accent-blue)]" />
            </Link>
          </div>
          <p className="text-sm text-neutral-600">{footer.rights}</p>
        </div>
        <div className="grid flex-1 gap-8 text-sm text-neutral-600 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-semibold text-neutral-900">{footer.contact}</p>
            <a href={`tel:${footer.contactPhone}`} className="block text-neutral-600 transition hover:text-neutral-900">
              {footer.contactPhone}
            </a>
            <a href={`mailto:${footer.contactMail}`} className="block text-neutral-600 transition hover:text-neutral-900">
              {footer.contactMail}
            </a>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-neutral-900">Lockerlink</p>
            <Link href="/privacy" className="block transition hover:text-neutral-900">
              {footer.privacy}
            </Link>
            <Link href="/terms" className="block transition hover:text-neutral-900">
              {footer.terms}
            </Link>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-neutral-900">{footer.partner}</p>
            <Link href="/partner" className="block transition hover:text-neutral-900">
              {footer.partner}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
