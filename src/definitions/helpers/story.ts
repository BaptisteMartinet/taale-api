import { Op } from 'sequelize';
import { Story, StorySentenceLink, Sentence } from 'definitions/models';
import { ascendSentencesIds } from './sentence';

async function genStoryTitle(sentencesIds: number[]) {
  const sentences = await Sentence.findAll({
    where: { id: { [Op.in]: sentencesIds } },
    attributes: ['text'],
    limit: sentencesIds.length,
  });
  return sentences.map(sentence => sentence.text).join(' ');
}

export async function createStory(sentence: Sentence): Promise<void> {
  const sentencesIds = await ascendSentencesIds(sentence.id);
  sentencesIds.reverse();
  const title = await genStoryTitle(sentencesIds.slice(0, 2));
  const story = await Story.create({
    sentenceId: sentence.id,
    treeId: sentence.treeId,
    title,
  });
  await StorySentenceLink.bulkCreate(sentencesIds.map(sentenceId => ({
    storyId: story.id,
    sentenceId,
  })));
}
