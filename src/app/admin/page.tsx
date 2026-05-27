"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "../../lib/admin";
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin-login");
    }
  }, [router]);

  return null;
}
