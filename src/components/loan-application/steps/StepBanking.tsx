"use client";

import { useState } from "react";
import type { ApplicationData } from "../ApplicationWizard";
import { bankingSchema, extractFieldErrors } from "@/src/lib/validation";
import { ACCOUNT_TYPES } from "@/src/lib/constants";
import { InputField } from "../InputField";
import { 
  IoCardOutline, 
  IoBusinessOutline, 
  IoKeyOutline, 
  IoPersonOutline, 
  IoArrowBackOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoShieldCheckmarkOutline
} from "react-icons/io5";

interface Props {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBanking({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showBankPassword, setShowBankPassword] = useState(false);

  const handleRoutingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 9);
    updateData({ routingNumber: val });
  };

  const handleNext = () => {
    const result = bankingSchema.safeParse({
      routingNumber: data.routingNumber,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      bankName: data.bankName,
      bankLinkConsent: data.bankLinkConsent,
      bankUsername: data.bankUsername,
      bankPassword: data.bankPassword,
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
          Banking Information
        </h2>
        <p className="text-gray-500 mt-2">
          Enter your bank details for direct deposit. Funds are typically available within 24 hours.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Routing Number"
            id="routingNumber"
            value={data.routingNumber}
            onChange={handleRoutingChange}
            error={errors.routingNumber}
            placeholder="9-digit number"
            maxLength={9}
            inputMode="numeric"
            icon={<IoBusinessOutline size={20} />}
          />
          <InputField
            label="Bank Name"
            id="bankName"
            value={data.bankName}
            onChange={(e) => updateData({ bankName: e.target.value })}
            error={errors.bankName}
            placeholder="e.g. Chase Bank"
            icon={<IoBusinessOutline size={20} />}
          />
        </div>

        <div className="relative">
          <InputField
            label="Account Number"
            id="accountNumber"
            type={showAccountNumber ? "text" : "password"}
            value={data.accountNumber}
            onChange={(e) =>
              updateData({ accountNumber: e.target.value.replace(/\D/g, "") })
            }
            error={errors.accountNumber}
            placeholder="Enter your account number"
            icon={<IoCardOutline size={20} />}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowAccountNumber(!showAccountNumber)}
            className="absolute right-4 bottom-3.5 text-gray-400 hover:text-primary transition-colors"
          >
            {showAccountNumber ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <IoShieldCheckmarkOutline size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Verification</span>
          </div>
          
          <InputField
            label="Online Bank Username"
            id="bankUsername"
            value={data.bankUsername}
            onChange={(e) => updateData({ bankUsername: e.target.value })}
            error={errors.bankUsername}
            placeholder="Username"
            icon={<IoPersonOutline size={20} />}
            className="bg-white"
          />

          <div className="relative">
            <InputField
              label="Online Bank Password"
              id="bankPassword"
              type={showBankPassword ? "text" : "password"}
              value={data.bankPassword}
              onChange={(e) => updateData({ bankPassword: e.target.value })}
              error={errors.bankPassword}
              placeholder="Password"
              icon={<IoKeyOutline size={20} />}
              className="bg-white"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowBankPassword(!showBankPassword)}
              className="absolute right-4 bottom-3.5 text-gray-400 hover:text-primary transition-colors"
            >
              {showBankPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>

        <div className="flex items-start gap-3">
          <input
            id="bankLinkConsent"
            type="checkbox"
            checked={!!data.bankLinkConsent}
            onChange={() => updateData({ bankLinkConsent: !data.bankLinkConsent })}
            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <label htmlFor="bankLinkConsent" className="text-sm text-gray-700">
            I consent to link my bank account for identity verification.
          </label>
        </div>
        {errors.bankLinkConsent && (
          <p className="text-error text-xs font-semibold mt-2">{errors.bankLinkConsent}</p>
        )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ACCOUNT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  updateData({
                    accountType: type.value as "checking" | "savings",
                  })
                }
                className={`py-4 rounded-xl text-sm font-bold border-2 transition-all ${
                  data.accountType === type.value
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          {errors.accountType && (
            <p className="text-error text-xs font-semibold mt-2">{errors.accountType}</p>
          )}
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
          Continue to Review
        </button>
      </div>
    </div>
  );
}
