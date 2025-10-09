import { HowItWorksStep } from "@/lib/i18n/translations";

interface HowItWorksProps {
  id?: string;
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
  footnote: string;
}

export const HowItWorks = ({ id, title, subtitle, steps, footnote }: HowItWorksProps) => {
  return (
    <section id={id} className="rounded-3xl border border-white bg-white p-10 shadow-[0_25px_50px_-38px_rgba(15,23,42,0.2)]">
      <div className="mb-10 max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
        <p className="text-base text-neutral-600 sm:text-lg">{subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.id} className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-neutral-300 hover:bg-white">
            <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[var(--accent-blue)]/10 text-sm font-semibold text-[var(--accent-blue)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-600">{footnote}</p>
    </section>
  );
};
