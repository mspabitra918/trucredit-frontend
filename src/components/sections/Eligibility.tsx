"use client";

import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

const points = [
  "Age between 21 and 60 years",
  "Minimum monthly income of $180",
  "Valid PAN and Aadhaar card",
  "Active bank account for 6+ months",
];

export default function Eligibility() {
  return (
    <section id="eligibility" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Illustration / checklist card */}
        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-br from-[#0B7A5A] to-[#08664b] p-10 shadow-2xl shadow-[#0B7A5A]/30">
            <div className="rounded-2xl bg-white p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B7A5A]/10">
                  <IoCheckmarkCircle className="text-[#0B7A5A]" size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Eligibility Checklist
                  </p>
                  <p className="text-xs text-gray-400">Quick & paperless</p>
                </div>
              </div>
              <ul className="space-y-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <IoCheckmarkCircle
                      className="shrink-0 text-[#0B7A5A]"
                      size={18}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <h2 className="text-3xl font-bold leading-tight text-gray-900">
            Check your eligibility
            <br />
            in <span className="text-[#0B7A5A]">2 minutes</span>
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Answer a few simple questions and instantly find out how much you
            qualify for — with no impact on your credit score and no obligation
            to apply.
          </p>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-extrabold text-[#0B7A5A]">2 min</p>
              <p className="text-sm text-gray-500">Average time</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-extrabold text-[#0B7A5A]">98%</p>
              <p className="text-sm text-gray-500">Approval rate</p>
            </div>
          </div>

          <Link
            href="/apply"
            className="mt-8 inline-block rounded-xl bg-[#0B7A5A] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]"
          >
            Check Eligibility
          </Link>
        </div>
      </div>
    </section>
  );
}
