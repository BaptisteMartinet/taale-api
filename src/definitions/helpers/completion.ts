import { QueryTypes } from 'sequelize';
import { nbCompletionsToMarkComplete } from 'core/constants';
import sequelize from 'core/sequelize';
import { Story, StorySentenceLink, Sentence, Completion } from 'definitions/models';

async function ascendSentencesIds(sentenceId: number): Promise<Array<number>> {
  const records = await sequelize.query<{ id: number, parentSentenceId: number }>(`
with recursive cte as (
  SELECT id, parentSentenceId FROM sentences WHERE id=${sentenceId}
  UNION ALL
  SELECT s.id, s.parentSentenceId FROM cte
  JOIN sentences s ON cte.parentSentenceId=s.id
)
select * from cte;
`, { type: QueryTypes.SELECT });
  return records.map(record => record.id);
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
  const sentencesIds = await ascendSentencesIds(sentence.id);
  await StorySentenceLink.bulkCreate(sentencesIds.reverse().map(sentenceId => ({
    storyId: story.id,
    sentenceId,
  })));
  return true;
}
