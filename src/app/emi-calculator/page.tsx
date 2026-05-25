import type { Metadata } from "next";
import PageHeader from "../../components/sections/PageHeader";
import EmiCalculator from "../../components/sections/EmiCalculator";

export const metadata: Metadata = {
  title: "EMI Calculator — TruCredit",
  description:
    "Estimate your monthly EMI instantly. Adjust loan amount, interest rate and tenure.",
};

export default function EmiCalculatorPage() {
  return (
    <div className="pb-24">
      <PageHeader
        title="EMI"
        highlight="Calculator"
        subtitle="Plan your repayments. Move the sliders to see your monthly EMI update instantly."
      />
      <EmiCalculator />
    </div>
  );
}
