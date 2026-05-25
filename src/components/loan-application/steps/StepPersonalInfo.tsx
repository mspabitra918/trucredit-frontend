"use client";

import { useState } from "react";
import type { ApplicationData } from "../ApplicationWizard";
import { extractFieldErrors, personalInfoSchema } from "@/src/lib/validation";
import { InputField } from "../InputField";
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoCalendarOutline, IoLockClosedOutline } from "react-icons/io5";

interface Props {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
}

export default function StepPersonalInfo({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const result = personalInfoSchema.safeParse({
      firstName: data.firstName,
      lastName: data.lastName,
      ssn: data.ssn,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
    });

    if (!result.success) {
      setErrors(extractFieldErrors(result.error));
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Secure Application
        </h2>
        <p className="text-gray-500 mt-2">
          Start your journey with a soft credit pull—<span className="text-primary font-semibold">no impact on your score.</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            error={errors.firstName}
            placeholder="John"
            icon={<IoPersonOutline size={20} />}
          />
          <InputField
            label="Last Name"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            error={errors.lastName}
            placeholder="Doe"
            icon={<IoPersonOutline size={20} />}
          />
        </div>

        <InputField
          label="Email Address"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          error={errors.email}
          placeholder="john.doe@example.com"
          icon={<IoMailOutline size={20} />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Phone Number"
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              let formatted = digits;
              if (digits.length > 6) {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
              } else if (digits.length > 3) {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
              } else if (digits.length > 0) {
                formatted = `(${digits}`;
              }
              updateData({ phone: formatted });
            }}
            error={errors.phone}
            placeholder="(444) 444-4444"
            icon={<IoCallOutline size={20} />}
          />
          <InputField
            label="Date of Birth"
            id="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
              let formatted = digits;
              if (digits.length > 4) {
                formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
              } else if (digits.length > 2) {
                formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
              }
              updateData({ dateOfBirth: formatted });
            }}
            error={errors.dateOfBirth}
            placeholder="MM/DD/YYYY"
            maxLength={10}
            icon={<IoCalendarOutline size={20} />}
          />
        </div>

        <div className="relative">
          <InputField
            label="Social Security Number"
            id="ssn"
            value={data.ssn}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
              let formatted = digits;
              if (digits.length > 5) {
                formatted = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
              } else if (digits.length > 3) {
                formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
              }
              updateData({ ssn: formatted });
            }}
            error={errors.ssn}
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            autoComplete="off"
            inputMode="numeric"
            icon={<IoLockClosedOutline size={20} />}
          />
          <div className="flex items-center gap-1.5 mt-2 ml-1 text-emerald-600">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">AES-256 Encrypted</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 bg-gray-50 -mx-6 sm:-mx-10 px-6 sm:px-10 py-6 border-t border-gray-100">
        <div className="hidden sm:flex items-center gap-2 text-gray-400">
          <IoLockClosedOutline size={16} />
          <span className="text-xs font-medium">Bank-level security</span>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
        >
          Continue to Address
        </button>
      </div>
    </div>
  );
}
