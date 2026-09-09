export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Intégrations", href: "#integrations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Nexa is a fictional product with no application behind it, so every
 * account-related action points at the pricing section rather than a dead
 * `href="#"`. Documented in the README.
 */
export const accountLinks = {
  signUp: { label: "Commencer gratuitement", href: "#tarifs" },
  signIn: { label: "Connexion", href: "#tarifs" },
} as const;
