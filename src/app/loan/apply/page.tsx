import Footer from "@/src/components/layout/Footer";
import NavbarPage from "@/src/components/layout/Navber";
import ApplicationWizard from "@/src/components/loan-application/ApplicationWizard";
import PageHeader from "@/src/components/sections/PageHeader";
import type { Metadata } from "next";
// import ApplicationWizard from "@/components/forms/ApplicationWizard";

export const metadata: Metadata = {
  title: "Apply for a Personal Loan",
  description:
    "Apply for a personal loan from TruCredit in minutes. Competitive rates, fast approval, and direct funding. Check your rate with no credit impact.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <main className="">
        <PageHeader
          title="Apply for a Personal Loan"
          highlight="in Minutes"
          subtitle="Competitive rates, fast approval, and direct funding. Check your rate with no credit impact."
        />

        <section className="py-8 sm:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ApplicationWizard />
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
