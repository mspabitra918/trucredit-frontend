"use client";

import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

const steps = [
  {
    n: "1",
    title: "Apply Online",
    desc: "Fill the short application form in under 2 minutes.",
  },
  {
    n: "2",
    title: "Get Verified",
    desc: "We verify your details instantly with secure systems.",
  },
  {
    n: "3",
    title: "Get Approved",
    desc: "Receive approval and your custom loan offer.",
  },
  {
    n: "4",
    title: "Get Funds",
    desc: "Money is disbursed straight to your bank account.",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0B7A5A] focus:bg-white focus:ring-2 focus:ring-[#0B7A5A]/20";

export default function HowItWorks() {
  return (
    <section className="bg-[#F2FAF6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          How it <span className="text-[#0B7A5A]">works</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
          Get your loan in four simple steps.
        </p>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
          {/* Steps */}
          <div className="space-y-7">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B7A5A] text-lg font-bold text-white shadow-md">
                    {step.n}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="mt-1 h-12 w-0.5 bg-[#0B7A5A]/20" />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Apply form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
            <h3 className="mb-1 text-xl font-bold text-gray-900">
              Get started now
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              No impact on your credit score.
            </p>

            <form className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input className={inputClass} placeholder="John Doe" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Monthly Income
                  </label>
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>$1,500 - $3,000</option>
                    <option>$3,000 - $6,000</option>
                    <option>$6,000+</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Age
                  </label>
                  <input
                    className={inputClass}
                    placeholder="25"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Loan Amount
                  </label>
                  <input
                    className={inputClass}
                    placeholder="$5,000"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Employment Type
                  </label>
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Employed</option>
                    <option>Self-employed</option>
                    <option>Retired</option>
                  </select>
                </div>
              </div>

              <button className="mt-2 w-full rounded-xl bg-[#0B7A5A] py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]">
                <Link href="/apply">Check Eligibility</Link>
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <IoCheckmarkCircle className="text-[#0B7A5A]" size={14} />
                Your information is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
