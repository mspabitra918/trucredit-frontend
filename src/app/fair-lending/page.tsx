import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Fair Lending Statement — TruCredit",
  description: "TruCredit is committed to fair and equitable lending practices.",
};

export default function FairLendingPage() {
  return (
    <>
      <PageHeader
        title="Fair Lending"
        highlight="Statement"
        subtitle="Our commitment to fair and equitable lending for all our customers."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-600">
            TruCredit is committed to providing fair and equal access to credit for all individuals. Our lending practices are designed to ensure that all applicants are treated fairly and consistently throughout the lending process.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Our Commitment</h2>
          <p className="mt-4 text-gray-600">
            We do not discriminate against any applicant on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract), or because all or part of the applicant&apos;s income derives from any public assistance program.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Equal Credit Opportunity Act (ECOA)</h2>
          <p className="mt-4 text-gray-600">
            The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant&apos;s income derives from any public assistance program; or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">Our Practices</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
            <li>We provide clear and transparent information about our loan products and terms.</li>
            <li>We use consistent underwriting criteria for all applicants.</li>
            <li>We offer assistance and support to applicants throughout the application process.</li>
            <li>We regularly review our lending practices to ensure they remain fair and equitable.</li>
          </ul>

          <p className="mt-8 text-gray-600">
            If you have any questions about our fair lending practices, please contact us at support@trucredit.com.
          </p>
        </div>
      </section>
    </>
  );
}
