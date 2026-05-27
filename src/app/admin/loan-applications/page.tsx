"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, adminPatch, downloadCv } from "@/lib/admin";
import {
  POSITIONS,
  STATUSES,
  type Applicant,
  type ApplicantStatus,
} from "@/lib/types";
import StatusBadge from "@/components/admin/StatusBadge";
import { RiCalendarLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";

const todayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function AdminApplicantsPage() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || todayISO();

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [cvDownloadingId, setCvDownloadingId] = useState<string | null>(null);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const queryParam: Record<string, string> = {};

      const isFiltering = positionFilter !== "all" || statusFilter !== "all";

      if (!isFiltering && selectedDate) {
        queryParam.date = selectedDate ? selectedDate : selectedDate;
      }

      if (positionFilter !== "all") {
        queryParam.position = positionFilter;
      }

      if (statusFilter !== "all") {
        queryParam.status = statusFilter;
      }

      const queryString = new URLSearchParams(queryParam).toString();

      const data = await adminFetch<Applicant[]>(`/applicants?${queryString}`);

      setApplicants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [selectedDate, positionFilter, statusFilter]);

  // const filtered = useMemo(() => {
  //   return applicants.filter((a) => {
  //     if (positionFilter !== "all" && a.position !== positionFilter)
  //       return false;
  //     if (statusFilter !== "all" && a.status !== statusFilter) return false;
  //     return true;
  //   });
  // }, [applicants, positionFilter, statusFilter]);

  async function handleStatusChange(id: string, status: ApplicantStatus) {
    setUpdatingId(id);
    try {
      const updated = await adminPatch<Applicant>(`/applicants/${id}/status`, {
        status,
      });
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a)),
      );
      if (selected?.id === id)
        setSelected({ ...selected, status: updated.status });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDownload(a: Applicant) {
    setCvDownloadingId(a.id);
    try {
      await downloadCv(a.id, `${a.fullName}-cv`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Download failed.");
    } finally {
      setCvDownloadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Careers</p>
          <h1 className="mt-2 font-serif text-3xl">Applicants</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="input md:w-auto"
            >
              <option value="all">All roles</option>
              {POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input md:w-auto"
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                load();
                setSelectedDate(todayISO());
                setPositionFilter("all");
                setStatusFilter("all");
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
            {/* <div className="md:col-span-3"> */}
            {/* <label className="block text-sm font-bold text-slate-700 mb-2">
              Filter by Date
            </label> */}

            {/* </div> */}
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
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Experience</th>
              <th className="p-4 font-medium">Applied</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-muted" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : applicants.length === 0 ? (
              <tr>
                <td className="p-4 text-muted" colSpan={6}>
                  No applicants match the current filters.
                </td>
              </tr>
            ) : (
              applicants.map((a) => (
                <tr key={a.id} className="border-t border-line align-top">
                  <td className="p-4">
                    <p className="font-medium">{a.fullName}</p>
                    <p className="text-xs text-muted">{a.email}</p>
                    <p className="text-xs text-muted">{a.phone}</p>
                  </td>
                  <td className="p-4 text-body">{a.position}</td>
                  <td className="p-4 text-body">{a.experience}</td>
                  <td className="p-4 text-body">
                    {new Date(a.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={a.status}
                      disabled={updatingId === a.id}
                      onChange={(e) =>
                        handleStatusChange(
                          a.id,
                          e.target.value as ApplicantStatus,
                        )
                      }
                      className="rounded-md border border-line bg-white px-2 py-1 text-xs disabled:opacity-50"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2">
                      <StatusBadge status={a.status} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setSelected(a)}
                        className="rounded-md border border-line px-3 py-1.5 text-xs hover:bg-offwhite"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(a)}
                        disabled={cvDownloadingId === a.id}
                        className="rounded-md bg-ink px-3 py-1.5 text-xs text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {cvDownloadingId === a.id
                          ? "Downloading…"
                          : "Download CV"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <ApplicantDrawer
          applicant={selected}
          onClose={() => setSelected(null)}
          cvDownloadingId={cvDownloadingId}
          onDownload={() => handleDownload(selected)}
          onStatusChange={(s) => handleStatusChange(selected.id, s)}
          updating={updatingId === selected.id}
        />
      )}
    </div>
  );
}

function ApplicantDrawer(props: {
  applicant: Applicant;
  onClose: () => void;
  cvDownloadingId: string | null;
  onDownload: () => void;
  onStatusChange: (s: ApplicantStatus) => void;
  updating: boolean;
}) {
  const { applicant: a } = props;
  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        aria-label="Close"
        onClick={props.onClose}
        className="flex-1 bg-black/30"
      />
      <aside className="flex w-full max-w-md flex-col overflow-y-auto bg-white p-8 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Applicant</p>
            <h2 className="mt-1 font-serif text-2xl">{a.fullName}</h2>
            <p className="mt-1 text-sm text-muted">{a.position}</p>
          </div>
          <button
            onClick={props.onClose}
            className="text-sm text-muted hover:text-ink"
          >
            Close
          </button>
        </div>

        <dl className="mt-6 space-y-4 text-sm">
          <Row label="Email" value={a.email} />
          <Row label="Phone" value={a.phone} />
          <Row label="Location" value={a.location} />
          <Row label="Experience" value={a.experience} />
          <Row label="Availability" value={a.availability ?? "—"} />
          <Row
            label="LinkedIn"
            value={
              a.linkedinUrl ? (
                <a
                  href={a.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand underline"
                >
                  {a.linkedinUrl}
                </a>
              ) : (
                "—"
              )
            }
          />
          <Row
            label="Applied"
            value={new Date(a.created_at).toLocaleString()}
          />
          {a.coverLetter && (
            <div>
              <dt className="text-muted">Cover Letter</dt>
              <dd className="mt-1 whitespace-pre-wrap rounded-md border border-line bg-offwhite p-3">
                {a.coverLetter}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-6 space-y-3 border-t border-line pt-6">
          <div>
            <label className="label">Status</label>
            <select
              value={a.status}
              disabled={props.updating}
              onChange={(e) =>
                props.onStatusChange(e.target.value as ApplicantStatus)
              }
              className="input disabled:opacity-50"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={props.onDownload}
            disabled={props.cvDownloadingId === a.id}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {props.cvDownloadingId === a.id ? "Downloading…" : "Download CV"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
