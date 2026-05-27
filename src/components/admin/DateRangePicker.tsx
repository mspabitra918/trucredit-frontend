"use client";
import React from "react";

type Props = {
  startDate?: string;
  endDate?: string;
  onChange: (start?: string, end?: string) => void;
};

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm">From</label>
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={startDate || ""}
        onChange={(e) => onChange(e.target.value || undefined, endDate)}
      />

      <label className="text-sm">To</label>
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={endDate || ""}
        onChange={(e) => onChange(startDate, e.target.value || undefined)}
      />
    </div>
  );
}
