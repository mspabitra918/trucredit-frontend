"use client";

import Link from "next/link";
import { IoShieldCheckmark } from "react-icons/io5";

const columns = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Loan Calculator", href: "/emi-calculator" },
      { name: "Rates & Fees", href: "/rates-and-fees" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        name: "Terms of Service",
        href: "/terms-of-service",
      },
      {
        name: "Fair Lending Statement",
        href: "/fair-lending",
      },
      {
        name: "Direct Lender Disclosure",
        href: "/direct-lender-disclosure",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        name: "support@trucredit.com",
        href: "mailto:support@trucredit.com",
      },
      {
        name: "(747) 206-1606",
        href: "tel:+17472061606",
      },
      {
        name: "Mon–Fri: 8 AM – 5 PM PST",
        href: "#",
      },
      {
        name: "Los Angeles, California",
        href: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
        {/* Logo */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-xl bg-[#0B7A5A]/20 p-2">
              <IoShieldCheckmark className="text-[#0B7A5A]" size={24} />
            </div>

            <h2 className="text-xl font-bold">
              <span className="text-[#0B7A5A]">Tru</span>
              <span className="text-white">Credit</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed">
            Fast, transparent and secure loans — built to make borrowing simple
            for everyone.
          </p>
        </div>

        {/* Footer Columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {col.title}
            </h3>

            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-[#0B7A5A]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-center text-sm lg:px-10">
          © {new Date().getFullYear()} TruCredit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
