import type { Locale } from 'definitions/enums';

export default function genTexts<T>(definitions: Map<Locale, T>, locale: Locale) {
  const texts = definitions.get(locale);
  if (texts === undefined)
    throw new Error(`Unsupported locale: ${locale}`);
  return texts;
}
