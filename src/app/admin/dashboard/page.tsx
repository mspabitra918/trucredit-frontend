"use client";

import StatusBadge from "@/src/components/admin/StatusBadge";
import { adminFetch } from "@/src/lib/admin";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Applicant, ApplicantStats, Lead } from "@/src/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<ApplicantStats | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s, a, l] = await Promise.all([
          adminFetch<ApplicantStats>("/applicants/stats"),
          adminFetch<Applicant[]>("/applicants"),
          adminFetch<Lead[]>("/leads"),
        ]);
        if (cancelled) return;
        setStats(s);
        setRecentApplicants(a.slice(0, 3));
        setRecentLeads(l.slice(0, 5));
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
    return <p className="text-sm text-muted">Loading dashboard…</p>;
  }
  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  const cards = [
    { label: "Total Applicants", value: stats?.total ?? 0 },
    { label: "New This Week", value: stats?.newThisWeek ?? 0 },
    { label: "Under Review", value: stats?.underReview ?? 0 },
    { label: "Interview Stage", value: stats?.interview ?? 0 },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow">Overview</p>
        <h1 className="mt-2 font-serif text-3xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-card border border-line bg-white p-5"
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              {c.label}
            </p>
            <p className="mt-2 font-serif text-3xl">{c.value}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Recent applicants</h2>
          <Link
            href="/admin/applicants"
            className="text-sm text-brand hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-offwhite text-left text-muted">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Applied</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplicants.length === 0 ? (
                <tr>
                  <td className="p-4 text-muted" colSpan={4}>
                    No applicants yet.
                  </td>
                </tr>
              ) : (
                recentApplicants.map((a) => (
                  <tr key={a.id} className="border-t border-line">
                    <td className="p-4">
                      <p className="font-medium">{a.fullName}</p>
                      <p className="text-xs text-muted">{a.email}</p>
                    </td>
                    <td className="p-4 text-body">{a.position}</td>
                    <td className="p-4 text-body">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Recent leads</h2>
          <Link
            href="/admin/leads"
            className="text-sm text-brand hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-offwhite text-left text-muted">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td className="p-4 text-muted" colSpan={4}>
                    No leads yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((l) => (
                  <tr key={l.id} className="border-t border-line">
                    <td className="p-4">
                      <p className="font-medium">{l.fullName}</p>
                      <p className="text-xs text-muted">{l.email}</p>
                    </td>
                    <td className="p-4 text-body">{l.company || "—"}</td>
                    <td className="p-4 text-body capitalize">
                      {l.inquiryType}
                    </td>
                    <td className="p-4 text-body">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
