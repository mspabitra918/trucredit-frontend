import React from "react";

type Message = {
  id: number | string;
  name?: string;
  email?: string;
  content?: string;
  createdAt?: string;
};

export default function MessageList({ items }: { items: Message[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Message</th>
            <th className="px-2 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((m) => (
            <tr key={String(m.id)} className="border-t">
              <td className="px-2 py-2">{m.id}</td>
              <td className="px-2 py-2">{m.name}</td>
              <td className="px-2 py-2">{m.email}</td>
              <td className="px-2 py-2">{m.content}</td>
              <td className="px-2 py-2">{m.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
