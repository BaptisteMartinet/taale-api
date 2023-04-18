import { Locale } from 'definitions/enums';
import { genTexts } from 'notification/emails/utils';

interface Definition {
  subject: (username: string) => string;
  body: string;
}

const fr: Definition = {
  subject: (username) => `Bienvenue sur Taale ${username}`,
  body: "Vous faites officiellement parti de la communauté, amusez vous bien !",
};

const en: Definition = {
  subject: (username) => `Welcome to Taale ${username}`,
  body: "You are now part of our growing community, have fun!",
}

export default (locale: Locale) => genTexts<Definition>(new Map([
  [Locale.FR, fr],
  [Locale.EN, en],
]), locale);
