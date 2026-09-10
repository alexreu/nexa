const FALLBACK_URL = "http://localhost:3000";

/**
 * Resolves the public origin used by canonical URLs, the sitemap, robots.txt
 * and the social cards.
 *
 * It has to survive three real situations: the variable being unset locally,
 * being set but empty on the host (which `??` would happily pass through to
 * `new URL()`), and being entered without a scheme. Vercel's own deployment
 * variables are used as a fallback so the site is correct with no
 * configuration at all.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
      // Normalises the value and drops any path, so "example.com/" and
      // "https://example.com" produce the same origin.
      return new URL(withScheme).origin;
    } catch {
      // Ignore an unusable value and try the next source rather than
      // failing the build.
      continue;
    }
  }

  return FALLBACK_URL;
}

export const siteConfig = {
  name: "Nexa",
  title: "Nexa — Automatisez votre travail avec l'IA",
  description:
    "Connectez vos outils et automatisez vos tâches répétitives avec Nexa.",
  tagline: "Automatisez votre travail. Concentrez-vous sur l'essentiel.",
  locale: "fr_FR",
  url: resolveSiteUrl(),
} as const;
