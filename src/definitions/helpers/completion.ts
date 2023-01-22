import { nbCompletionsToMarkComplete } from 'core/constants';
import { ensureModelExistence } from 'core/sequelize';
import { Story, StorySentenceLink, Sentence, Completion } from 'definitions/models';

async function ascendSentencesIds(sentence: Sentence): Promise<Array<number>> {
  const ids: Array<number> = [sentence.id];
  const limit = 1000; // TODO unhardcode this
  let lastSentenceParentId: number | null = sentence.parentSentenceId;
  for (let i = 0; i < limit; ++i) {
    if (!lastSentenceParentId)
      break;
    const parentSentence: Sentence = await ensureModelExistence(lastSentenceParentId, Sentence);
    ids.push(parentSentence.id);
    lastSentenceParentId = parentSentence.parentSentenceId;
  }
  return ids;
}

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
  const sentencesIds = await ascendSentencesIds(sentence);
  await StorySentenceLink.bulkCreate(sentencesIds.reverse().map(sentenceId => ({
    storyId: story.id,
    sentenceId,
  })));
  return true;
}