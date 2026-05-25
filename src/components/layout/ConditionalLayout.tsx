"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
const Header = dynamic(() => import("./Navber"), { ssr: true });
// const Footer = dynamic(() => import("./Footer"), { ssr: true });

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
