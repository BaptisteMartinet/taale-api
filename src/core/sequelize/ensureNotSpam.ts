import type { ModelStatic, Model } from 'sequelize';

import { Op } from 'sequelize';

export interface CheckSpamOpts {
  userId: number,
  timeFrameMs: number,
  recordsLimit: number,
}

async function ensureNotSpam(model: ModelStatic<Model>, opts: CheckSpamOpts): Promise<void> {
  const { userId, timeFrameMs, recordsLimit } = opts;
  const nbRecords = await model.count({
    where: {
      ownerId: userId,
      createdAt: { [Op.gte]: (Date.now() - timeFrameMs) },
    }
  });
  if (nbRecords >= recordsLimit)
    throw new Error('Spam detected');
}

export default ensureNotSpam;
