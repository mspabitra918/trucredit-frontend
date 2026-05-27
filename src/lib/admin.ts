import { API_URL } from "./api";
import type {
  AdminLoan,
  AdminLoanDetail,
  AdminMessage,
  LoanStatus,
} from "../types";

const TOKEN_KEY = "yuba_admin_token";
const EMAIL_KEY = "yuba_admin_email";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

export function setSession(token: string, email: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}

export async function adminLogin(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = (await res.json().catch(() => ({}))) as any;
    const data = result.data || result;

    if (!res.ok || !data.token) {
      throw new Error(result.message || data.message || "Login failed.");
    }
    setSession(data.token, data.user?.email || data.email || email);
    return data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error during login.");
  }
}

export async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken();
  if (!token) throw new Error("Not signed in.");

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      clearSession();
      throw new Error("Session expired. Please sign in again.");
    }

    const data = (await res.json().catch(() => ({}))) as T & {
      message?: string;
    };
    if (!res.ok) {
      throw new Error(
        (data as { message?: string })?.message ||
          `Request failed (${res.status}).`,
      );
    }
    return data as T;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error.");
  }
}

export async function adminPatch<T>(path: string, body: unknown): Promise<T> {
  return adminFetch<T>(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ----------------------------------------------------------------------------
// Typed endpoint helpers — these match the actual TruCredit backend responses,
// which wrap payloads as `{ loans }` / `{ loan }` and return messages as a bare
// array. Keeping the unwrapping here means the pages deal only in clean types.
// ----------------------------------------------------------------------------

/** `GET /api/loans/applications` → `{ loans: [...] }`. */
export async function fetchLoans(query = ""): Promise<AdminLoan[]> {
  const res = await adminFetch<{ loans?: AdminLoan[] }>(
    `/api/loans/applications${query ? `?${query}` : ""}`,
  );
  return res.loans ?? [];
}

/** `GET /api/loans/applications/:id` → `{ loan: {...} }`. */
export async function fetchLoan(id: string): Promise<AdminLoanDetail> {
  const res = await adminFetch<{ loan: AdminLoanDetail }>(
    `/api/loans/applications/${id}`,
  );
  return res.loan;
}

/** `PATCH /api/loans/applications/:id/status` → `{ loan: {...} }`. */
export async function updateLoanStatus(
  id: string,
  status: LoanStatus,
): Promise<AdminLoan> {
  const res = await adminPatch<{ loan: AdminLoan }>(
    `/api/loans/applications/${id}/status`,
    { status },
  );
  return res.loan;
}

/** `GET /api/messages` → bare array of messages. */
export async function fetchMessages(query = ""): Promise<AdminMessage[]> {
  const res = await adminFetch<AdminMessage[]>(
    `/api/messages${query ? `?${query}` : ""}`,
  );
  return Array.isArray(res) ? res : [];
}
