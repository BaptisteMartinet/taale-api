import { nbCompletionsToMarkComplete } from 'core/constants';
import { Sentence, Completion } from 'definitions/models';

export async function checkCompletion(sentence: Sentence): Promise<boolean> {
  const completionCount = await Completion.count({
    where: { sentenceId: sentence.id },
  });
  return completionCount >= nbCompletionsToMarkComplete
}
