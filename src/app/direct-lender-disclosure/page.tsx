import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Direct Lender Disclosure — TruCredit",
  description: "Important disclosures regarding our status as a direct lender.",
};

export default function DirectLenderDisclosurePage() {
  return (
    <>
      <PageHeader
        title="Direct Lender"
        highlight="Disclosure"
        subtitle="Important information about our lending operations and status."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-600">
            TruCredit operates as a direct lender. This disclosure provides important information regarding our lending practices, fees, and responsibilities.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Direct Lending Status</h2>
          <p className="mt-4 text-gray-600">
            As a direct lender, TruCredit originates, funds, and services the loans offered through our platform. We are not a broker or a third-party lead generator. When you borrow from TruCredit, you are borrowing directly from us.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Loan Terms and Fees</h2>
          <p className="mt-4 text-gray-600">
            All loan terms, including interest rates, fees, and repayment schedules, are determined by TruCredit based on our underwriting criteria. We provide full disclosure of all costs associated with your loan prior to any commitment.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Responsible Lending</h2>
          <p className="mt-4 text-gray-600">
            We are committed to responsible lending practices. We evaluate every application carefully to ensure that we are providing loans that our customers can afford to repay.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">State Licensing</h2>
          <p className="mt-4 text-gray-600">
            TruCredit is licensed to operate as a lender in the states where we offer our products. We comply with all state and federal regulations governing direct lending.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Contact Information</h2>
          <p className="mt-4 text-gray-600">
            If you have any questions regarding this disclosure or our lending operations, please contact us:
          </p>
          <ul className="mt-2 list-none space-y-1 text-gray-600">
            <li><strong>Email:</strong> support@trucredit.com</li>
            <li><strong>Phone:</strong> (747) 206-1606</li>
            <li><strong>Address:</strong> Los Angeles, California</li>
          </ul>
        </div>
      </section>
    </>
  );
}
