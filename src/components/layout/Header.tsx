"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useAnalytics } from "@/hooks/useAnalytics";
import clsx from "clsx";

const NAV_ITEMS = [
  { key: "storage", href: "/storage" },
  { key: "delivery", href: "/delivery" },
  { key: "partner", href: "/partner" },
  { key: "account", href: "/account" },
] as const;

export const Header = () => {
  const translations = useTranslations();
  const navigation = translations.navigation;
  const pathname = usePathname();
  const { track } = useAnalytics();

  const currentKey = useMemo(() => {
    if (!pathname) return null;
    const match = NAV_ITEMS.find((item) => pathname.startsWith(item.href));
    if (!match && pathname === "/") return "home";
    return match?.key ?? null;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          onClick={() => track("nav_home_click")}
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-orange)] text-white transition group-hover:scale-105">
            L
          </span>
          <span className="group-hover:text-[var(--accent-blue)] transition">Lockerlink</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-600 md:flex">
          <Link
            href="/"
            onClick={() => track("nav_home_click")}
            className={clsx(
              "rounded-full px-4 py-2 transition",
              currentKey === "home"
                ? "bg-neutral-900 text-white"
                : "hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            {navigation.home}
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => track("nav_item_click", { metadata: { target: item.key } })}
              className={clsx(
                "rounded-full px-4 py-2 transition",
                currentKey === item.key
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              {navigation[item.key as keyof typeof navigation]}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden shrink-0 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm md:inline-flex">
            <span className="line-clamp-1">{translations.partnerHighlight.title}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
