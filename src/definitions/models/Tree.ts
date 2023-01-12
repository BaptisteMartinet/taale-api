import type { User, Sentence } from 'definitions/models';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
  ForeignKey,
} from 'sequelize';
import sequelize from 'core/sequelize';
import { Locale } from 'definitions/enums';

class Tree extends Model<InferAttributes<Tree>, InferCreationAttributes<Tree>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<number>;
  declare open: boolean;
  declare locale: Locale;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare sentences?: NonAttribute<Sentence[]>;
  declare static associations: {
    owner: Association<Tree, User>;
    sentences: Association<Tree, Sentence>;
  };
}

Tree.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  open: { type: DataTypes.BOOLEAN, allowNull: false },
  locale: { type: DataTypes.ENUM, allowNull: false, values: Object.values(Locale) },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'trees',
  timestamps: true,
  sequelize,
});

export default Tree;
