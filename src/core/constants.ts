import type { EmailData } from '@sendgrid/helpers/classes/email-address';

import { Minute } from 'lib/utils';
import { Locale } from 'definitions/enums';

export const TaaleEmailSender: EmailData = {
  name: 'Taale',
  email: 'taale.app@gmail.com',
};

export const DefaultLocale = Locale.EN;

export const EmailVerificationCodeLength = 6;
export const EmailValidationRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
export const UsernameMinLength = 2;
export const UsernameMaxLength = 24;
export const UsernameValidationRegex = new RegExp(`^\\w{${UsernameMinLength},${UsernameMaxLength}}$`);
export const PasswordMinLength = 4;

export const ResetPasswordCodeLength = 8;

export const SentenceTextMinLength = 3;
export const SentenceTextMaxLength = 180;

export const NbReportsToDeleteSentence = 5;
export const NbCompletionsToMarkComplete = 5;

export const SentenceCreationAntiSpamTimeFrameMs = 15 * Minute;
export const SentenceCreationAntiSpamRecordsLimit = 10;

export const ReportAntiSpamTimeFrameMs = 15 * Minute;
export const ReportAntiSpamRecordsLimit = 20;

export const CompletionAntiSpamTimeFrameMs = 15 * Minute;
export const CompletionAntiSpamRecordsLimit = 3;

export const PartialStoryNbSentences = 8;
