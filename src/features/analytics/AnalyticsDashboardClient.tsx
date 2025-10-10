"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

interface SummaryResponse {
  range: { from: string; to: string };
  totals: { eventId: string; total: number }[];
  timeline: { bucket: string; eventId: string; total: number }[];
  latest: {
    id: string;
    eventId: string;
    label: string | null;
    language: string | null;
    page: string | null;
    path: string | null;
    metadata: Record<string, unknown> | null;
    userAgent: string | null;
    createdAt: string;
  }[];
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load analytics");
  }
  return (await response.json()) as SummaryResponse;
};

const formatDateInput = (value: string) => value.slice(0, 10);

const toDateTimeLocal = (value: string) => new Date(value).toISOString();

interface AnalyticsDashboardClientProps {
  initialRange: { from: string; to: string };
  initialData: SummaryResponse;
}

export const AnalyticsDashboardClient = ({ initialRange, initialData }: AnalyticsDashboardClientProps) => {
  const [from, setFrom] = useState(formatDateInput(initialRange.from));
  const [to, setTo] = useState(formatDateInput(initialRange.to));

  const query = useMemo(() => {
    const params = new URLSearchParams({
      from: `${from}T00:00:00.000Z`,
      to: `${to}T23:59:59.999Z`,
    });
    return params.toString();
  }, [from, to]);

  const { data, error, isLoading } = useSWR<SummaryResponse>(`/api/analytics/summary?${query}`, fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
  });

  const groupedTimeline = useMemo(() => {
    if (!data) return [] as { bucket: string; values: { eventId: string; total: number }[] }[];
    const map = new Map<string, { eventId: string; total: number }[]>();
    data.timeline.forEach((item) => {
      const existing = map.get(item.bucket) ?? [];
      existing.push({ eventId: item.eventId, total: item.total });
      map.set(item.bucket, existing);
    });
    return Array.from(map.entries()).map(([bucket, values]) => ({ bucket, values }));
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Lockerlink · Analytics</p>
          <h1 className="text-3xl font-semibold text-white">Private Behaviour Dashboard</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Track CTA adoption and navigation flows. Adjust the date range to review performance across releases.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-end gap-4">
            <label className="inline-flex flex-col text-xs font-semibold uppercase tracking-wide text-slate-400">
              From
              <input
                type="date"
                value={from}
                max={to}
                onChange={(event) => setFrom(event.target.value)}
                className="mt-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white shadow-inner focus:border-blue-400 focus:outline-none"
              />
            </label>
            <label className="inline-flex flex-col text-xs font-semibold uppercase tracking-wide text-slate-400">
              To
              <input
                type="date"
                value={to}
                min={from}
                onChange={(event) => setTo(event.target.value)}
                className="mt-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white shadow-inner focus:border-blue-400 focus:outline-none"
              />
            </label>
            <div className="ml-auto text-right text-xs text-slate-400">
              <p>Range</p>
              <p className="text-sm text-white">
                {formatDateInput(data?.range.from ?? initialData.range.from)} → {formatDateInput(data?.range.to ?? initialData.range.to)}
              </p>
            </div>
          </div>
          {error && <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">Failed to load analytics: {error.message}</p>}
          <div className="grid gap-4 md:grid-cols-3">
            {(data?.totals ?? []).map((item) => (
              <div key={item.eventId} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{item.eventId}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{item.total}</p>
              </div>)
            )}
            {!data?.totals?.length && !isLoading && (
              <p className="col-span-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
                No events recorded for the selected range.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <h2 className="text-lg font-semibold text-white">Daily trend</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-200">
            {groupedTimeline.map(({ bucket, values }) => (
              <div key={bucket} className="rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="font-semibold text-white">{bucket}</p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-slate-400">
                    {values.map((value) => (
                      <span key={`${bucket}-${value.eventId}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-slate-200">
                        <span className="text-slate-400">{value.eventId}</span>
                        <span className="text-white">{value.total}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {!groupedTimeline.length && !isLoading && (
              <p className="rounded-2xl border border-white/10 bg-black/30 p-4 text-slate-300">No trend data available.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent activity</h2>
            <p className="text-xs text-slate-400">Latest 50 events</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">Timestamp</th>
                  <th className="px-3 py-2">Event</th>
                  <th className="px-3 py-2">Label</th>
                  <th className="px-3 py-2">Language</th>
                  <th className="px-3 py-2">Path</th>
                  <th className="px-3 py-2">Metadata</th>
                </tr>
              </thead>
              <tbody>
                {(data?.latest ?? []).map((row) => (
                  <tr key={row.id} className="rounded-xl bg-black/30 text-slate-200">
                    <td className="rounded-l-xl px-3 py-2 font-mono text-xs text-slate-400">{toDateTimeLocal(row.createdAt)}</td>
                    <td className="px-3 py-2 font-semibold text-white">{row.eventId}</td>
                    <td className="px-3 py-2">{row.label ?? "—"}</td>
                    <td className="px-3 py-2">{row.language ?? "—"}</td>
                    <td className="px-3 py-2 text-xs">{row.path ?? "—"}</td>
                    <td className="rounded-r-xl px-3 py-2 text-xs text-slate-300">
                      {row.metadata ? JSON.stringify(row.metadata) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!data?.latest?.length && !isLoading && (
            <p className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
              No recorded events in this range.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
