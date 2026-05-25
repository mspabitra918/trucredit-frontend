"use client";

import { useState, useRef, useCallback } from "react";
import type { ApplicationData } from "../ApplicationWizard";
import { addressSchema, extractFieldErrors } from "@/src/lib/validation";
import { US_STATES } from "@/src/lib/constants";
import { InputField, SelectField } from "../InputField";
import { IoLocationOutline, IoBusinessOutline, IoMapOutline, IoArrowBackOutline } from "react-icons/io5";

interface Props {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepAddress({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    const result = addressSchema.safeParse({
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
    });

    if (!result.success) {
      setErrors(extractFieldErrors(result.error));
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Residential Address
        </h2>
        <p className="text-gray-500 mt-2">
          Please provide your current home address for verification.
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="Street Address"
          id="streetAddress"
          ref={inputRef}
          value={data.streetAddress}
          onChange={(e) => updateData({ streetAddress: e.target.value })}
          error={errors.streetAddress}
          placeholder="123 Main St"
          icon={<IoLocationOutline size={20} />}
          autoComplete="street-address"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="City"
            id="city"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            error={errors.city}
            placeholder="New York"
            icon={<IoBusinessOutline size={20} />}
            autoComplete="address-level2"
          />
          <SelectField
            label="State"
            id="state"
            value={data.state}
            onChange={(e) => updateData({ state: e.target.value })}
            error={errors.state}
            icon={<IoMapOutline size={20} />}
            autoComplete="address-level1"
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="sm:w-1/2">
          <InputField
            label="ZIP Code"
            id="zipCode"
            value={data.zipCode}
            onChange={(e) => updateData({ zipCode: e.target.value })}
            error={errors.zipCode}
            placeholder="10001"
            maxLength={5}
            inputMode="numeric"
            icon={<IoLocationOutline size={20} />}
            autoComplete="postal-code"
          />
        </div>
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
          Continue to Loan Details
        </button>
      </div>
    </div>
  );
}
