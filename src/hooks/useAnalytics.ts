"use client";

import { useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const ANALYTICS_ENDPOINT = "/api/analytics/track";

interface TrackOptions {
  label?: string;
  metadata?: Record<string, unknown>;
}

const sendEvent = async (body: Record<string, unknown>) => {
  try {
    const json = JSON.stringify(body);
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([json], { type: "application/json" });
      navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
      return;
    }

    await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
      keepalive: true,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] failed", error);
    }
  }
};

export const useAnalytics = () => {
  const { language } = useLanguage();

  const track = useCallback(
    (eventId?: string, options?: TrackOptions) => {
      if (!eventId) return;

      const payload = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        eventId,
        label: options?.label,
        language,
        page: typeof document !== "undefined" ? document.title : undefined,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
        metadata: options?.metadata ?? null,
        occurredAt: new Date().toISOString(),
      } as const;

      if (typeof window !== "undefined") {
        const globalScope = window as typeof window & { dataLayer?: unknown[] };
        globalScope.dataLayer = globalScope.dataLayer ?? [];
        globalScope.dataLayer.push(payload);
      }

      if (process.env.NODE_ENV !== "production") {
        console.info("[analytics]", payload);
      }

      void sendEvent(payload);
    },
    [language]
  );

  return { track };
};
