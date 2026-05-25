import {
  IoTrendingDown,
  IoFlash,
  IoDocumentTextOutline,
  IoShieldCheckmark,
} from "react-icons/io5";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";

const badges = [
  { icon: IoTrendingDown, label: "Low Interest" },
  { icon: IoFlash, label: "Quick Approval" },
  { icon: IoDocumentTextOutline, label: "Minimal Docs" },
  { icon: IoShieldCheckmark, label: "100% Secure" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-white">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0B7A5A]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
        {/* Left */}
        <div>
          <p className="mb-4 text-sm font-medium text-gray-400">
            Home <span className="mx-1">›</span> Loans{" "}
            <span className="mx-1">›</span>{" "}
            <span className="text-[#0B7A5A]">Personal</span>
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Loans made
            <br />
            <span className="text-[#0B7A5A]">Simple &amp; Easy</span>
          </h1>

          <p className="mt-5 max-w-md text-lg text-gray-500">
            Get the funds you need, when you need them. Fast approvals,
            transparent rates, and zero hidden charges.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-full border border-[#0B7A5A]/15 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                <Icon className="text-[#0B7A5A]" size={16} />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#eligibility"
              className="rounded-xl bg-[#0B7A5A] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b] hover:shadow-xl"
            >
              Check Eligibility
            </a>
            <a
              href="#apply"
              className="rounded-xl border border-[#0B7A5A] px-7 py-3.5 font-semibold text-[#0B7A5A] transition hover:bg-[#0B7A5A] hover:text-white"
            >
              Apply for Loan
            </a>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative flex justify-center">
          {/* "Get up to" pill */}
          <div className="absolute -top-2 right-2 z-10 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-xl">
            <p className="text-xs font-medium text-gray-400">Get up to</p>
            <p className="text-2xl font-extrabold text-[#0B7A5A]">$10,000</p>
          </div>

          <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-[#0B7A5A]/10 to-amber-200/30 sm:h-96 sm:w-96">
            {/* money bag */}
            <div className="flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-[#0B7A5A] shadow-2xl shadow-[#0B7A5A]/30 sm:h-52 sm:w-52">
              <FaDollarSign className="text-white" size={88} />
            </div>

            {/* coin stacks */}
            <div className="absolute bottom-6 left-6 flex items-end gap-1.5">
              {[3, 5, 4].map((h, i) => (
                <span
                  key={i}
                  className="block w-6 rounded-md bg-gradient-to-t from-amber-500 to-amber-300 shadow-md"
                  style={{ height: `${h * 14}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
