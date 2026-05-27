"use client";
import React, { useState } from "react";

type Props = { onSearch: (q: string) => void };

export default function SearchBar({ onSearch }: Props) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(q.trim());
        }}
      />
      <button
        className="px-4 py-2 bg-[#0B7A5A] text-white rounded"
        onClick={() => onSearch(q.trim())}
      >
        Search
      </button>
    </div>
  );
}
