"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Calendar, RotateCw, X, Mail, Phone } from "lucide-react";
import { fetchMessages } from "@/src/lib/admin";
import {
  formatDate,
  formatDateTime,
  initials,
  todayISO,
} from "@/src/lib/adminFormat";
import type { AdminMessage } from "@/src/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState<AdminMessage | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      const data = await fetchMessages(params.toString());
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.full_name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q),
    );
  }, [messages, search]);

  function resetFilters() {
    setSearch("");
    setDate("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Messages
        </h1>
        <p className="text-sm text-slate-500">
          {loading
            ? "Loading…"
            : `${filtered.length} message${filtered.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, subject…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15"
          />
        </div>

        <div className="relative">
          <Calendar
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="date"
            value={date}
            max={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15"
          />
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCw size={16} />
          Reset
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">From</th>
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Received</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-slate-400"
                  colSpan={4}
                >
                  Loading messages…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-slate-400"
                  colSpan={4}
                >
                  No messages found.
                </td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr
                  key={m.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => setSelected(m)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B7A5A]/10 text-xs font-semibold text-[#0B7A5A]">
                        {initials(m.full_name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {m.full_name}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {m.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-700">{m.subject}</p>
                    <p className="max-w-md truncate text-xs text-slate-400">
                      {m.message}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatDate(m.created_at)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(m);
                      }}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <button
            aria-label="Close"
            onClick={() => setSelected(null)}
            className="flex-1 bg-slate-900/40"
          />
          <aside className="flex w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Message
                </p>
                <h2 className="truncate text-xl font-semibold text-slate-900">
                  {selected.full_name}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-5 px-6 py-5">
              <dl className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                <Row label="Email" value={selected.email} />
                <Row label="Phone" value={selected.number || "—"} />
                <Row label="Subject" value={selected.subject} />
                <Row
                  label="Received"
                  value={formatDateTime(selected.created_at)}
                />
              </dl>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Message
                </h3>
                <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  {selected.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-5">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                    selected.subject,
                  )}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B7A5A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#08664b]"
                >
                  <Mail size={16} /> Reply
                </a>
                {selected.number && (
                  <a
                    href={`tel:${selected.number}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Phone size={16} /> Call
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 px-3 py-2.5">
      <dt className="shrink-0 text-sm text-slate-500">{label}</dt>
      <dd className="break-words text-right text-sm font-medium text-slate-800">
        {value}
      </dd>
    </div>
  );
}
