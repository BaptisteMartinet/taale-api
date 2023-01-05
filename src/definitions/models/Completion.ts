import type { User, Sentence } from 'definitions/models';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Association,
} from 'sequelize';
import sequelize from 'core/sequelize';

class Completion extends Model<InferAttributes<Completion>, InferCreationAttributes<Completion>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<number>;
  declare sentenceId: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare sentence?: NonAttribute<Sentence>;
  declare static associations: {
    owner: Association<Completion, User>;
    sentence: Association<Completion, Sentence>;
  };
}

Completion.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  sentenceId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'completions',
  timestamps: true,
  sequelize,
});

export default Completion;
