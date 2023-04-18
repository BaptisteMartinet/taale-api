import { Locale } from 'definitions/enums';
import { genTexts } from 'notification/emails/utils';

interface Definition {
  subject: string;
  body: string;
}

const fr: Definition = {
  subject: "Modification du mot de passe",
  body: "Votre mot de passe a été modifié avec succès",
};

const en: Definition = {
  subject: "Password modification",
  body: "Your password has been successfully updated",
}

export default (locale: Locale) => genTexts<Definition>(new Map([
  [Locale.FR, fr],
  [Locale.EN, en],
]), locale);
