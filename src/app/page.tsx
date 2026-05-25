import Hero from "../components/sections/Hero";
import EmiCalculator from "../components/sections/EmiCalculator";
import WhyChoose from "../components/sections/WhyChoose";
import HowItWorks from "../components/sections/HowItWorks";
import Eligibility from "../components/sections/Eligibility";
import Testimonials from "../components/sections/Testimonials";
import Faq from "../components/sections/Faq";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <EmiCalculator />
      <WhyChoose />
      <HowItWorks />
      <Eligibility />
      <Testimonials />
      <Faq />
      {/* <Footer /> */}
    </>
  );
}
