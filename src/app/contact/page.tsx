import type { Metadata } from "next";
import {
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import PageHeader from "../../components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Contact — TruCredit",
  description: "Get in touch with the TruCredit team. We're here to help.",
};

const details = [
  { icon: IoCallOutline, label: "Phone", value: "1800 123 4567", sub: "Toll-free, all India" },
  { icon: IoMailOutline, label: "Email", value: "support@trucredit.in", sub: "We reply within 24 hours" },
  { icon: IoLocationOutline, label: "Office", value: "Bandra Kurla Complex", sub: "Mumbai, Maharashtra 400051" },
  { icon: IoTimeOutline, label: "Hours", value: "Mon – Sat, 9am – 7pm", sub: "Closed on public holidays" },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0B7A5A] focus:bg-white focus:ring-2 focus:ring-[#0B7A5A]/20";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in"
        highlight="Touch"
        subtitle="Have a question about your loan or application? Our team is ready to help."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Contact details */}
          <div className="grid gap-5 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value, sub }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B7A5A]/10">
                  <Icon className="text-[#0B7A5A]" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-400">{label}</p>
                <p className="mt-1 font-semibold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{sub}</p>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
            <h2 className="mb-1 text-xl font-bold text-gray-900">
              Send us a message
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Fill in the form and we&apos;ll get back to you shortly.
            </p>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <input className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Mobile Number
                  </label>
                  <input
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    inputMode="tel"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  className={inputClass}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Subject
                </label>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>Loan application</option>
                  <option>Existing loan</option>
                  <option>Rates &amp; fees</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  className={`${inputClass} min-h-28 resize-y`}
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0B7A5A] py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
