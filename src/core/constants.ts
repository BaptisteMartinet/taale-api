import { Minute } from 'core/utils/time';
import { Locale } from 'definitions/enums';

export const DefaultLocale = Locale.EN;

export const UsernameMinLength = 2;
export const UsernameMaxLength = 20;
export const PasswordMinLength = 4;

export const NbReportsToDeleteSentence = 3;
export const NbCompletionsToMarkComplete = 3;

export const SentenceCreationAntiSpamTimeFrameMs = 5 * Minute;
export const SentenceCreationAntiSpamRecordsLimit = 3;

export const ReportAntiSpamTimeFrameMs = 5 * Minute;
export const ReportAntiSpamRecordsLimit = 3;

export const CompletionAntiSpamTimeFrameMs = 5 * Minute;
export const CompletionAntiSpamRecordsLimit = 3;

export const PartialStoryNbSentences = 10;