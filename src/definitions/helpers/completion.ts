import { nbCompletionsToMarkComplete } from 'core/constants';
import { Sentence, Completion } from 'definitions/models';
import { createStory } from './story';

export async function checkCompletion(sentence: Sentence): Promise<boolean> {
  const completionCount = await Completion.count({
    where: { sentenceId: sentence.id },
  });
  if (completionCount < nbCompletionsToMarkComplete)
    return false;
  await sentence.update({ theEnd: true });
  await createStory(sentence);
  return true;
}
