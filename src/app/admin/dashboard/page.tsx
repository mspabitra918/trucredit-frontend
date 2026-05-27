"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  Banknote,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import StatusBadge from "@/src/components/admin/StatusBadge";
import { fetchLoans, fetchMessages } from "@/src/lib/admin";
import {
  formatDate,
  formatMoney,
  initials,
  LOAN_STATUS_META,
} from "@/src/lib/adminFormat";
import type { AdminLoan, AdminMessage, LoanStats } from "@/src/types";

function computeStats(loans: AdminLoan[]): LoanStats {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return loans.reduce<LoanStats>(
    (acc, l) => {
      acc.total += 1;
      if (new Date(l.createdAt).getTime() >= weekAgo) acc.newThisWeek += 1;
      if (l.status === "IN_REVIEW") acc.inReview += 1;
      if (l.status === "APPROVED") acc.approved += 1;
      if (l.status === "FUNDED") acc.funded += 1;
      if (l.status === "REJECTED") acc.rejected += 1;
      return acc;
    },
    {
      total: 0,
      newThisWeek: 0,
      inReview: 0,
      approved: 0,
      funded: 0,
      rejected: 0,
    },
  );
}

export default function AdminDashboardPage() {
  const [loans, setLoans] = useState<AdminLoan[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [l, m] = await Promise.all([fetchLoans(), fetchMessages()]);
        if (cancelled) return;
        setLoans(l);
        setMessages(m);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#0B7A5A]" />
        Loading dashboard…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  const stats = computeStats(loans);
  const cards = [
    {
      label: "Total Applications",
      value: stats.total,
      sub: `${stats.newThisWeek} new this week`,
      icon: FileText,
      tint: "bg-[#0B7A5A]/10 text-[#0B7A5A]",
    },
    {
      label: "In Review",
      value: stats.inReview,
      sub: "Awaiting decision",
      icon: Clock,
      tint: "bg-amber-50 text-amber-600",
    },
    {
      label: "Approved",
      value: stats.approved,
      sub: "Ready to fund",
      icon: CheckCircle2,
      tint: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Funded",
      value: stats.funded,
      sub: "Disbursed loans",
      icon: Banknote,
      tint: "bg-sky-50 text-sky-600",
    },
  ];

  const recentLoans = loans.slice(0, 5);
  const recentMessages = messages.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of loan applications and incoming messages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.tint}`}
                >
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                {c.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {c.label}
              </p>
              <p className="text-xs text-slate-400">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Recent applications */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Recent applications
          </h2>
          <Link
            href="/admin/loan-applications"
            className="flex items-center gap-1 text-sm font-medium text-[#0B7A5A] hover:underline"
          >
            View all <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Applicant</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Purpose</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLoans.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-400" colSpan={5}>
                    No applications yet.
                  </td>
                </tr>
              ) : (
                recentLoans.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
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
                    <td className="px-5 py-3.5 capitalize text-slate-500">
                      {l.applicant_loan_purpose?.replace(/-/g, " ") || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {formatDate(l.createdAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={l.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent messages */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Recent messages
          </h2>
          <Link
            href="/admin/messages"
            className="flex items-center gap-1 text-sm font-medium text-[#0B7A5A] hover:underline"
          >
            View all <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentMessages.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">
              No messages yet.
            </p>
          ) : (
            recentMessages.map((m) => (
              <div
                key={m.id}
                className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B7A5A]/10 text-[#0B7A5A]">
                  <MessageSquare size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium text-slate-900">
                      {m.full_name}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(m.created_at)}
                    </span>
                  </div>
                  <p className="truncate text-sm text-slate-600">{m.subject}</p>
                  <p className="truncate text-xs text-slate-400">{m.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Pipeline summary */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-base font-semibold text-slate-900">
          Pipeline breakdown
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(LOAN_STATUS_META) as (keyof typeof LOAN_STATUS_META)[]).map(
            (s) => {
              const count = loans.filter((l) => l.status === s).length;
              return (
                <div
                  key={s}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${LOAN_STATUS_META[s].dot}`}
                  />
                  <span className="text-sm text-slate-600">
                    {LOAN_STATUS_META[s].label}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {count}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}
