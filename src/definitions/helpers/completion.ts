import { nbCompletionsToMarkComplete } from 'core/constants';
import { Story, StorySentenceLink, Sentence, Completion } from 'definitions/models';
import { ascendSentencesIds } from './sentence';

export async function checkCompletion(sentence: Sentence): Promise<boolean> {
  const completionCount = await Completion.count({
    where: { sentenceId: sentence.id },
  });
  if (completionCount < nbCompletionsToMarkComplete)
    return false;
  await sentence.update({ theEnd: true });
  const story = await Story.create({
    sentenceId: sentence.id,
    treeId: sentence.treeId,
  });
  const sentencesIds = await ascendSentencesIds(sentence.id);
  await StorySentenceLink.bulkCreate(sentencesIds.reverse().map(sentenceId => ({
    storyId: story.id,
    sentenceId,
  })));
  return true;
}
