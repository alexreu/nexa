export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Qu'est-ce qu'un workflow ?",
    answer:
      "Une suite d'actions déclenchée automatiquement par un événement : un formulaire reçu, un message, une date. Nexa exécute chaque étape à votre place, dans l'ordre que vous avez défini.",
  },
  {
    question: "Dois-je savoir programmer ?",
    answer:
      "Non. Vous décrivez votre objectif en une phrase et Nexa construit le workflow. Les profils plus techniques peuvent ensuite affiner chaque étape manuellement.",
  },
  {
    question: "Puis-je connecter mes propres API ?",
    answer:
      "Oui. Les blocs Webhook et API appellent n'importe quel service exposant une interface HTTP, avec vos en-têtes et vos formats de données.",
  },
  {
    question: "Comment Nexa protège mes données ?",
    answer:
      "Les données sont chiffrées en transit et au repos, et isolées par espace de travail. Vous choisissez la région d'hébergement et pouvez purger l'historique à tout moment.",
  },
  {
    question: "Puis-je essayer Nexa gratuitement ?",
    answer:
      "Oui. L'offre Starter est gratuite sans limite de durée : 5 workflows et 500 actions par mois, sans moyen de paiement.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer:
      "À tout moment depuis vos réglages. L'abonnement reste actif jusqu'à la fin de la période déjà réglée, sans frais d'annulation.",
  },
];
