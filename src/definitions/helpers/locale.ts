import { DefaultLocale } from 'core/constants';
import { Locale } from 'definitions/enums';

// Note returns EN as default locale
export function strToLocale(str: string | undefined): Locale {
  if (!str)
    return DefaultLocale;
  for (const value of Object.values(Locale)) {
    if (value === str)
      return value;
  }
  return DefaultLocale;
}
