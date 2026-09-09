export type FooterLink = {
  label: string;
  /** Undefined when the demo has no matching destination. */
  href?: string;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "#fonctionnalites" },
      { label: "Intégrations", href: "#integrations" },
      { label: "Tarifs", href: "#tarifs" },
    ],
  },
  {
    title: "Entreprise",
    links: [{ label: "À propos" }, { label: "Blog" }, { label: "Carrières" }],
  },
  {
    title: "Ressources",
    links: [{ label: "Documentation" }, { label: "API" }, { label: "Status" }],
  },
  {
    title: "Légal",
    links: [{ label: "Confidentialité" }, { label: "Conditions" }],
  },
];
