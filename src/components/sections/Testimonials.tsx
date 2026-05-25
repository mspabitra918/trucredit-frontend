import { IoStar } from "react-icons/io5";

const reviews = [
  {
    name: "Rohit Sharma",
    role: "Salaried, Mumbai",
    text: "The whole process was smooth and quick. I got my loan approved within minutes — completely paperless!",
    initials: "RS",
  },
  {
    name: "Priya Verma",
    role: "Self-employed, Delhi",
    text: "Transparent rates and no hidden charges. TruCredit made financing my business expansion stress-free.",
    initials: "PV",
  },
  {
    name: "Arjun Nair",
    role: "Business owner, Kochi",
    text: "Excellent support and the EMI calculator helped me plan perfectly. Highly recommend their service.",
    initials: "AN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F2FAF6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          What our customers say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
          Trusted by thousands of happy borrowers across India.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStar key={i} size={18} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B7A5A]/10 text-sm font-bold text-[#0B7A5A]">
                  {r.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
