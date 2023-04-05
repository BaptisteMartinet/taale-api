import type { Locale } from 'definitions/enums';

/*
  TODO this could be defined elsewhere as it is not linked to emails
  but cannot be in core or lib as it uses the Locale enum.
*/

export default function genTexts<T>(definitions: Map<Locale, T>, locale: Locale) {
  const texts = definitions.get(locale);
  if (texts === undefined)
    throw new Error(`Unsupported locale: ${locale}`);
  return texts;
}
