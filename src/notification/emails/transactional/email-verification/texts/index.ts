import { Locale } from 'definitions/enums';
import { genTexts } from 'notification/emails/utils';

interface Definition {
  subject: string;
  codeInfo: string;
}

const fr: Definition = {
  subject: "Verifiez votre email",
  codeInfo: "Utilisez le code suivant pour créer votre compte",
};

const en: Definition = {
  subject: "Verify your email",
  codeInfo: "Use the following code to verify your email",
}

export default (locale: Locale) => genTexts<Definition>(new Map([
  [Locale.FR, fr],
  [Locale.EN, en],
]), locale);
