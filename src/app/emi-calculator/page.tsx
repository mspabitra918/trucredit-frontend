import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";
import EmiCalculator from "../../components/sections/EmiCalculator";

export const metadata: Metadata = {
  title: "Loan Calculator — TruCredit",
  description:
    "Estimate your monthly loan payment instantly. Adjust loan amount, APR, and term.",
};

export default function EmiCalculatorPage() {
  return (
    <div className="pb-24">
      <PageHeader
        title="Loan"
        highlight="Calculator"
        subtitle="Plan your payments. Move the sliders to see your monthly payment update instantly."
      />
      <EmiCalculator />
    </div>
  );
}
