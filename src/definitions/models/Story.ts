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
import type { User } from 'definitions/models';

class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']>;
  declare open: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;

  declare static associations: {
    owner: Association<Story, User>;
  };
}

Story.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  open: { type: DataTypes.BOOLEAN, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'stories',
  timestamps: true,
  sequelize,
});

export default Story;
