import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy — TruCredit",
  description: "Learn how TruCredit collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy"
        highlight="Policy"
        subtitle="Your privacy is important to us. Learn how we handle your data."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-600">
            Last updated: May 25, 2026
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">1. Introduction</h2>
          <p className="mt-4 text-gray-600">
            Welcome to TruCredit. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@trucredit.com.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
          <p className="mt-4 text-gray-600">
            We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
          <p className="mt-4 text-gray-600">
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">4. Will Your Information Be Shared With Anyone?</h2>
          <p className="mt-4 text-gray-600">
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">5. How Long Do We Keep Your Information?</h2>
          <p className="mt-4 text-gray-600">
            We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">6. How Do We Keep Your Information Safe?</h2>
          <p className="mt-4 text-gray-600">
            We aim to protect your personal information through a system of organizational and technical security measures.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">7. What Are Your Privacy Rights?</h2>
          <p className="mt-4 text-gray-600">
            In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">8. Updates To This Policy</h2>
          <p className="mt-4 text-gray-600">
            We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">9. How Can You Contact Us About This Policy?</h2>
          <p className="mt-4 text-gray-600">
            If you have questions or comments about this policy, you may email us at support@trucredit.com.
          </p>
        </div>
      </section>
    </>
  );
}
