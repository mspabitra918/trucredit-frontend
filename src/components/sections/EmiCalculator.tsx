"use client";

import { useMemo, useState } from "react";

// function formatINR(value: number) {
//   return new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(value);
// }
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

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
  const [term, setTerm] = useState(24);

  // 10% APR amortization
  const monthlyRate = 0.1 / 12;
  const factor = Math.pow(1 + monthlyRate, term);
  const monthlyPayment = (amount * (monthlyRate * factor)) / (factor - 1);
  const totalRepayment = monthlyPayment * term;
  const totalInterest = totalRepayment - amount;

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
            value={term}
            min={24}
            max={60}
            step={12}
            display={`${term} months`}
            onChange={setTerm}
          />
        </div>

        <div className="mt-9 flex flex-col items-center gap-4 rounded-2xl bg-[#F2FAF6] py-7">
          <div className="bg-surface rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center text-sm gap-26">
              <span className="text-text-secondary">Fixed 10% APR</span>
              <span className="font-semibold text-primary">
                {formatCurrency(totalInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Total Repayment</span>
              <span className="font-semibold text-primary">
                {formatCurrency(totalRepayment)}
              </span>
            </div>
            <div className="border-t border-surface-dark pt-4 text-center">
              <p className="text-sm text-text-secondary">
                Your Monthly Payment
              </p>
              <p className="text-4xl font-bold text-primary mt-1">
                {formatCurrency(monthlyPayment)}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                month for {term} months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
