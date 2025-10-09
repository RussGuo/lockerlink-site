import type { ReactElement } from "react";
import { FeatureCard as FeatureCardType } from "@/lib/i18n/translations";
import { FiLock, FiMap, FiUsers } from "react-icons/fi";

const ICONS: Record<FeatureCardType["icon"], ReactElement> = {
  lock: <FiLock className="size-6" />,
  route: <FiMap className="size-6" />,
  hotel: <FiUsers className="size-6" />,
};

interface FeatureSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  cards: FeatureCardType[];
}

export const FeatureSection = ({ id, title, subtitle, cards }: FeatureSectionProps) => {
  return (
    <section id={id} className="rounded-3xl border border-white bg-white/80 p-10 shadow-[0_25px_50px_-35px_rgba(15,23,42,0.2)]">
      <div className="mb-12 max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
        <p className="text-base text-neutral-600 sm:text-lg">{subtitle}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            className="group flex h-full flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
          >
            <div className="space-y-4">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-blue)]/15 to-[var(--accent-orange)]/15 text-[var(--accent-blue)] transition group-hover:scale-110">
                {ICONS[card.icon]}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900">{card.title}</h3>
              <p className="text-sm text-neutral-600">{card.description}</p>
            </div>
            <div className="pt-6 text-sm font-semibold text-[var(--accent-blue)] group-hover:underline">{card.linkLabel}</div>
          </article>
        ))}
      </div>
    </section>
  );
};
