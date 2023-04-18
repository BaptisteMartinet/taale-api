import type { Model, ModelStatic, ForeignKeyOptions } from 'sequelize';

type Action = 'RESTRICT' | 'CASCADE' | 'NO ACTION' | 'SET NULL' | 'SET DEFAULT';

interface FromModelDefinition<M extends Model> {
  model: ModelStatic<M>,
  key?: string,
  as: string,
  onDelete?: Action,
}

interface ToModelDefinition<M extends Model> {
  model: ModelStatic<M>,
  key?: string | ForeignKeyOptions,
  as: string,
  onDelete?: Action,
}

interface RelationShipArgs<FromModel extends Model, ToModel extends Model> {
  from: FromModelDefinition<FromModel>,
  to: ToModelDefinition<ToModel>,
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
  });
}

export function createOneToOneRelationship<FromModel extends Model, ToModel extends Model>(args: RelationShipArgs<FromModel, ToModel>) {
  const { from, to } = args;
  from.model.hasOne(to.model, {
    sourceKey: from.key,
    foreignKey: to.key,
    onDelete: from.onDelete,
  });
  to.model.belongsTo(from.model, {
    foreignKey: to.key,
    targetKey: from.key,
    as: to.as,
  });
}
