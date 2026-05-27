"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Rates & Fees", href: "/rates-and-fees" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  // { label: "Admin", href: "/admin" },
];

export default function NavbarPage() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="w-full border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#0B7A5A]/10 p-2 rounded-xl">
              <IoShieldCheckmark className="text-[#0B7A5A]" size={28} />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              <span className="text-[#0B7A5A]">Tru</span>
              <span className="text-gray-900">Credit</span>
            </h2>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-gray-600">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-[#0B7A5A] transition duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* <button className="px-5 py-2 rounded-md border border-[#0B7A5A] text-[#0B7A5A] font-semibold hover:bg-[#0B7A5A] hover:text-white transition-all duration-300">
            Login
          </button> */}

          <Link
            href={"/apply"}
            className="px-5 py-2 rounded-md bg-[#0B7A5A] text-white font-semibold shadow-md hover:bg-[#08664b] hover:shadow-lg transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpenMenu(true)} className="lg:hidden">
          <HiOutlineMenuAlt3 size={28} className="text-gray-700" />
        </button>

        {/* Backdrop */}
        <div
          onClick={() => setOpenMenu(false)}
          className={`fixed inset-0 w-screen h-screen z-[999] lg:hidden transition-all duration-500 ${
            openMenu
              ? "opacity-100 visible bg-black/40 "
              : "opacity-0 invisible"
          }`}
        >
          <div
            className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-[#0B7A5A] z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setOpenMenu(false)}
              className="lg:hidden absolute right-5 top-5"
            >
              <HiOutlineMenuAlt3 size={30} className="text-white" />
            </button>
            <div className="flex flex-col items-center justify-start mt-16 h-full">
              <ul className="flex flex-col items-center gap-8 text-white text-xl font-semibold">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenMenu(false)}
                      className="hover:text-yellow-300 transition duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex flex-col gap-4 mt-10 w-[80%]">
                {/* <button className="w-full py-3 rounded-xl bg-white text-[#0B7A5A] font-semibold">
                  Login
                </button> */}

                <button className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold">
                  <Link href="/apply">Apply Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
