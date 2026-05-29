"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const faqs = [
  {
    q: "What is the minimum income required?",
    a: "You need a minimum monthly income of $1,500 to be eligible for a personal loan with TruCredit.",
  },
  {
    q: "How quickly will I get the funds?",
    a: "Once approved, funds are deposited to your U.S. bank account via ACH, typically by the next business day.",
  },
  {
    q: "Is there any prepayment penalty?",
    a: "No. You can pay off your loan early at any time with zero additional charges or fees.",
  },
  {
    q: "What documents do I need?",
    a: "Just your Social Security number, a government-issued photo ID, and recent bank statements or pay stubs. The entire process is fully digital.",
  },
  {
    q: "Will checking eligibility affect my credit score?",
    a: "No. Checking your rate uses a soft credit inquiry and has no impact on your credit score.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <IoChevronDown
                    className={`shrink-0 text-[#0B7A5A] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <p className="select-none bg-gradient-to-br from-[#0B7A5A] to-amber-300 bg-clip-text text-[10rem] font-black leading-none text-transparent">
            FAQ
          </p>
        </div>
      </div>
    </section>
  );
}
