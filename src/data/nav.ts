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
 * Nexa is a fictional product with no application behind it: both account
 * actions open the demonstration sign-in / sign-up dialog, which validates
 * its input and says plainly that nothing is sent.
 */
export const accountLinks = {
  signUp: { label: "Commencer gratuitement", mode: "signup" },
  signIn: { label: "Connexion", mode: "signin" },
} as const;
