import { Story, StorySentenceLink, Sentence } from 'definitions/models';
import { ascendSentencesIds } from './sentence';

export async function createStory(sentence: Sentence): Promise<void> {
  const story = await Story.create({
    sentenceId: sentence.id,
    treeId: sentence.treeId,
  });
  const sentencesIds = await ascendSentencesIds(sentence.id);
  await StorySentenceLink.bulkCreate(sentencesIds.reverse().map(sentenceId => ({
    storyId: story.id,
    sentenceId,
  })));
}
