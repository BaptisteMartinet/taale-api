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
import type { User, Sentence } from 'definitions/models';
import { Locale } from 'definitions/enums';

class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<number>;
  declare open: boolean;
  declare locale: Locale;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare sentences?: NonAttribute<Sentence[]>;
  declare static associations: {
    owner: Association<Story, User>;
    sentences: Association<Story, Sentence>;
  };
}

Story.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  open: { type: DataTypes.BOOLEAN, allowNull: false },
  locale: { type: DataTypes.ENUM, allowNull: false, values: Object.values(Locale) },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'stories',
  timestamps: true,
  sequelize,
});

export default Story;
