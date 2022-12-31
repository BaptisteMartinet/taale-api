import type { Model, ModelStatic, Identifier } from 'sequelize';

async function ensureModelExistence<M extends Model>(identifier: Identifier, model: ModelStatic<M>): Promise<M> {
  const instance = await model.findByPk(identifier);
  if (!instance)
    throw new Error(`${model.name}#${identifier} does not exists`);
  return instance;
}

export default ensureModelExistence;
