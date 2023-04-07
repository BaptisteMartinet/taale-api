import type { Model, ModelStatic, Identifier } from 'sequelize';

import { ClientError } from 'core/errors';

async function ensureModelExistence<M extends Model>(identifier: Identifier, model: ModelStatic<M>): Promise<M> {
  const instance = await model.findByPk(identifier);
  if (!instance)
    throw new ClientError(`${model.name}#${identifier} does not exists`, 'ResourceNotFound');
  return instance;
}

export default ensureModelExistence;
