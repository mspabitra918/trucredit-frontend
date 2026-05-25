import {
  IoFlash,
  IoTrendingDown,
  IoDocumentTextOutline,
  IoLockClosed,
} from "react-icons/io5";

const features = [
  {
    icon: IoFlash,
    title: "Instant Approval",
    desc: "Get your loan approved in minutes with our fully digital process.",
  },
  {
    icon: IoTrendingDown,
    title: "Low Interest Rates",
    desc: "Enjoy competitive rates starting as low as 6% per annum.",
  },
  {
    icon: IoDocumentTextOutline,
    title: "Minimal Documentation",
    desc: "Just a few documents and you're ready to go. No paperwork hassle.",
  },
  {
    icon: IoLockClosed,
    title: "100% Secure",
    desc: "Bank-grade encryption keeps your data safe at every step.",
  },
];

export default function WhyChoose() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Why Choose <span className="text-[#0B7A5A]">TruCredit</span>?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
        We make borrowing effortless with features designed around you.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#0B7A5A]/20 hover:shadow-xl"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B7A5A]/10 transition group-hover:bg-[#0B7A5A]">
              <Icon
                className="text-[#0B7A5A] transition group-hover:text-white"
                size={26}
              />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
