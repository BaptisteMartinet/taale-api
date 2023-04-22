import type { Model, ModelStatic } from 'sequelize';

type AssociationType = 'SET NULL' | 'RESTRICT' | 'CASCADE' | 'NO ACTION' | 'SET DEFAULT';

interface AssociationDefinition<M extends Model> {
  model: ModelStatic<M>,
  key?: string,
  as?: string,
  onDelete?: AssociationType,
}

interface AssociationArgs<FromModel extends Model, ToModel extends Model> {
  from: AssociationDefinition<FromModel>,
  to: AssociationDefinition<ToModel>,
}

export function createOneToManyAssociation<FromModel extends Model, ToModel extends Model>(args: AssociationArgs<FromModel, ToModel>) {
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

export function createOneToOneAssociation<FromModel extends Model, ToModel extends Model>(args: AssociationArgs<FromModel, ToModel>) {
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
