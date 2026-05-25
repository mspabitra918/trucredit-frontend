import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service — TruCredit",
  description: "Read our terms and conditions for using TruCredit services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        title="Terms of"
        highlight="Service"
        subtitle="Please read these terms carefully before using our services."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-600">
            Last updated: May 25, 2026
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
          <p className="mt-4 text-gray-600">
            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">2. Use License</h2>
          <p className="mt-4 text-gray-600">
            Permission is granted to temporarily download one copy of the materials on TruCredit&apos;s website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">3. Disclaimer</h2>
          <p className="mt-4 text-gray-600">
            The materials on TruCredit&apos;s website are provided on an &apos;as is&apos; basis. TruCredit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">4. Limitations</h2>
          <p className="mt-4 text-gray-600">
            In no event shall TruCredit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TruCredit&apos;s website.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">5. Accuracy of Materials</h2>
          <p className="mt-4 text-gray-600">
            The materials appearing on TruCredit&apos;s website could include technical, typographical, or photographic errors. TruCredit does not warrant that any of the materials on its website are accurate, complete or current.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">6. Links</h2>
          <p className="mt-4 text-gray-600">
            TruCredit has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TruCredit of the site.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">7. Modifications</h2>
          <p className="mt-4 text-gray-600">
            TruCredit may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900">8. Governing Law</h2>
          <p className="mt-4 text-gray-600">
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </section>
    </>
  );
}
