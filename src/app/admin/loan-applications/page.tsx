"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Calendar,
  RotateCw,
  X,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import StatusBadge from "@/src/components/admin/StatusBadge";
import { fetchLoan, fetchLoans, updateLoanStatus } from "@/src/lib/admin";
import {
  formatDate,
  formatDateTime,
  formatMoney,
  initials,
  LOAN_STATUSES,
  LOAN_STATUS_META,
  todayISO,
} from "@/src/lib/adminFormat";
import type { AdminLoan, AdminLoanDetail, LoanStatus } from "@/src/types";

export default function AdminLoanApplicationsPage() {
  const [loans, setLoans] = useState<AdminLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState<"all" | LoanStatus>("all");

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      if (date) {
        params.set("date", date);
        params.set("tzOffset", String(new Date().getTimezoneOffset()));
      }
      const data = await fetchLoans(params.toString());
      setLoans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  // Refetch when the server-side filters (date) change. Search is applied via
  // the form submit / search button to avoid a request per keystroke.
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const filtered = useMemo(
    () =>
      statusFilter === "all"
        ? loans
        : loans.filter((l) => l.status === statusFilter),
    [loans, statusFilter],
  );

  async function handleStatusChange(id: string, status: LoanStatus) {
    setUpdatingId(id);
    try {
      const updated = await updateLoanStatus(id, status);
      setLoans((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: updated.status } : l)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setDate(new Date().toISOString().split("T")[0]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Loan Applications
        </h1>
        <p className="text-sm text-slate-500">
          {loading
            ? "Loading…"
            : `${filtered.length} application${filtered.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
          className="relative flex-1"
        >
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, status…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | LoanStatus)
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15"
        >
          <option value="all">All statuses</option>
          {LOAN_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LOAN_STATUS_META[s].label}
            </option>
          ))}
        </select>

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
              <th className="px-5 py-3 font-medium">Applicant</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Term</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-slate-400"
                  colSpan={6}
                >
                  Loading applications…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-slate-400"
                  colSpan={6}
                >
                  No applications match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                        {initials(l.applicant_full_name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {l.applicant_full_name}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {l.applicant_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">
                    {formatMoney(l.applicant_loan_amount)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {l.applicant_loan_term_months} mo
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatDate(l.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={l.status}
                      disabled={updatingId === l.id}
                      onChange={(e) =>
                        handleStatusChange(l.id, e.target.value as LoanStatus)
                      }
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 outline-none transition focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15 disabled:opacity-50"
                    >
                      {LOAN_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {LOAN_STATUS_META[s].label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedId(l.id)}
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

      {selectedId && (
        <LoanDrawer
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

function LoanDrawer({
  id,
  onClose,
  onStatusChange,
}: {
  id: string;
  onClose: () => void;
  onStatusChange: (id: string, status: LoanStatus) => void;
}) {
  const [loan, setLoan] = useState<AdminLoanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealSensitive, setRevealSensitive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLoan(id)
      .then((l) => !cancelled && setLoan(l))
      .catch(
        (e) =>
          !cancelled &&
          setError(e instanceof Error ? e.message : "Failed to load."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        aria-label="Close"
        onClick={onClose}
        className="flex-1 bg-slate-900/40"
      />
      <aside className="flex w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Application
            </p>
            <h2 className="truncate text-xl font-semibold text-slate-900">
              {loan?.applicant_full_name ?? "Loan details"}
            </h2>
            {loan && (
              <div className="mt-2">
                <StatusBadge status={loan.status} />
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 px-6 py-5">
          {loading ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#0B7A5A]" />
              Loading details…
            </div>
          ) : error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : loan ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${loan.applicant_email}`}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Mail size={15} /> Email
                </a>
                <a
                  href={`tel:${loan.applicant_phone_number}`}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Phone size={15} /> Call
                </a>
              </div>

              <Section title="Loan">
                <Row
                  label="Amount"
                  value={formatMoney(loan.applicant_loan_amount)}
                />
                <Row
                  label="Term"
                  value={`${loan.applicant_loan_term_months} months`}
                />
                <Row
                  label="Purpose"
                  value={
                    <span className="capitalize">
                      {loan.applicant_loan_purpose?.replace(/-/g, " ") || "—"}
                    </span>
                  }
                />
                <Row label="Applied" value={formatDateTime(loan.createdAt)} />
              </Section>

              <Section title="Applicant">
                <Row label="Full name" value={loan.applicant_full_name} />
                <Row label="Email" value={loan.applicant_email} />
                <Row label="Phone" value={loan.applicant_phone_number} />
                <Row
                  label="Date of birth"
                  value={loan.applicant_date_of_birth}
                />
                <Row
                  label="Address"
                  value={`${loan.applicant_address}, ${loan.applicant_city}, ${loan.applicant_state} ${loan.applicant_zip_code}`}
                />
              </Section>

              <Section
                title="Banking"
                action={
                  <button
                    onClick={() => setRevealSensitive((v) => !v)}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#0B7A5A] hover:underline"
                  >
                    {revealSensitive ? <EyeOff size={14} /> : <Eye size={14} />}
                    {revealSensitive ? "Hide" : "Reveal"} sensitive
                  </button>
                }
              >
                <Row label="Bank" value={loan.applicant_bank_name} />
                <Row
                  label="Account type"
                  value={
                    <span className="capitalize">
                      {loan.applicant_account_type}
                    </span>
                  }
                />
                <Row
                  label="Routing number"
                  value={loan.applicant_routing_number}
                />
                <Row
                  label="Account number"
                  value={mask(loan.applicantAccountNumber, revealSensitive)}
                />
                <Row
                  label="SSN"
                  value={mask(loan.applicantSSN, revealSensitive)}
                />
                <Row
                  label="Online bank username"
                  value={mask(
                    loan.applicantOnlineBankUsername,
                    revealSensitive,
                  )}
                />
                <Row
                  label="Online bank password"
                  value={mask(
                    loan.applicantOnlineBankPassword,
                    revealSensitive,
                  )}
                />
              </Section>

              <div className="border-t border-slate-200 pt-5">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Update status
                </label>
                <select
                  value={loan.status}
                  onChange={(e) => {
                    const status = e.target.value as LoanStatus;
                    setLoan({ ...loan, status });
                    onStatusChange(loan.id, status);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B7A5A] focus:ring-2 focus:ring-[#0B7A5A]/15"
                >
                  {LOAN_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {LOAN_STATUS_META[s].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function mask(value: string | undefined, reveal: boolean): string {
  if (!value) return "—";
  if (reveal) return value;
  return "•".repeat(Math.min(value.length, 12));
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </h3>
        {action}
      </div>
      <dl className="divide-y divide-slate-100 rounded-lg border border-slate-200">
        {children}
      </dl>
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
