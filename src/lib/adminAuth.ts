export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("yuba_admin_token");
}

export function authHeaders(extra?: Record<string, string>): HeadersInit {
  const token = getAdminToken();
  return {
    ...(extra ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("yuba_admin_token");
  localStorage.removeItem("yuba_admin_email");
}

export type AdminMeUser = {
  id?: string;
  email?: string;
  fullName?: string;
  role?: "user" | "admin";
};

export async function fetchAdminMe(
  apiUrl: string,
): Promise<AdminMeUser | null> {
  const token = getAdminToken();
  if (!token) return null;

  const res = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;

  const payload = await res.json().catch(() => null);
  const user = payload?.data ?? payload?.user ?? payload;
  return user ?? null;
}
