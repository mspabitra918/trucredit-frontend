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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
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
    });

    if (res.ok) {
      alert("Message sent successfully!");
      setName("");
      setMobile("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
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
              onChange={(e) => setMobile(e.target.value)}
              className={inputClass}
              placeholder="+91 98765 43210"
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
          Send Message
        </button>
      </form>
    </div>
  );
}
