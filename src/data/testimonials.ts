export type Testimonial = {
  quote: string;
  /** First name only — these people are invented. */
  firstName: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nexa nous a permis d'éliminer plusieurs heures de traitement manuel chaque semaine.",
    firstName: "Camille",
    role: "Responsable des opérations",
    company: "Meridian",
  },
  {
    quote:
      "On a connecté notre CRM et nos outils internes en une après-midi. Ce qui nous prenait un sprint entier.",
    firstName: "Yanis",
    role: "Directeur technique",
    company: "Vertex",
  },
  {
    quote:
      "L'historique complet a réglé notre vrai problème : savoir ce qui s'est passé, et quand.",
    firstName: "Léa",
    role: "Cheffe de produit",
    company: "Orbit",
  },
];
