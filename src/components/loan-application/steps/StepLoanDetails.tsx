"use client";

import { useState } from "react";
import type { ApplicationData } from "../ApplicationWizard";
import { LOAN_LIMITS, LOAN_PURPOSES } from "@/src/lib/constants";
import { formatCurrency } from "@/src/lib/utils";
import { SelectField } from "../InputField";
import { IoListOutline, IoArrowBackOutline, IoInformationCircleOutline } from "react-icons/io5";

function calcMonthlyPayment(amount: number, termMonths: number): number {
  const monthlyRate = 0.1 / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (amount * (monthlyRate * factor)) / (factor - 1);
}

interface Props {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepLoanDetails({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const fieldErrors: Record<string, string> = {};

    if (
      data.loanAmount < LOAN_LIMITS.minAmount ||
      data.loanAmount > LOAN_LIMITS.maxAmount
    ) {
      fieldErrors.loanAmount = `Loan amount must be between ${formatCurrency(LOAN_LIMITS.minAmount)} and ${formatCurrency(LOAN_LIMITS.maxAmount)}`;
    }
    if (!data.loanPurpose) {
      fieldErrors.loanPurpose = "Please select a loan purpose";
    }
    if (!data.loanTerm) {
      fieldErrors.loanTerm = "Please select a loan term";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Loan Details
        </h2>
        <p className="text-gray-500 mt-2">
          Tell us how much you need and what you plan to use it for.
        </p>
      </div>

      <div className="space-y-8">
        {/* Fixed APR Banner */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 flex items-start gap-3">
          <IoInformationCircleOutline className="text-primary shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-gray-700 font-medium leading-relaxed">
            Our fixed <span className="text-primary font-bold">10% APR</span> ensures your rate remains consistent regardless of your credit score.
          </p>
        </div>

        {/* Loan Amount Slider */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <label htmlFor="loanAmount" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Loan Amount
              </label>
              <p className="text-3xl font-black text-primary tracking-tight">
                {formatCurrency(data.loanAmount)}
              </p>
            </div>
          </div>
          <input
            type="range"
            id="loanAmount"
            min={LOAN_LIMITS.minAmount}
            max={LOAN_LIMITS.maxAmount}
            step={500}
            value={data.loanAmount}
            onChange={(e) => updateData({ loanAmount: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">
            <span>Min {formatCurrency(LOAN_LIMITS.minAmount)}</span>
            <span>Max {formatCurrency(LOAN_LIMITS.maxAmount)}</span>
          </div>
          {errors.loanAmount && (
            <p className="text-error text-xs font-semibold mt-2">{errors.loanAmount}</p>
          )}
        </div>

        <SelectField
          label="Loan Purpose"
          id="loanPurpose"
          value={data.loanPurpose}
          onChange={(e) => updateData({ loanPurpose: e.target.value })}
          error={errors.loanPurpose}
          icon={<IoListOutline size={20} />}
        >
          <option value="">Select purpose</option>
          {LOAN_PURPOSES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </SelectField>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Loan Term
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[24, 36, 48, 60].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => updateData({ loanTerm: term })}
                className={`py-4 rounded-xl text-sm font-bold border-2 transition-all ${
                  data.loanTerm === term
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {term} Months
              </button>
            ))}
          </div>
          {errors.loanTerm && (
            <p className="text-error text-xs font-semibold mt-2">{errors.loanTerm}</p>
          )}
        </div>

        {data.loanTerm > 0 && (
          <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-900/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
                Estimated Monthly Payment
              </p>
              <p className="text-xs opacity-90 leading-relaxed max-w-[200px]">
                Based on {formatCurrency(data.loanAmount)} at 10% APR over {data.loanTerm} months
              </p>
            </div>
            <p className="text-3xl font-black tracking-tighter">
              {formatCurrency(calcMonthlyPayment(data.loanAmount, data.loanTerm))}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 bg-gray-50 -mx-6 sm:-mx-10 px-6 sm:px-10 py-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors px-4 py-2"
        >
          <IoArrowBackOutline size={20} />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
        >
          Continue to Banking
        </button>
      </div>
    </div>
  );
}
