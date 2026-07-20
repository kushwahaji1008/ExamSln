interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Overview</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
        </div>

        {subtitle ? (
          <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
