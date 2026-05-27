export const API_URL =
  // process.env.NEXT_PUBLIC_API_URL || "https://api.yubamedia.com";
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as T & {
      message?: string;
    };

    if (!res.ok) {
      throw new Error(
        (data as { message?: string })?.message ||
          `Request failed with status ${res.status}`,
      );
    }
    return data as T;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error. Please try again.");
  }
}

export async function postForm<T>(path: string, form: FormData): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "X-Requested-With": "fetch" },
      body: form,
    });

    const data = (await res.json().catch(() => ({}))) as T & {
      message?: string;
    };

    if (!res.ok) {
      throw new Error(
        (data as { message?: string })?.message ||
          `Request failed with status ${res.status}`,
      );
    }
    return data as T;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error. Please try again.");
  }
}
