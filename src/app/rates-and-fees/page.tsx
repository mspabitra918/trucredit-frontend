import type { Metadata } from "next";
import Link from "next/link";
import {
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoFlashOutline,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "Rates & Fees — TruCredit",
  description:
    "Transparent pricing at the core of TruCredit. No hidden fees, no surprises — just honest lending.",
};

const heroStats = [
  { value: "10.5%", label: "Starting rate (p.a.)" },
  { value: "₹0", label: "Upfront fees" },
  { value: "12–60", label: "Months tenure" },
];

const feeSchedule = [
  { type: "Origination fee", amount: "₹0" },
  { type: "Upfront processing fee", amount: "₹0" },
  { type: "Prepayment / foreclosure", amount: "None" },
  { type: "Late payment fee", amount: "₹500 (after grace period)" },
  { type: "Application fee", amount: "₹0" },
  { type: "GST", amount: "As applicable" },
];

const rateTiers = [
  { product: "Personal Loan", rate: "10.5% – 18%", range: "₹50,000 – ₹15,00,000" },
  { product: "Business Loan", rate: "12% – 22%", range: "₹1,00,000 – ₹50,00,000" },
  { product: "Home Loan", rate: "6.5% – 9%", range: "₹5,00,000 – ₹2,00,00,000" },
  { product: "Education Loan", rate: "8% – 13%", range: "₹50,000 – ₹40,00,000" },
];

const examples = [
  {
    amount: "₹1,00,000",
    detail: "for 24 months at 10.5% p.a.",
    emi: "₹4,635",
    note: "Less than most monthly rent commitments.",
  },
  {
    amount: "₹3,00,000",
    detail: "for 36 months at 11% p.a.",
    emi: "₹9,821",
    note: "A comfortable EMI for salaried borrowers.",
  },
  {
    amount: "₹5,00,000",
    detail: "for 48 months at 12% p.a.",
    emi: "₹13,167",
    note: "Spread larger needs over a longer term.",
  },
];

const trust = [
  { icon: IoLockClosedOutline, title: "256-bit encryption", desc: "Your data is secured end-to-end." },
  { icon: IoShieldCheckmarkOutline, title: "₹0 upfront guarantee", desc: "You never pay before disbursal." },
  { icon: IoFlashOutline, title: "Instant decisions", desc: "Real-time eligibility, no waiting." },
];

export default function RatesAndFeesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0B7A5A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Rates &amp; <span className="text-[#0B7A5A]">Fees</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Transparent pricing is at the core of TruCredit. No hidden fees, no
            surprises — just honest lending.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className="text-3xl font-extrabold text-[#0B7A5A]">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Fee schedule */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Fee Schedule</h2>
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#0B7A5A] text-sm text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Fee Type</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {feeSchedule.map((row) => (
                <tr key={row.type} className="bg-white hover:bg-[#F2FAF6]">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {row.type}
                  </td>
                  <td className="px-6 py-4">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rates by product */}
        <h2 className="mt-16 mb-6 text-2xl font-bold text-gray-900">
          Interest Rates by Product
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#0B7A5A] text-sm text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Interest Rate (p.a.)</th>
                <th className="px-6 py-4 font-semibold">Loan Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {rateTiers.map((row) => (
                <tr key={row.product} className="bg-white hover:bg-[#F2FAF6]">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {row.product}
                  </td>
                  <td className="px-6 py-4">{row.rate}</td>
                  <td className="px-6 py-4">{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Final rate depends on your credit profile, income and loan amount.
        </p>

        {/* Loan examples */}
        <h2 className="mt-16 mb-6 text-2xl font-bold text-gray-900">
          Loan Examples
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {examples.map((ex) => (
            <div
              key={ex.amount}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <p className="text-sm text-gray-400">Borrow</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {ex.amount}
              </p>
              <p className="mt-1 text-sm text-gray-500">{ex.detail}</p>
              <div className="my-5 border-t border-dashed border-gray-200" />
              <p className="text-sm text-gray-400">Monthly EMI</p>
              <p className="text-2xl font-extrabold text-[#0B7A5A]">{ex.emi}</p>
              <p className="mt-3 text-sm text-gray-500">{ex.note}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {trust.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl bg-[#F2FAF6] p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <Icon className="text-[#0B7A5A]" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#0B7A5A] to-[#08664b] px-8 py-14 text-center shadow-2xl shadow-[#0B7A5A]/30">
          <h2 className="text-3xl font-bold text-white">
            See your personalised rate
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Checking is free and won&apos;t affect your credit score.
          </p>
          <Link
            href="/emi-calculator"
            className="mt-7 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-[#0B7A5A] shadow-lg transition hover:bg-gray-50"
          >
            Check Your Rate
          </Link>
        </div>
      </section>
    </>
  );
}
