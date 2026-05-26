// src/app/not-found.tsx

"use client";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        {/* <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 leading-none drop-shadow-sm">
          404
        </h1> */}

        {/* Title */}
        {/* <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
          Page Not Found
        </h2> */}

        {/* Description */}
        {/* <p className="mt-4 text-gray-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn&apos;t exist, has been
          moved, or is temporarily unavailable.
        </p> */}

        {/* Illustration */}
        <div className="relative mt-10 flex justify-center">
          <div className="w-72 h-72 rounded-full bg-blue-100 blur-3xl absolute opacity-40" />

          <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-5 rounded-2xl">
                <Search className="w-14 h-14 text-blue-700" />
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Oops! Nothing here
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try checking the URL or return to the homepage.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                <Home size={18} />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}
