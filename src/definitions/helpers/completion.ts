import { nbCompletionsToMarkComplete } from 'core/constants';
import { Story, Sentence, Completion } from 'definitions/models';

export async function checkCompletion(sentence: Sentence): Promise<boolean> {
  const completionCount = await Completion.count({
    where: { sentenceId: sentence.id },
  });
  if (completionCount < nbCompletionsToMarkComplete)
    return false;
  await sentence.update({ theEnd: true });
  await Story.create({
    sentenceId: sentence.id,
    treeId: sentence.treeId,
  });
  return true;
}