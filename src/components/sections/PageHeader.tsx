export default function PageHeader({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-white">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0B7A5A]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {title} {highlight && <span className="text-[#0B7A5A]">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
