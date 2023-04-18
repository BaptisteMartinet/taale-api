import type { Model, ModelStatic } from 'sequelize';

interface ModelDefinition<M extends Model> {
  model: ModelStatic<M>,
  key?: string,
  as: string,
  onDelete?: 'CASCADE' | 'NO ACTION',
}

interface RelationShipArgs<FromModel extends Model, ToModel extends Model> {
  from: ModelDefinition<FromModel>,
  to: ModelDefinition<ToModel>,
}

export function createOneToManyRelationship<FromModel extends Model, ToModel extends Model>(args: RelationShipArgs<FromModel, ToModel>) {
  const { from, to } = args;
  from.model.hasMany(to.model, {
    sourceKey: from.key,
    foreignKey: to.key,
    as: from.as,
    onDelete: from.onDelete,
  });
  to.model.belongsTo(from.model, {
    foreignKey: to.key,
    targetKey: from.key,
    as: to.as,
    onDelete: to.onDelete,
  });
}

export function createOneToOneRelationship<FromModel extends Model, ToModel extends Model>(args: RelationShipArgs<FromModel, ToModel>) {
  const { from, to } = args;
  from.model.hasOne(to.model, {
    sourceKey: from.key,
    foreignKey: to.key,
    as: from.as,
    onDelete: from.onDelete,
  });
  to.model.belongsTo(from.model, {
    foreignKey: to.key,
    targetKey: from.key,
    as: to.as,
    onDelete: to.onDelete,
  });
}
