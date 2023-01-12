import type { Sentence } from 'definitions/models';

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

class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare locale: Locale;
  declare sentenceId: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare sentence?: NonAttribute<Sentence>;
  declare static associations: {
    sentence: Association<Story, Sentence>;
  };
}

Story.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  locale: { type: DataTypes.ENUM, allowNull: false, values: Object.values(Locale) },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'stories',
  timestamps: true,
  sequelize,
});

export default Story;
