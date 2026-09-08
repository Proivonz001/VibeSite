export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Locales that are actually published. Add "it" here when the Italian content is ready. */
export const enabledLocales: readonly Locale[] = ["en"];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Build a public URL for a locale. The default locale has no prefix. */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
