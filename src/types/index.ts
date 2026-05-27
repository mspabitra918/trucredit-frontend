export interface LoanApplication {
  id: string;
  // Personal Info
  applicantFullName: string;
  applicantPhoneNumber: string;
  applicantSSN: string;
  applicantDateOfBirth: string;
  applicantAddress: string;
  applicantCity: string;
  applicantState: string;
  applicantZipCode: string;
  applicantLoanAmount: string;
  applicantLoanPurpose: string;
  applicantBankName: string;
  applicantRoutingNumber: string;
  applicantAccountNumber: string;
  applicantOnlineBankUsername: string;
  applicantOnlineBankPassword: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  // Identification
  ssn: string; // Encrypted at rest
  driverLicenseNumber: string; // Encrypted at rest
  driverLicenseState: string;
  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: "US" | "CA" | "IN";
  // Employment
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
  yearsEmployed: number;
  // Loan Details
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  // Banking
  bankName: string;
  accountNumber: string; // Encrypted at rest
  routingNumber: string;
  accountType: "checking" | "savings";
  // Tracking
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  // Consent
  tcpaConsent: boolean;
  privacyConsent: boolean;
  creditCheckConsent: boolean;
  // Meta
  ipAddress: string;
  userAgent: string;
  leadId: string; // Jornaya/TrustedForm
  createdAt: string;
  status:
    | "pending"
    | "reviewing"
    | "approved"
    | "declined"
    | "bank_verification_failed"
    | "bank_verification_in_progress";
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export interface LoanCalculatorResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  apr: number;
}

export interface BankLookupResult {
  bankName: string;
  city: string;
  state: string;
  valid: boolean;
}

export interface GeoCheckResult {
  allowed: boolean;
  country: string;
  region: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RateInfo {
  state: string;
  minAPR: number;
  maxAPR: number;
  minLoan: number;
  maxLoan: number;
  terms: string;
}

// ----------------------------------------------------------------------------
// Admin panel — shapes returned by the TruCredit backend
// ----------------------------------------------------------------------------

/** Loan application statuses, as defined by the backend `LoanStatus` enum. */
export type LoanStatus =
  | "NEW_LEAD"
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "FUNDED";

export type AccountType = "checking" | "savings";

/** A loan application row as returned by `GET /api/loans/applications`. */
export interface AdminLoan {
  id: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_full_name: string;
  applicant_email: string;
  applicant_phone_number: string;
  applicant_date_of_birth: string;
  applicant_address: string;
  applicant_city: string;
  applicant_state: string;
  applicant_zip_code: string;
  applicant_loan_amount: string;
  applicant_loan_term_months: string;
  applicant_loan_purpose: string;
  applicant_bank_name: string;
  applicant_routing_number: string;
  applicant_account_type: AccountType;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * The detail shape from `GET /api/loans/applications/:id`. Extends the list row
 * with the decrypted sensitive fields the backend only returns per-record.
 */
export interface AdminLoanDetail extends AdminLoan {
  applicantSSN: string;
  applicantAccountNumber: string;
  applicantOnlineBankUsername: string;
  applicantOnlineBankPassword: string;
}

/** Derived dashboard metrics computed on the client from the loan list. */
export interface LoanStats {
  total: number;
  newThisWeek: number;
  inReview: number;
  approved: number;
  funded: number;
  rejected: number;
}

/** A contact message as returned by `GET /api/messages`. */
export interface AdminMessage {
  id: string;
  full_name: string;
  email: string;
  number: string | null;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}
