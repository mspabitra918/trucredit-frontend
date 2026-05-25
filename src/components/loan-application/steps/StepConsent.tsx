"use client";

import { useState } from "react";
import Link from "next/link";
import type { ApplicationData } from "../ApplicationWizard";
import { LOAN_PURPOSES, SITE_NAME } from "@/src/lib/constants";
import { formatCurrency, maskAccountNumber, maskSSN } from "@/src/lib/utils";
import { 
  IoArrowBackOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentTextOutline,
  IoPersonOutline,
  IoCashOutline,
  IoBusinessOutline
} from "react-icons/io5";

interface Props {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function StepConsent({
  data,
  updateData,
  onBack,
  onSubmit,
  isSubmitting,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const fieldErrors: Record<string, string> = {};
    if (!data.tcpaConsent) fieldErrors.tcpaConsent = "TCPA consent is required";
    if (!data.privacyConsent)
      fieldErrors.privacyConsent = "Privacy Policy agreement is required";
    if (!data.creditCheckConsent)
      fieldErrors.creditCheckConsent = "Credit check consent is required";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  const purposeLabel =
    LOAN_PURPOSES.find((p) => p.value === data.loanPurpose)?.label ||
    data.loanPurpose;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Review & Submit
        </h2>
        <p className="text-gray-500 mt-2">
          Almost there! Please review your application details and provide your consent.
        </p>
      </div>

      <div className="space-y-6 mb-10">
        {/* Personal Info Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 text-primary mb-4">
            <IoPersonOutline size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Personal Info</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryItem label="Full Name" value={`${data.firstName} ${data.lastName}`} />
            <SummaryItem label="SSN" value={maskSSN(data.ssn)} />
            <SummaryItem label="Email" value={data.email} />
            <SummaryItem label="Phone" value={data.phone} />
          </div>
        </div>

        {/* Loan & Banking Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-primary mb-4">
              <IoCashOutline size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Loan Details</span>
            </div>
            <div className="space-y-4">
              <SummaryItem label="Amount" value={formatCurrency(data.loanAmount)} />
              <SummaryItem label="Term" value={`${data.loanTerm} Months`} />
              <SummaryItem label="Purpose" value={purposeLabel} />
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-primary mb-4">
              <IoBusinessOutline size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Banking</span>
            </div>
            <div className="space-y-4">
              <SummaryItem label="Bank" value={data.bankName} />
              <SummaryItem label="Routing" value={data.routingNumber} />
              <SummaryItem label="Account" value={maskAccountNumber(data.accountNumber)} />
            </div>
          </div>
        </div>

        {/* Consent Section */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 space-y-5">
          <div className="flex items-center gap-2 text-primary mb-2">
            <IoShieldCheckmarkOutline size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Legal Consents</span>
          </div>

          <ConsentCheckbox
            id="creditCheck"
            checked={data.creditCheckConsent}
            onChange={(checked) => updateData({ creditCheckConsent: checked })}
            error={errors.creditCheckConsent}
          >
            I authorize {SITE_NAME} to obtain my credit report from consumer reporting agencies to verify my application.
          </ConsentCheckbox>

          <ConsentCheckbox
            id="privacyPolicy"
            checked={data.privacyConsent}
            onChange={(checked) => updateData({ privacyConsent: checked })}
            error={errors.privacyConsent}
          >
            I have read and agree to the <Link href="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-primary font-bold hover:underline">Terms of Service</Link>.
          </ConsentCheckbox>

          <ConsentCheckbox
            id="tcpa"
            checked={data.tcpaConsent}
            onChange={(checked) => updateData({ tcpaConsent: checked })}
            error={errors.tcpaConsent}
          >
            I consent to receive calls, texts, and emails from {SITE_NAME} regarding my application. I may opt out at any time.
          </ConsentCheckbox>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 bg-gray-50 -mx-6 sm:-mx-10 px-6 sm:px-10 py-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors px-4 py-2"
          disabled={isSubmitting}
        >
          <IoArrowBackOutline size={20} />
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            <>
              <IoDocumentTextOutline size={20} />
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900 break-all">{value}</p>
    </div>
  );
}

function ConsentCheckbox({ 
  id, 
  checked, 
  onChange, 
  error, 
  children 
}: { 
  id: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
            checked 
              ? "bg-primary border-primary" 
              : error 
                ? "border-error bg-error/5" 
                : "border-gray-300 bg-white group-hover:border-primary"
          }`}>
            {checked && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className={`text-sm leading-snug transition-colors ${
          checked ? "text-gray-900 font-medium" : "text-gray-500"
        }`}>
          {children}
        </span>
      </label>
      {error && <p className="text-error text-[10px] font-bold mt-1.5 ml-8 uppercase tracking-wider">{error}</p>}
    </div>
  );
}
