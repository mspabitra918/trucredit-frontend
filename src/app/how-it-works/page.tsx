import type { Metadata } from "next";
import Link from "next/link";
import {
  IoSearchOutline,
  IoOptionsOutline,
  IoWalletOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "How It Works — TruCredit",
  description:
    "Three simple steps to your loan: check your rate, choose your terms, and get funded — fast, transparent and fully digital.",
};

const stats = [
  { value: "2 min", label: "To check your rate" },
  { value: "Next day", label: "Average funding (ACH)" },
  { value: "$0", label: "Upfront fees" },
];

const steps = [
  {
    n: "01",
    icon: IoSearchOutline,
    title: "Check Your Rate",
    desc: "Tell us a little about yourself and the amount you need. It takes under two minutes and uses a soft credit check.",
    points: [
      "No impact on your credit score",
      "No upfront or hidden fees",
      "Instant, real-time decisions",
      "100% online — no branch visits",
    ],
  },
  {
    n: "02",
    icon: IoOptionsOutline,
    title: "Choose Your Terms",
    desc: "Review your personalised offer and pick a repayment plan that fits your budget. What you see is exactly what you pay.",
    points: [
      "Flexible terms from 24 to 60 months",
      "Transparent fixed monthly payments",
      "No prepayment or early payoff penalty",
      "Adjust amount before you accept",
    ],
  },
  {
    n: "03",
    icon: IoWalletOutline,
    title: "Get Funded",
    desc: "Accept your offer and complete a quick verification. Funds are deposited straight to your U.S. bank account via ACH.",
    points: [
      "Funds typically available next business day",
      "Direct ACH deposit to your bank account",
      "Dedicated U.S.-based support throughout",
      "Manage everything from your dashboard",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0B7A5A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0B7A5A]">
            Simple. Transparent. Fast.
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            How It <span className="text-[#0B7A5A]">Works</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            We&apos;ve stripped borrowing down to three honest steps — no
            paperwork mountains, no hidden fees, no surprises.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {stats.map((s) => (
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

      {/* Steps */}
      <section className="mx-auto max-w-7xl space-y-10 px-6 py-20 lg:px-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.n}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* Visual */}
              <div className="flex justify-center">
                <div className="relative flex h-60 w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-[#0B7A5A]/10 to-amber-200/30">
                  <span className="absolute left-6 top-6 text-6xl font-black text-[#0B7A5A]/15">
                    {step.n}
                  </span>
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0B7A5A] shadow-2xl shadow-[#0B7A5A]/30">
                    <Icon className="text-white" size={44} />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div>
                <span className="text-sm font-bold text-[#0B7A5A]">
                  Step {step.n}
                </span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {step.title}
                </h2>
                <p className="mt-3 text-gray-500">{step.desc}</p>
                <ul className="mt-6 space-y-3">
                  {step.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-gray-700">
                      <IoCheckmarkCircle
                        className="shrink-0 text-[#0B7A5A]"
                        size={20}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[#0B7A5A] to-[#08664b] px-8 py-14 text-center shadow-2xl shadow-[#0B7A5A]/30">
          <h2 className="text-3xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Check your rate in under two minutes. It&apos;s free and won&apos;t
            affect your credit score.
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
