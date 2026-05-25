import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";
import Faq from "../../components/sections/Faq";

export const metadata: Metadata = {
  title: "FAQ — TruCredit",
  description: "Answers to the most common questions about TruCredit loans.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Everything you need to know about borrowing with TruCredit."
      />
      <Faq />
    </>
  );
}
