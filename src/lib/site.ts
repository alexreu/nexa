/**
 * Single source of truth for site-wide identity and SEO values.
 * `url` drives canonical, sitemap, robots and OpenGraph — set
 * NEXT_PUBLIC_SITE_URL in the deployment environment.
 */
export const siteConfig = {
  name: "Nexa",
  title: "Nexa — Automatisez votre travail avec l'IA",
  description:
    "Connectez vos outils et automatisez vos tâches répétitives avec Nexa.",
  tagline: "Automatisez votre travail. Concentrez-vous sur l'essentiel.",
  locale: "fr_FR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexa.vercel.app",
} as const;
