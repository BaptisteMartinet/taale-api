import type { ModelStatic, Model } from 'sequelize';

import { Op } from 'sequelize';
import { ClientError, ClientErrorT } from 'core/errors';
import { Role } from 'definitions/enums';
import { User } from 'definitions/models';

export interface CheckSpamOpts {
  user: User,
  timeFrameMs: number,
  recordsLimit: number,
}

async function ensureNotSpam(model: ModelStatic<Model>, opts: CheckSpamOpts): Promise<void> {
  const { user, timeFrameMs, recordsLimit } = opts;
  if (user.role === Role.Admin)
    return;
  const nbRecords = await model.count({
    where: {
      ownerId: user.id,
      createdAt: { [Op.gte]: (Date.now() - timeFrameMs) },
    }
  });
  if (nbRecords >= recordsLimit)
    throw new ClientError('Spam detected', ClientErrorT.SpamDetected);
}

export default ensureNotSpam;
