"use client";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0B7A5A] focus:bg-white focus:ring-2 focus:ring-[#0B7A5A]/20";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: name,
            email,
            number: mobile,
            subject,
            message,
          }),
        },
      );
      setIsSubmitted(true);

      if (res.ok) {
        setName("");
        setMobile("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("An unexpected error occurred. Please try again later.");
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  // return (
  //   <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
  //     <h2 className="mb-1 text-xl font-bold text-gray-900">
  //       Send us a message
  //     </h2>
  //     <p className="mb-6 text-sm text-gray-500">
  //       Fill in the form and we&apos;ll get back to you shortly.
  //     </p>

  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div className="grid gap-4 sm:grid-cols-2">
  //         <div>
  //           <label className="mb-1.5 block text-sm font-medium text-gray-600">
  //             Full Name
  //           </label>
  //           <input
  //             className={inputClass}
  //             placeholder="John Doe"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //           />
  //         </div>
  //         <div>
  //           <label className="mb-1.5 block text-sm font-medium text-gray-600">
  //             Mobile Number
  //           </label>
  //           <input
  //             value={mobile}
  //             onChange={(e) => setMobile(e.target.value)}
  //             className={inputClass}
  //             placeholder="+91 98765 43210"
  //             inputMode="tel"
  //           />
  //         </div>
  //       </div>
  //       <div>
  //         <label className="mb-1.5 block text-sm font-medium text-gray-600">
  //           Email
  //         </label>
  //         <input
  //           className={inputClass}
  //           placeholder="you@example.com"
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         <label className="mb-1.5 block text-sm font-medium text-gray-600">
  //           Subject
  //         </label>
  //         <select
  //           className={inputClass}
  //           value={subject}
  //           onChange={(e) => setSubject(e.target.value)}
  //         >
  //           <option value="" disabled>
  //             Select a topic
  //           </option>
  //           <option>Loan application</option>
  //           <option>Existing loan</option>
  //           <option>Rates &amp; fees</option>
  //           <option>Other</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label className="mb-1.5 block text-sm font-medium text-gray-600">
  //           Message
  //         </label>
  //         <textarea
  //           className={`${inputClass} min-h-28 resize-y`}
  //           placeholder="How can we help?"
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full rounded-xl bg-[#0B7A5A] py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]"
  //       >
  //         {isSubmitting ? "Sending..." : "Send Message"}
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
      {!isSubmitted ? (
        <>
          <h2 className="mb-1 text-xl font-bold text-gray-900">
            Send us a message
          </h2>

          <p className="mb-6 text-sm text-gray-500">
            Fill in the form and we&apos;ll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Full Name
                </label>

                <input
                  className={inputClass}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Mobile Number
                </label>

                <input
                  value={mobile}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    let formatted = digits;
                    if (digits.length > 6) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(
                        3,
                        6,
                      )}-${digits.slice(6)}`;
                    } else if (digits.length > 3) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                    } else if (digits.length > 0) {
                      formatted = `(${digits}`;
                    }
                    setMobile(formatted);
                  }}
                  className={inputClass}
                  placeholder="(555) 123-4567"
                  inputMode="tel"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Email
              </label>

              <input
                className={inputClass}
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Subject
              </label>

              <select
                className={inputClass}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled>
                  Select a topic
                </option>

                <option>Loan application</option>
                <option>Existing loan</option>
                <option>Rates &amp; fees</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Message
              </label>

              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0B7A5A] py-3.5 font-semibold text-white shadow-lg shadow-[#0B7A5A]/20 transition hover:bg-[#08664b]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            Message Sent Successfully!
          </h3>

          <p className="mt-2 max-w-md text-gray-500">
            Thank you for contacting us. Our support team will get back to you
            shortly.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 rounded-xl bg-[#0B7A5A] px-6 py-3 font-medium text-white transition hover:bg-[#08664b]"
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
}
