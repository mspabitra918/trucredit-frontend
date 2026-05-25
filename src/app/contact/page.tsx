import type { Metadata } from "next";
import {
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import PageHeader from "../../components/sections/PageHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — TruCredit",
  description: "Get in touch with the TruCredit team. We're here to help.",
};

const details = [
  {
    icon: IoCallOutline,
    label: "Phone",
    value: "1800 123 4567",
    sub: "Toll-free, all India",
  },
  {
    icon: IoMailOutline,
    label: "Email",
    value: "support@trucredit.in",
    sub: "We reply within 24 hours",
  },
  {
    icon: IoLocationOutline,
    label: "Office",
    value: "Bandra Kurla Complex",
    sub: "Mumbai, Maharashtra 400051",
  },
  {
    icon: IoTimeOutline,
    label: "Hours",
    value: "Mon – Sat, 9am – 7pm",
    sub: "Closed on public holidays",
  },
];

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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
