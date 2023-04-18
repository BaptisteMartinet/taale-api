import { Locale } from 'definitions/enums';
import { genTexts } from 'notification/emails/utils';

interface Definition {
  subject: string;
  codeInfo: string;
}

const fr: Definition = {
  subject: "Demande de réinitialisation de mot de passe",
  codeInfo: "Utilisez le code suivant pour réinitialiser votre mot de passe",
};

const en: Definition = {
  subject: "Reset your password",
  codeInfo: "Use the following code to reset your password",
}

export default (locale: Locale) => genTexts<Definition>(new Map([
  [Locale.FR, fr],
  [Locale.EN, en],
]), locale);
