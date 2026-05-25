"use client";

import { useMemo, useState } from "react";

// function formatINR(value: number) {
//   return new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(value);
// }

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="rounded-lg bg-[#0B7A5A]/10 px-3 py-1 text-sm font-bold text-[#0B7A5A]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0B7A5A] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#0B7A5A]"
        style={{
          background: `linear-gradient(to right, #0B7A5A ${pct}%, #E5E7EB ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function EmiCalculator() {
  const [amount, setAmount] = useState(2000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(2);

  const emi = useMemo(() => {
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [amount, rate, years]);

  return (
    <section className="relative z-10 -mt-10 px-6 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/60 sm:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          EMI Calculator
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          <Slider
            label="Loan Amount"
            value={amount}
            min={2000}
            max={10000}
            step={500}
            display={`$${amount}`}
            onChange={setAmount}
          />
          <Slider
            label="Interest Rate"
            value={rate}
            min={10}
            max={10}
            step={0.1}
            display={`${rate.toFixed(1)}%`}
            onChange={setRate}
          />
          <Slider
            label="Loan Tenure"
            value={years}
            min={1}
            max={5}
            step={1}
            display={`${years} ${years === 1 ? "Year" : "Years"}`}
            onChange={setYears}
          />
        </div>

        <div className="mt-9 flex flex-col items-center gap-4 rounded-2xl bg-[#F2FAF6] py-7">
          <p className="text-sm font-medium text-gray-500">Your Monthly EMI</p>
          <p className="text-4xl font-extrabold text-[#0B7A5A]">
            ${emi.toFixed(2)}
          </p>
          <button className="rounded-xl bg-[#0B7A5A] px-8 py-3 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]">
            Calculate EMI
          </button>
        </div>
      </div>
    </section>
  );
}
