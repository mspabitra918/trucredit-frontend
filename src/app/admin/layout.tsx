"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { clearSession, getEmail, getToken } from "../../lib/admin";
import { API_URL } from "../../lib/api";
import { fetchAdminMe } from "../../lib/adminAuth";
import { initials } from "../../lib/adminFormat";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin/loan-applications",
    label: "Loan Applications",
    icon: FileText,
  },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#0B7A5A]" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  const SidebarBody = () => (
    <div className="fixed flex h-full w-64 flex-col justify-between border-r border-slate-200 bg-white">
      <div>
        <div className="flex items-center gap-2.5 border-b border-slate-200 px-6 py-5 ">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B7A5A] text-sm font-bold text-white">
            TC
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">TruCredit</p>
            <p className="text-xs text-slate-400">Admin Console</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {adminLinks.map((l) => {
            const active = pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#0B7A5A]/10 text-[#0B7A5A]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4.5 w-4.5" size={18} />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-3 ">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {initials(email || "Admin")}
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-medium text-slate-700">
              {email || "Administrator"}
            </p>
            <p className="text-[11px] text-slate-400">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={18} />
          Sign out
        </button>
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-400 transition hover:text-slate-700"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <SidebarBody />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="flex-1 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="flex w-64 flex-col bg-white shadow-xl">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarBody />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 md:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
            >
              <Menu size={20} />
            </button>
            <span className="font-semibold text-slate-900">TruCredit</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            Sign out
          </button>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
