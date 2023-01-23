import { QueryTypes } from 'sequelize';
import sequelize from 'core/sequelize';

export async function ascendSentencesIds(sentenceId: number): Promise<number[]> {
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

export async function ascendSentencesIdsWithLimit(sentenceId: number, limit: number): Promise<number[]> {
  const records = await sequelize.query<{ id: number, parentSentenceId: number }>(`
  with recursive cte as (
    SELECT id, parentSentenceId, 0 as idx FROM sentences WHERE id=${sentenceId}
    UNION ALL
    SELECT s.id, s.parentSentenceId, idx + 1 FROM cte
    JOIN sentences s ON cte.parentSentenceId=s.id
    WHERE idx < ${limit}
  )
  select * from cte;
  `, { type: QueryTypes.SELECT });
    return records.map(record => record.id);
}
