import { Locale } from 'definitions/enums';

const LocaleToText = new Map<Locale, string>([
  [Locale.FR, 'Il était une fois,'],
  [Locale.EN, 'Once upon a time,'],
  [Locale.ES, 'Érase una vez,'],
  [Locale.DE, 'Es war einmal,'],
  [Locale.PT, 'Era uma vez,'],
  [Locale.IT, "C'era una volta,"],
]);

export function genInitialSentenceText(locale: Locale): string {
  const text = LocaleToText.get(locale);
  if (!text)
    throw new Error(`Locale (${locale}) not supported`);
  return text;
}
