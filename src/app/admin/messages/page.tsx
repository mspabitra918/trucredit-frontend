"use client";

import { useEffect, useMemo, useState } from "react";
import { RiCalendarLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFetch } from "@/src/lib/admin";
import { Lead } from "@/src/types";

const todayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function AdminLeadsPage() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || todayISO();
  const initialQuery = searchParams.get("q") || "";

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const queryParam: Record<string, string> = {};

      const isFilter = typeFilter !== "all";

      if (!isFilter && selectedDate) {
        queryParam.date = selectedDate;
      }

      if (typeFilter !== "all") {
        queryParam.inquiryType = typeFilter;
      }
      const queryString = new URLSearchParams(queryParam).toString();

      const data = await adminFetch<Lead[]>(`/leads?${queryString}`);
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [selectedDate, typeFilter]);

  // const filtered = useMemo(() => {
  //   return leads.filter((l) =>
  //     typeFilter === "all" ? true : l.inquiryType === typeFilter,
  //   );
  // }, [leads, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Inquiries</p>
          <h1 className="mt-2 font-serif text-3xl">Leads</h1>
        </div>
        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input md:w-auto"
          >
            <option value="all">All types</option>
            <option value="client">Client Inquiry</option>
            <option value="general">General</option>
          </select>
          <button
            onClick={() => {
              load();
              setSelectedDate(todayISO());
              setTypeFilter("all");
            }}
            className="btn-secondary !py-2 !text-xs border-slate-200"
          >
            Refresh
          </button>

          <div className="relative">
            <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-offwhite text-left text-muted">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Company</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Received</th>
              <th className="p-4 font-medium">Synced</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-muted" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td className="p-4 text-muted" colSpan={6}>
                  No leads found.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-t border-line align-top">
                  <td className="p-4">
                    <p className="font-medium">{l.fullName}</p>
                    <p className="text-xs text-muted">{l.email}</p>
                    {l.phone && <p className="text-xs text-muted">{l.phone}</p>}
                  </td>
                  <td className="p-4 text-body">{l.company || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        l.inquiryType === "client"
                          ? "bg-infobg text-brand"
                          : "bg-offwhite text-body"
                      }`}
                    >
                      {l.inquiryType === "client" ? "Client" : "General"}
                    </span>
                  </td>
                  <td className="p-4 text-body">
                    {new Date(l.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 text-body">
                    {l.crmSynced ? "Yes" : "No"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelected(l)}
                      className="rounded-md border border-line px-3 py-1.5 text-xs hover:bg-offwhite"
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
            className="flex-1 bg-black/30"
          />
          <aside className="flex w-full max-w-md flex-col overflow-y-auto bg-white p-8 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Lead</p>
                <h2 className="mt-1 font-serif text-2xl">
                  {selected.fullName}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {selected.company || "No company provided"}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-muted hover:text-ink"
              >
                Close
              </button>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <DRow label="Email" value={selected.email} />
              <DRow label="Phone" value={selected.phone || "—"} />
              <DRow
                label="Inquiry Type"
                value={selected.inquiryType === "client" ? "Client" : "General"}
              />
              <DRow
                label="Received"
                value={new Date(selected.created_at).toLocaleString()}
              />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Message
                </dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-md border border-line bg-offwhite p-3">
                  {selected.message}
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-line pt-6">
              <a
                href={`mailto:${selected.email}`}
                className="btn-primary w-full"
              >
                Reply by Email
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function DRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
