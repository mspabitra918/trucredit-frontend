import React from "react";

type Loan = {
  id: number | string;
  fullName?: string;
  email?: string;
  amount?: number;
  status?: string;
  createdAt?: string;
};

export default function LoanApplicationList({ items }: { items: Loan[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Amount</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={String(l.id)} className="border-t">
              <td className="px-2 py-2">{l.id}</td>
              <td className="px-2 py-2">{l.fullName}</td>
              <td className="px-2 py-2">{l.email}</td>
              <td className="px-2 py-2">{l.amount}</td>
              <td className="px-2 py-2">{l.status}</td>
              <td className="px-2 py-2">{l.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
