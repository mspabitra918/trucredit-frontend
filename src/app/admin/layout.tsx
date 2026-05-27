"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getEmail, getToken } from "../../lib/admin";
import { API_URL } from "../../lib/api";
import { fetchAdminMe } from "../../lib/adminAuth";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applicants", label: "Applicants" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const isLoginPage =
    pathname === "/admin-login" || pathname === "/admin-login/";

  useEffect(() => {
    const token = getToken();
    if (!token && !isLoginPage) {
      router.replace("/admin-login");
      return;
    }
    if (token && isLoginPage) {
      router.replace("/admin/dashboard");
      return;
    }

    if (token && !isLoginPage) {
      fetchAdminMe(API_URL).then((user) => {
        if (!user) {
          clearSession();
          router.replace("/admin-login");
        } else {
          setEmail(user.email ?? getEmail());
          setReady(true);
        }
      });
    } else {
      setEmail(getEmail());
      setReady(true);
    }
  }, [isLoginPage, router]);

  function handleLogout() {
    clearSession();
    router.replace("/admin-login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-offwhite">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-offwhite">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-white md:block ">
        <div className="border-b border-line px-6 py-5">
          <Link href="/admin/dashboard" className="font-serif text-lg">
            Yuba Admin
          </Link>
          <p className="mt-1 text-xs text-muted">{email}</p>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {adminLinks.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-infobg font-medium text-brand"
                    : "text-body hover:bg-offwhite"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-md border border-line px-3 py-2 text-left text-sm text-body hover:bg-offwhite"
          >
            Sign out
          </button>
          <Link
            href="/"
            className="mt-2 block rounded-md px-3 py-2 text-xs text-muted hover:text-ink"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-6 py-4 md:hidden">
          <Link href="/admin/dashboard" className="font-serif text-lg">
            Yuba Admin
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-muted hover:text-ink"
          >
            Sign out
          </button>
        </header>
        <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
