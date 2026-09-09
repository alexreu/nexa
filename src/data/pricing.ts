export type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

/**
 * Nexa is fictional: no plan starts a payment. Every button points at the
 * closing call to action.
 */
export const plans: Plan[] = [
  {
    name: "Starter",
    price: "0 €",
    period: "pour toujours",
    description:
      "Pour automatiser vos premières tâches et voir ce que ça donne.",
    features: ["5 workflows", "500 actions par mois", "Intégrations standards"],
    cta: "Commencer gratuitement",
  },
  {
    name: "Pro",
    price: "29 €",
    period: "par mois",
    description: "Pour les équipes qui automatisent au quotidien.",
    features: [
      "Workflows illimités",
      "10 000 actions par mois",
      "Nexa AI",
      "Historique avancé",
    ],
    cta: "Essayer Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "Sur devis",
    description: "Pour les organisations avec des exigences de conformité.",
    features: [
      "Équipe illimitée",
      "SSO",
      "Support prioritaire",
      "SLA contractuel",
    ],
    cta: "Nous contacter",
  },
];

export const pricingCtaHref = "#commencer";
