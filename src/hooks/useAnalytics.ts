"use client";

export const useAnalytics = () => {
  const track = (eventId?: string, payload?: Record<string, unknown>) => {
    if (!eventId) return;
    const event = {
      event: eventId,
      timestamp: Date.now(),
      ...payload,
    };
    if (typeof window !== "undefined") {
      (window as typeof window & { dataLayer?: unknown[] }).dataLayer = (window as typeof window & {
        dataLayer?: unknown[];
      }).dataLayer ?? [];
      (window as typeof window & { dataLayer: unknown[] }).dataLayer.push(event);
    }
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", event);
    }
  };

  return { track };
};
